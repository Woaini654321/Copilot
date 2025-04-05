<template>
  <div 
    class="resource-card" 
    :class="{ 'hovered': isHovered }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 资源卡片头部 -->
    <div class="resource-card-header">
      <!-- 视频和PPT类型显示封面图 -->
      <div v-if="['video', 'ppt'].includes(resource.type)" class="resource-cover">
        <img :src="resource.coverUrl" :alt="resource.name" />
        <!-- 视频时长 -->
        <span v-if="resource.type === 'video'" class="duration">{{ formatDuration(resource.duration) }}</span>
      </div>
      
      <!-- 文档类型显示缩略图 -->
      <div v-if="resource.type === 'document'" class="resource-thumbnail">
        <img :src="resource.thumbnailUrl" :alt="resource.name" />
      </div>
      
      <!-- 音频类型显示图标 -->
      <div v-if="resource.type === 'audio'" class="resource-audio-icon">
        <el-icon :size="48"><Headset /></el-icon>
      </div>
      
      <div class="resource-info">
        <h3 class="resource-name">{{ resource.name }}</h3>
        <div class="resource-meta">
          <!-- 关键词标签 -->
          <div class="keywords">
            <el-tag
              v-for="keyword in resource.keywords"
              :key="keyword"
              size="small"
              type="info"
              effect="plain"
              class="keyword-tag"
            >
              {{ keyword }}
            </el-tag>
          </div>
          
          <!-- 文件大小（PPT和文档） -->
          <div v-if="['ppt', 'document'].includes(resource.type)" class="file-size">
            {{ formatFileSize(resource.size) }}
          </div>
          
          <!-- 音频时长 -->
          <div v-if="resource.type === 'audio'" class="audio-duration">
            <el-icon><Timer /></el-icon>
            <span>{{ formatDuration(resource.duration) }}</span>
          </div>
          
          <!-- 创建时间 -->
          <div class="create-time">
            <el-icon><Calendar /></el-icon>
            <span>{{ formatDate(resource.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 资源摘要，鼠标悬浮时显示 -->
    <div class="resource-summary" v-show="isHovered">
      <p>{{ resource.summary }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElIcon, ElTag } from 'element-plus';
import { Headset, Timer, Calendar } from '@element-plus/icons-vue';
import type { Resource } from '@/types/resource';
import { formatDate as formatDateUtil } from '@/utils/format';

const props = defineProps<{
  resource: Resource
}>();

// 鼠标悬浮状态
const isHovered = ref(false);

// 鼠标悬浮事件
const handleMouseEnter = () => {
  isHovered.value = true;
};

// 鼠标离开事件
const handleMouseLeave = () => {
  isHovered.value = false;
};

// 格式化时间
const formatDate = (dateString: string) => {
  return formatDateUtil(new Date(dateString), 'YYYY-MM-DD');
};

// 格式化时长
const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
};

// 格式化文件大小
const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
};
</script>

<style scoped>
.resource-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.resource-card.hovered {
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.resource-card-header {
  display: flex;
  gap: 16px;
}

.resource-cover, .resource-thumbnail, .resource-audio-icon {
  width: 120px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.resource-cover img, .resource-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resource-audio-icon {
  background-color: #ecf5ff;
  color: #409EFF;
}

.duration {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 12px;
}

.resource-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.resource-name {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.resource-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #606266;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.keyword-tag {
  margin-right: 4px;
}

.file-size, .audio-duration, .create-time {
  display: flex;
  align-items: center;
  gap: 4px;
}

.resource-summary {
  margin-top: 12px;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
  padding-top: 12px;
  border-top: 1px dashed #ebeef5;
}
</style>