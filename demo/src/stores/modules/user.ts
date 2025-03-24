import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import storage from '@/utils/storage'
import { login as loginApi } from '@/utils/request'
import router from '@/router'

interface UserInfo {
  id: string | number
  username: string
  name: string    // 用户昵称/姓名
  avatar: string
  roles?: string[]
  permissions?: string[]
}

interface UserState {
  token: string
  userInfo: Nullable<UserInfo>
}

type Nullable<T> = T | null

export const useUserStore = defineStore('user', () => {
  // 状态
  const state = reactive<UserState>({
    token: storage.get('token') || '',
    userInfo: null,
  })

  // 计算属性
  const hasToken = computed(() => !!state.token)
  const userRoles = computed(() => state.userInfo?.roles || [])
  const userPermissions = computed(() => state.userInfo?.permissions || [])

  // 操作方法
  /**
   * 登录
   */
  async function login(username: string, password: string) {
    try {
      const res = await loginApi(username, password)
      
      if (res.success) {
        const { token, ...userInfo } = res.data
        
        // 保存 token
        state.token = token
        storage.set('token', token)
        
        // 保存用户信息
        state.userInfo = userInfo
        storage.set('userInfo', userInfo)
        
        return true
      }
      return false
    } catch (error) {
      console.error('登录失败:', error)
      return false
    }
  }

  /**
   * 获取用户信息
   */
  async function getUserInfo() {
    if (!state.token) {
      throw new Error('Token不存在，请先登录')
    }

    try {
      // 实际开发中，这里应该是调用获取用户信息接口
      // const { data } = await get<UserInfo>('/user/info')
      
      // 这里为了示例，直接模拟用户信息
      const userInfo: UserInfo = {
        id: '1',
        username: 'admin',
        name: '管理员',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        roles: ['admin'],
        permissions: ['system:user:list', 'system:user:create', 'system:user:update', 'system:user:delete'],
      }
      
      state.userInfo = userInfo
      return userInfo
    } catch (error) {
      return null
    }
  }

  /**
   * 退出登录
   */
  function logout() {
    // 清除 token
    state.token = ''
    state.userInfo = null
    storage.remove('token')
    
    // 跳转到登录页
    router.push('/login')
  }

  /**
   * 重置token
   */
  function resetToken() {
    state.token = ''
    state.userInfo = null
    storage.remove('token')
  }

  /**
   * 检查权限
   * @param permission 权限标识
   */
  function hasPermission(permission: string) {
    if (!state.userInfo || !state.userInfo.permissions) {
      return false
    }
    return state.userInfo.permissions.includes(permission)
  }

  /**
   * 检查角色
   * @param role 角色标识
   */
  function hasRole(role: string) {
    if (!state.userInfo || !state.userInfo.roles) {
      return false
    }
    return state.userInfo.roles.includes(role)
  }

  return {
    state,
    hasToken,
    userRoles,
    userPermissions,
    login,
    getUserInfo,
    logout,
    resetToken,
    hasPermission,
    hasRole,
  }
})