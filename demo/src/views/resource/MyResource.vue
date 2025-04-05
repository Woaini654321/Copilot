<template>
  <div class="my-resource-container">
    <!-- 顶部横幅 -->
    <div class="banner">
      <div class="banner-content">
        <h1 class="banner-title">创作无限可能</h1>
        <p class="banner-description">这里有你的最佳创编伙伴</p>
        <el-button type="primary" size="large" class="add-resource-button">+ 新增资源</el-button>
      </div>
    </div>

    <!-- 我的资源库标题 -->
    <div class="resource-header">
      <el-icon><Folder /></el-icon>
      <h2>我的资源库</h2>
    </div>
    
    <!-- 资源类型筛选 -->
    <div class="resource-filters">
      <el-radio-group v-model="currentType" @change="handleTypeChange">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button :label="ResourceType.VIDEO">视频</el-radio-button>
        <el-radio-button :label="ResourceType.AUDIO">音频</el-radio-button>
        <el-radio-button :label="ResourceType.PPT">PPT</el-radio-button>
        <el-radio-button :label="ResourceType.DOCUMENT">文档</el-radio-button>
      </el-radio-group>
      
      <!-- 搜索框 -->
      <div class="search-box">
        <el-input
          v-model="keyword"
          placeholder="搜索资源名称或关键词"
          clearable
          @clear="fetchResources"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
          <template #append>
            <el-button @click="handleSearch">搜索</el-button>
          </template>
        </el-input>
      </div>
    </div>
    
    <!-- 资源列表 -->
    <div class="resource-list" v-loading="loading">
      <template v-if="resources.length > 0">
        <resource-card
          v-for="resource in resources"
          :key="resource.id"
          :resource="resource"
        />
      </template>
      <el-empty v-else description="暂无资源数据" />
    </div>
    
    <!-- 分页 -->
    <div class="pagination-container" v-if="total > 0">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage, ElButton, ElIcon } from 'element-plus';
import { Search, Folder } from '@element-plus/icons-vue';
import ResourceCard from '@/components/resource/ResourceCard.vue';
import { getResourceList } from '@/api/resource';
import { ResourceType } from '@/types/resource';
import type { Resource, ResourcePagination } from '@/types/resource';

// 资源列表数据
const resources = ref<Resource[]>([]);
// 资源总数
const total = ref(0);
// 当前页码
const page = ref(1);
// 每页数量
const pageSize = ref(10);
// 当前选中的资源类型
const currentType = ref('');
// 搜索关键词
const keyword = ref('');
// 加载状态
const loading = ref(false);

// 获取资源列表
const fetchResources = async () => {
  loading.value = true;
  try {
    const params = {
      page: page.value,
      pageSize: pageSize.value,
      type: currentType.value || undefined,
      keyword: keyword.value || undefined
    };
    
    const { data } = await getResourceList(params);
    resources.value = data.list;
    total.value = data.total;
  } catch (error) {
    console.error('获取资源列表失败:', error);
    ElMessage.error('获取资源列表失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};

// 处理资源类型变更
const handleTypeChange = () => {
  page.value = 1;
  fetchResources();
};

// 处理搜索
const handleSearch = () => {
  page.value = 1;
  fetchResources();
};

// 处理页码变更
const handlePageChange = (newPage: number) => {
  page.value = newPage;
  fetchResources();
};

// 处理每页数量变更
const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  page.value = 1;
  fetchResources();
};

// 组件挂载时获取资源列表
onMounted(() => {
  fetchResources();
});
</script>

<style scoped>
.my-resource-container {
  padding: 24px;
  background-color: #f5f7fa;
}

/* 顶部横幅样式 */
.banner {
  background: linear-gradient(90deg, #6a85f5, #8eade8);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.banner-content {
  max-width: 600px;
}

.banner-title {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 8px;
}

.banner-description {
  font-size: 16px;
  margin: 0 0 16px;
}

.add-resource-button {
  background-color: #409eff;
  border: none;
  font-size: 16px;
}

/* 我的资源库标题样式 */
.resource-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}

.resource-header el-icon {
  margin-right: 8px;
}

/* 资源类型筛选 */
.resource-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.search-box {
  width: 300px;
}

.resource-list {
  min-height: 300px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.pagination-container {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .resource-filters {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-box {
    width: 100%;
  }
}
</style>