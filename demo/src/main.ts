import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles/index.scss'

// 创建应用实例
const app = createApp(App)

// 挂载 Element Plus
app.use(ElementPlus, {
  size: 'default',
})

// 先挂载状态管理
setupStore(app)

// 再挂载路由
app.use(router)

// 最后挂载应用
app.mount('#app')
