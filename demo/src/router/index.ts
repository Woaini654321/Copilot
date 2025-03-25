import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import storage from '@/utils/storage'

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 刷新时滚动到顶部
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 白名单路由
const whiteList = ['/login']

router.beforeEach((to, _from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title ? to.meta.title + ' - ' : ''}${import.meta.env.VITE_APP_TITLE}`
  
  // 获取token
  const token = storage.get<string>('token')
  
  if (token) {
    if (to.path === '/login') {
      // 已登录且要跳转的是登录页，重定向到首页
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    // 未登录，可以访问白名单页面
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 重定向到登录页
      // 使用动态导入避免循环依赖
      import('element-plus').then(({ ElMessage }) => {
        ElMessage.warning('请先登录')
      })
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router