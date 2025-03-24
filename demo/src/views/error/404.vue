<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>抱歉，您访问的页面不存在</h2>
      <p>请检查您输入的网址是否正确，或者返回首页</p>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  
  .not-found-content {
    text-align: center;
    
    h1 {
      font-size: 120px;
      font-weight: bold;
      color: #409EFF;
      margin: 0;
      line-height: 1;
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      font-size: 24px;
      color: #303133;
      margin: 20px 0 16px;
    }
    
    p {
      font-size: 16px;
      color: #606266;
      margin-bottom: 30px;
    }
  }
}
</style>