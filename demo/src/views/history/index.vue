<template>
  <div class="history-container">
    <SearchBox @search="handleSearch" @clear="clearSearch" />
    
    <div v-if="isSearchMode" class="search-result">
      <div class="result-header">
        找到 {{ searchResults.length }} 条关于 "{{ searchKeyword }}" 的结果
        <el-button size="small" type="primary" @click="clearSearch">
          清除搜索
        </el-button>
      </div>
      <div v-if="searchResults.length === 0" class="empty-result">
        <el-empty description="没有找到相关记录" />
      </div>
      <ChatItem
        v-else
        v-for="chat in searchResults"
        :key="chat.id"
        :id="chat.id"
        :title="chat.title"
        :preview="chat.preview"
        :timestamp="chat.timestamp"
        :keyword="searchKeyword"
        @delete="handleDelete"
        @select="handleSelect"
      />
    </div>
    
    <div v-else class="chat-list">
      <template v-for="(group, index) in groupedChats" :key="index">
        <div class="time-section">{{ group.title }}</div>
        <ChatItem
          v-for="chat in group.items"
          :key="chat.id"
          :id="chat.id"
          :title="chat.title"
          :preview="chat.preview"
          :timestamp="chat.timestamp"
          @delete="handleDelete"
          @select="handleSelect"
        />
      </template>
      
      <div v-if="loading" class="loading-more">
        <el-skeleton :rows="3" animated />
      </div>
      
      <div v-else-if="hasMore" class="load-more">
        <el-button type="primary" link @click="loadMore">加载更多</el-button>
      </div>
      
      <div v-else-if="chats.length > 0" class="no-more">
        已加载全部内容
      </div>
      
      <div v-else class="empty-list">
        <el-empty description="暂无历史会话" />
      </div>
    </div>
    
    <DeleteConfirmDialog
      ref="deleteDialog"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import historyApi from '@/api/history';
import SearchBox from '@/components/common/SearchBox.vue';
import ChatItem from '@/components/common/ChatItem.vue';
import DeleteConfirmDialog from '@/components/common/DeleteConfirmDialog.vue';

// 状态变量
const chats = ref([]);
const searchResults = ref([]);
const searchKeyword = ref('');
const isSearchMode = ref(false);
const loading = ref(false);
const hasMore = ref(false);
const page = ref(1);
const pageSize = ref(30);
const deleteItemId = ref(null);
const deleteDialog = ref(null);

// 在 setup 中添加 router
const router = useRouter();

// 按时间分组的会话记录
const groupedChats = computed(() => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const groups = {
    today: { title: '今天', items: [] },
    yesterday: { title: '昨天', items: [] },
    earlier: { title: '更早', items: [] }
  };

  chats.value.forEach(chat => {
    const chatDate = new Date(chat.timestamp);
    if (isSameDay(chatDate, today)) {
      groups.today.items.push(chat);
    } else if (isSameDay(chatDate, yesterday)) {
      groups.yesterday.items.push(chat);
    } else {
      groups.earlier.items.push(chat);
    }
  });

  // 只返回有内容的分组
  return Object.values(groups).filter(group => group.items.length > 0);
});

// 判断是否是同一天
const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
};

// 获取历史会话列表
const fetchHistories = async () => {
  if (loading.value) return;
  
  loading.value = true;
  try {
    const res = await historyApi.getHistories({
      page: page.value,
      limit: pageSize.value
    });
    
    if (res && res.success) {
      chats.value = [...chats.value, ...res.data.data];
      hasMore.value = res.data.hasMore;
    } else {
      ElMessage.error(res?.message || '获取历史会话失败');
    }
  } catch (error) {
    console.error('获取历史会话失败:', error);
    ElMessage.error('获取历史会话失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};

// 处理搜索
const handleSearch = async (keyword) => {
  if (!keyword) {
    clearSearch();
    return;
  }
  
  searchKeyword.value = keyword;
  isSearchMode.value = true;
  loading.value = true;
  
  try {
    const res = await historyApi.searchHistories({
      keyword,
      page: 1,
      limit: 50
    });
    
    if (res && res.success) {
      searchResults.value = res.data.data;
    } else {
      ElMessage.error(res?.message || '搜索失败');
    }
  } catch (error) {
    console.error('搜索失败:', error);
    ElMessage.error('搜索失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};

// 清除搜索
const clearSearch = () => {
  searchKeyword.value = '';
  searchResults.value = [];
  isSearchMode.value = false;
};

// 加载更多
const loadMore = () => {
  if (loading.value || !hasMore.value) return;
  
  page.value++;
  fetchHistories();
};

// 处理删除
const handleDelete = (id) => {
  deleteItemId.value = id;
  if (deleteDialog.value) {
    deleteDialog.value.visible = true;
  }
};

// 确认删除
const confirmDelete = async () => {
  if (!deleteItemId.value) return;
  
  try {
    const res = await historyApi.deleteHistory(deleteItemId.value);
    
    if (res && res.success) {
      ElMessage.success('删除成功');
      
      // 从列表中移除已删除的会话
      if (isSearchMode.value) {
        searchResults.value = searchResults.value.filter(chat => chat.id !== deleteItemId.value);
      } else {
        chats.value = chats.value.filter(chat => chat.id !== deleteItemId.value);
      }
    } else {
      ElMessage.error(res?.message || '删除失败');
    }
  } catch (error) {
    console.error('删除失败:', error);
    ElMessage.error('删除失败，请稍后重试');
  } finally {
    deleteItemId.value = null;
  }
};

// 处理选择会话
const handleSelect = (id) => {
  router.push(`/history/${id}`);
};

// 组件挂载时获取数据
onMounted(() => {
  fetchHistories();
});
</script>

<style scoped lang="scss">
.history-container {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.search-result {
  margin-top: 20px;

  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 10px;
    background-color: #f5f7ff;
    border-radius: 4px;
    color: #606266;
  }
  
  .empty-result {
    margin-top: 60px;
  }
}

.chat-list {
  margin-top: 20px;
}

.time-section {
  padding: 8px 0;
  margin: 16px 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  background-color: #f2f6fc;
  border-radius: 4px;
  padding-left: 12px;
}

.loading-more {
  margin: 20px 0;
}

.load-more {
  text-align: center;
  margin: 20px 0;
  padding: 10px 0;
}

.no-more {
  text-align: center;
  margin: 20px 0;
  color: #909399;
  font-size: 14px;
}

.empty-list {
  margin-top: 60px;
}
</style>
