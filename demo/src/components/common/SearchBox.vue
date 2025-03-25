<template>
  <div class="search-box">
    <el-input
      :model-value="modelValue"
      @update:model-value="updateValue"
      placeholder="搜索历史会话..."
      clearable
      :prefix-icon="Search"
      @clear="handleClear"
    />
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import { Search } from '@element-plus/icons-vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'search', 'clear']);

// 简单防抖处理
let timer = null;
const updateValue = (value) => {
  emit('update:modelValue', value);
  clearTimeout(timer);
  timer = setTimeout(() => {
    emit('search', value);
  }, 300);
};

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};
</script>
<style scoped lang="scss">
.search-box {
  width: 100%;
  margin-bottom: 20px;
  :deep(.el-input__inner) {
    &::placeholder {
      color: #909399;
    }
  }
}
</style>
