import type { RouteRecordRaw } from 'vue-router'
import LayoutIndex from '@/components/layout/LayoutIndex.vue'
import Dashboard from '@/views/dashboard/index.vue'
import Login from '@/views/login/index.vue'
import NotFound from '@/views/error/404.vue'
import History from '@/views/history/index.vue'
import MyResource from '@/views/resource/MyResource.vue'

/**
 * 路由配置
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: LayoutIndex,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          title: '首页',
          icon: 'dashboard',
          keepAlive: true,
        },
      },
      {
        path: 'history',
        name: 'History',
        component: History,
        meta: {
          title: '历史会话',
          icon: 'history',
          keepAlive: true,
        },
      },
      {
        path: 'history/:id',
        name: 'HistoryDetail',
        component: () => import('@/views/history/detail.vue'),
        meta: {
          title: '会话详情',
          icon: 'chat',
          keepAlive: false,
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: '个人信息',
          icon: 'user',
          keepAlive: false,
        },
      },
      {
        path: 'resource',
        name: 'MyResource',
        component: MyResource,
        meta: {
          title: '我的资源',
          icon: 'folder',
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404',
      hidden: true,
    },
  },
]

export default routes