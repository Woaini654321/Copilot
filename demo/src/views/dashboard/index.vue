<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const welcomeText = ref('欢迎使用 Vue3 Admin 系统')
const cardItems = ref([
  { title: '总用户数', count: '12,456', icon: 'User', color: '#409EFF' },
  { title: '今日访问', count: '2,325', icon: 'View', color: '#67C23A' },
  { title: '总收入', count: '¥26,521', icon: 'Money', color: '#E6A23C' },
  { title: '新增订单', count: '1,621', icon: 'ShoppingCart', color: '#F56C6C' },
])

// 图表实例引用
const weeklyChartRef = ref<HTMLElement | null>(null)
const monthlyChartRef = ref<HTMLElement | null>(null)
let weeklyChart: echarts.ECharts | null = null
let monthlyChart: echarts.ECharts | null = null

// 初始化周数据统计图表
const initWeeklyChart = () => {
  if (weeklyChartRef.value) {
    weeklyChart = echarts.init(weeklyChartRef.value)
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['访问量', '会话数']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '访问量',
          type: 'line',
          smooth: true,
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          itemStyle: {
            color: '#409EFF'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(64,158,255,0.3)' },
              { offset: 1, color: 'rgba(64,158,255,0.1)' }
            ])
          }
        },
        {
          name: '会话数',
          type: 'line',
          smooth: true,
          data: [320, 432, 501, 534, 690, 730, 620],
          itemStyle: {
            color: '#67C23A'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(103,194,58,0.3)' },
              { offset: 1, color: 'rgba(103,194,58,0.1)' }
            ])
          }
        }
      ]
    }
    weeklyChart.setOption(option)
  }
}

// 初始化月度数据分析图表
const initMonthlyChart = () => {
  if (monthlyChartRef.value) {
    monthlyChart = echarts.init(monthlyChartRef.value)
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center'
      },
      series: [
        {
          name: '阅读来源',
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '搜索引擎', itemStyle: { color: '#409EFF' } },
            { value: 735, name: '直接访问', itemStyle: { color: '#67C23A' } },
            { value: 580, name: '电子邮件', itemStyle: { color: '#E6A23C' } },
            { value: 484, name: '社交媒体', itemStyle: { color: '#F56C6C' } },
            { value: 300, name: '其他来源', itemStyle: { color: '#909399' } }
          ]
        }
      ]
    }
    monthlyChart.setOption(option)
  }
}

// 处理窗口大小变化
const handleResize = () => {
  weeklyChart?.resize()
  monthlyChart?.resize()
}

onMounted(() => {
  initWeeklyChart()
  initMonthlyChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  weeklyChart?.dispose()
  monthlyChart?.dispose()
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
          <div class="chart-container" ref="weeklyChartRef"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>阅读数据分析</span>
            </div>
          </template>
          <div class="chart-container" ref="monthlyChartRef"></div>
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
      margin: 0 0 12px;
    }
    
    p {
      font-size: 14px;
      color: #606266;
      margin: 0;
    }
  }

  .card-section {
    margin-bottom: 20px;

    .dashboard-card {
      .card-body {
        display: flex;
        align-items: center;
        padding: 10px;
        border-left: 4px solid;
      }

      .card-icon {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        color: #fff;
      }

      .card-content {
        flex: 1;

        .card-title {
          font-size: 14px;
          color: #909399;
          margin-bottom: 8px;
        }

        .card-count {
          font-size: 20px;
          font-weight: bold;
          color: #303133;
        }
      }
    }
  }

  .chart-section {
    .card-header {
      font-weight: bold;
    }
    
    .chart-container {
      height: 300px;
      width: 100%;
    }
  }
}
</style>