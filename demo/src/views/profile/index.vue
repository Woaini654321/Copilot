<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <div class="profile-header">
        <el-avatar 
          :size="80" 
          :src="userStore.state.userInfo?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
        />
        <h2>{{ userStore.state.userInfo?.name }}</h2>
      </div>
      
      <el-form label-width="100px" class="profile-form">
        <el-form-item label="用户名">
          <span>{{ userStore.state.userInfo?.username }}</span>
        </el-form-item>
        <el-form-item label="用户ID">
          <span>{{ userStore.state.userInfo?.id }}</span>
        </el-form-item>
      </el-form>

      <div class="action-buttons">
        <el-button type="primary" @click="handleLogout">退出登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()

const handleLogout = () => {
  userStore.logout()
}
</script>

<style scoped lang="scss">
.profile-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;

  .profile-card {
    .profile-header {
      text-align: center;
      margin-bottom: 30px;

      h2 {
        margin-top: 16px;
        color: #303133;
      }
    }

    .profile-form {
      margin-bottom: 30px;
    }

    .action-buttons {
      text-align: center;
    }
  }
}
</style>