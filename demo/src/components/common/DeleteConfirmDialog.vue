<template>
  <el-dialog
    v-model="dialogVisible"
    title="确认删除"
    width="400px"
    :close-on-click-modal="false"
    :show-close="false"
    align-center
  >
    <div class="dialog-content">
      <el-icon class="warning-icon" color="#e6a23c" :size="24">
        <Warning />
      </el-icon>
      <span class="warning-text">是否确认删除此会话记录？此操作不可撤销。</span>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="danger" @click="handleConfirm">确认删除</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import { Warning } from '@element-plus/icons-vue';

const dialogVisible = ref(false);
const emit = defineEmits(['confirm', 'cancel']);

const handleConfirm = () => {
  dialogVisible.value = false;
  emit('confirm');
};

const handleCancel = () => {
  dialogVisible.value = false;
  emit('cancel');
};

// 供父组件调用的方法
const showDialog = () => {
  dialogVisible.value = true;
};

defineExpose({
  visible: dialogVisible,
  showDialog
});
</script>

<style scoped lang="scss">
.dialog-content {
  display: flex;
  align-items: center;
  padding: 20px 0;
}

.warning-icon {
  margin-right: 12px;
}

.warning-text {
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
