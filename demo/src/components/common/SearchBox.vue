<template>
  <div class="search-box">
    <el-input
      v-model="searchQuery"
      placeholder="搜索历史会话..."
      clearable
      :prefix-icon="Search"
      @input="debounceSearch"
      @clear="handleClear"
    />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { Search } from '@element-plus/icons-vue';

const searchQuery = ref('');
const emit = defineEmits(['search', 'clear']);

// 简单防抖处理
let timer = null;
const debounceSearch = (value) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    emit('search', value);
  }, 300);
};

const handleClear = () => {
  searchQuery.value = '';
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
