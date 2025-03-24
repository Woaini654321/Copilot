<script setup lang="ts">
import { ref, onMounted } from 'vue'

const welcomeText = ref('欢迎使用 Vue3 Admin 系统')
const cardItems = ref([
  { title: '总用户数', count: '12,456', icon: 'User', color: '#409EFF' },
  { title: '今日访问', count: '2,325', icon: 'View', color: '#67C23A' },
  { title: '总收入', count: '¥26,521', icon: 'Money', color: '#E6A23C' },
  { title: '新增订单', count: '1,621', icon: 'ShoppingCart', color: '#F56C6C' },
])

onMounted(() => {
  console.log('Dashboard页面加载完成')
})
</script>

<template>
  <div class="dashboard-container">
    <div class="welcome-section">
      <h2>{{ welcomeText }}</h2>
      <p>今天是 {{ new Date().toLocaleDateString() }}，祝您工作愉快！</p>
    </div>

    <el-row :gutter="20" class="card-section">
      <el-col :span="6" v-for="(item, index) in cardItems" :key="index">
        <el-card shadow="hover" class="dashboard-card">
          <div class="card-body" :style="{ borderColor: item.color }">
            <div class="card-icon" :style="{ backgroundColor: item.color }">
              <el-icon :size="24"><component :is="'el-icon-' + item.icon.toLowerCase()" /></el-icon>
            </div>
            <div class="card-content">
              <div class="card-title">{{ item.title }}</div>
              <div class="card-count">{{ item.count }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-section">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>周数据统计</span>
            </div>
          </template>
          <div class="chart-placeholder">
            <!-- 此处可添加图表组件 -->
            <div class="empty-chart">图表区域</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>月度数据分析</span>
            </div>
          </template>
          <div class="chart-placeholder">
            <!-- 此处可添加图表组件 -->
            <div class="empty-chart">图表区域</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.dashboard-container {
  padding: 16px;

  .welcome-section {
    margin-bottom: 24px;
    
    h2 {
      font-size: 24px;
      color: #303133;
      margin-bottom: 8px;
    }
    
    p {
      font-size: 14px;
      color: #606266;
      margin: 0;
    }
  }

  .card-section {
    margin-bottom: 24px;
    
    .dashboard-card {
      margin-bottom: 16px;
      
      .card-body {
        display: flex;
        align-items: center;
        padding: 16px;
        border-left: 4px solid transparent;
        
        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          color: #fff;
        }
        
        .card-content {
          .card-title {
            font-size: 14px;
            color: #909399;
            margin-bottom: 8px;
          }
          
          .card-count {
            font-size: 24px;
            font-weight: bold;
            color: #303133;
          }
        }
      }
    }
  }

  .chart-section {
    .card-header {
      font-weight: bold;
    }
    
    .chart-placeholder {
      height: 300px;
      
      .empty-chart {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f7f9fc;
        border-radius: 4px;
        color: #909399;
        font-size: 14px;
      }
    }
  }
}
</style>