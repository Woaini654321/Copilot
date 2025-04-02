<template>
  <div
    class="chat-item"
    @mouseover="showDelete = true"
    @mouseleave="showDelete = false"
    @click="handleSelect"
  >
    <div class="chat-content">
      <div class="chat-title" :title="title" v-html="highlightedTitle"></div>
      <div class="chat-preview">
        <span class="chat-time">{{ formatTime(timestamp) }}</span>
        <span class="preview-text" :title="preview" v-html="highlightedPreview"></span>
      </div>
    </div>
    <el-icon
      v-if="showDelete"
      class="delete-icon"
      @click.stop="handleDelete"
    >
      <Delete />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { highlightText } from '@/utils/highlight';

interface Props {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  keyword?: string;
}

const props = withDefaults(defineProps<Props>(), {
  keyword: ''
});

const emit = defineEmits(['delete', 'select']);
const showDelete = ref(false);

// 高亮显示的标题
const highlightedTitle = computed(() => {
  return highlightText(props.title, props.keyword);
});

// 高亮显示的预览文本
const highlightedPreview = computed(() => {
  return highlightText(props.preview, props.keyword);
});

// 格式化时间
const formatTime = (timestamp: string) => {
  const date = dayjs(timestamp);
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');

  if (date.isSame(today, 'day')) {
    return date.format('HH:mm');
  } else if (date.isSame(yesterday, 'day')) {
    return '昨天 ' + date.format('HH:mm');
  } else {
    return date.format('MM-DD HH:mm');
  }
};

// 处理删除
const handleDelete = () => {
  emit('delete', props.id);
};

// 处理选择
const handleSelect = () => {
  emit('select', props.id);
};
</script>

<style scoped lang="scss">
.chat-item {
  position: relative;
  padding: 12px 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f5f7ff;
    border-color: #409eff;
    border-left-width: 3px;
  }

  .chat-content {
    padding-right: 24px;
  }

  .chat-title {
    font-weight: bold;
    color: #303133;
    font-size: 14px;
    margin-bottom: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chat-preview {
    color: #606266;
    font-size: 13px;
    display: flex;
    align-items: center;

    .chat-time {
      color: #909399;
      font-size: 12px;
      margin-right: 8px;
      flex-shrink: 0;
    }

    .preview-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .delete-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #f56c6c;
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(245, 108, 108, 0.1);
    }
  }
}

:deep(.highlight) {
  color: #409EFF;
  font-weight: bold;
  background-color: rgba(64, 158, 255, 0.1);
  padding: 0 2px;
  border-radius: 2px;
}
</style>
