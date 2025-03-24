<template>
  <div class="history-detail">
    <div v-if="loading" class="loading">
      <el-skeleton :rows="10" animated />
    </div>
    <div v-else-if="error" class="error">
      <el-empty :description="error" />
    </div>
    <template v-else>
      <div class="header">
        <h2 class="title">{{ history.title }}</h2>
        <div class="meta">
          <span class="time">{{ formatDate(history.timestamp) }}</span>
        </div>
      </div>
      <div class="content">
        <div v-for="(message, index) in history.messages" 
             :key="index" 
             :class="['message', message.role]">
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import historyApi from '@/api/history';

const route = useRoute();
const router = useRouter();
const history = ref(null);
const loading = ref(true);
const error = ref('');

// 格式化日期
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// 获取历史会话详情
const fetchHistoryDetail = async () => {
  const id = route.params.id;
  if (!id) {
    error.value = '会话ID不能为空';
    loading.value = false;
    return;
  }

  try {
    const res = await historyApi.getHistoryById(id);
    if (res && res.success) {
      history.value = res.data;
    } else {
      error.value = res?.message || '获取会话详情失败';
    }
  } catch (err) {
    console.error('获取会话详情失败:', err);
    error.value = '获取会话详情失败，请稍后重试';
  } finally {
    loading.value = false;
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchHistoryDetail();
});
</script>

<style scoped lang="scss">
.history-detail {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  .loading, .error {
    margin-top: 40px;
  }

  .header {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #ebeef5;

    .title {
      font-size: 24px;
      color: #303133;
      margin: 0 0 12px;
    }

    .meta {
      color: #909399;
      font-size: 14px;
    }
  }

  .content {
    .message {
      margin-bottom: 16px;
      padding: 12px 16px;
      border-radius: 8px;

      &.user {
        background-color: #f5f7ff;
        margin-left: 40px;
      }

      &.assistant {
        background-color: #f0f9eb;
        margin-right: 40px;
      }

      .message-content {
        font-size: 14px;
        line-height: 1.6;
        white-space: pre-wrap;
      }
    }
  }
}
</style>