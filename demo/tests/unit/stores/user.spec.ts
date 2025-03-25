import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/modules/user'
import storage from '@/utils/storage'
import { login as loginApi } from '@/utils/request'
import router from '@/router'

// 模拟依赖模块
vi.mock('@/utils/storage', () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn()
  }
}))

vi.mock('@/utils/request', () => ({
  login: vi.fn()
}))

vi.mock('@/router', () => ({
  default: {
    push: vi.fn()
  }
}))

describe('useUserStore', () => {
  beforeEach(() => {
    // 创建一个新的 Pinia 实例并使其处于激活状态
    setActivePinia(createPinia())
    
    // 重置所有模拟
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('初始化时应从storage获取token', () => {
    // 模拟 storage.get 返回一个 token
    vi.mocked(storage.get).mockReturnValueOnce('mock-token')
    
    const userStore = useUserStore()
    
    // 验证 storage.get 被调用并且传入了正确的参数
    expect(storage.get).toHaveBeenCalledWith('token')
    
    // 验证 token 被正确设置到 store 中
    expect(userStore.state.token).toBe('mock-token')
  })

  it('登录成功后应设置token和用户信息', async () => {
    // 模拟 loginApi 返回成功响应
    const mockResponse = {
      success: true,
      data: {
        token: 'mock-token',
        id: '1',
        username: 'testuser',
        name: '测试用户',
        avatar: 'avatar.jpg'
      },
      message: '登录成功'
    }
    
    vi.mocked(loginApi).mockResolvedValueOnce(mockResponse)
    
    const userStore = useUserStore()
    const result = await userStore.login('testuser', 'password')
    
    // 验证 loginApi 被调用并传入了正确的参数
    expect(loginApi).toHaveBeenCalledWith('testuser', 'password')
    
    // 验证 token 和用户信息已正确设置
    expect(userStore.state.token).toBe('mock-token')
    expect(userStore.state.userInfo).toEqual({
      id: '1',
      username: 'testuser',
      name: '测试用户',
      avatar: 'avatar.jpg'
    })
    
    // 验证 storage.set 被调用
    expect(storage.set).toHaveBeenCalledWith('token', 'mock-token')
    expect(storage.set).toHaveBeenCalledWith('userInfo', {
      id: '1',
      username: 'testuser',
      name: '测试用户',
      avatar: 'avatar.jpg'
    })
    
    // 验证返回值正确
    expect(result).toBe(true)
  })

  it('登录失败时应返回false', async () => {
    // 模拟 loginApi 返回失败响应
    vi.mocked(loginApi).mockResolvedValueOnce({
      success: false,
      data: null,
      message: '用户名或密码错误'
    })
    
    const userStore = useUserStore()
    const result = await userStore.login('testuser', 'wrong-password')
    
    // 验证返回值正确
    expect(result).toBe(false)
    
    // 验证 token 没有被设置
    expect(userStore.state.token).toBe('')
    expect(userStore.state.userInfo).toBeNull()
  })

  it('登录请求异常时应捕获错误并返回false', async () => {
    // 模拟 loginApi 抛出异常
    vi.mocked(loginApi).mockRejectedValueOnce(new Error('网络错误'))
    
    // 模拟控制台错误输出
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    const userStore = useUserStore()
    const result = await userStore.login('testuser', 'password')
    
    // 验证错误被正确记录
    expect(consoleErrorSpy).toHaveBeenCalled()
    
    // 验证返回值正确
    expect(result).toBe(false)
  })

  it('getUserInfo应获取并设置用户信息', async () => {
    const userStore = useUserStore()
    
    // 设置token，确保getUserInfo不会抛出Token不存在的错误
    userStore.state.token = 'mock-token'
    
    const userInfo = await userStore.getUserInfo()
    
    // 验证返回的用户信息
    expect(userInfo).toEqual({
      id: '1',
      username: 'admin',
      name: '管理员',
      avatar: expect.any(String),
      roles: ['admin'],
      permissions: expect.any(Array)
    })
    
    // 验证store中的用户信息已经被设置
    expect(userStore.state.userInfo).toEqual(userInfo)
  })

  it('getUserInfo在没有token时应抛出错误', async () => {
    const userStore = useUserStore()
    
    // 确保token为空
    userStore.state.token = ''
    
    await expect(userStore.getUserInfo()).rejects.toThrow('Token不存在，请先登录')
  })

  it('退出登录应清除用户状态并跳转到登录页', () => {
    const userStore = useUserStore()
    
    // 先设置一些数据
    userStore.state.token = 'mock-token'
    userStore.state.userInfo = {
      id: '1',
      username: 'testuser',
      name: '测试用户',
      avatar: 'avatar.jpg'
    }
    
    // 调用退出登录方法
    userStore.logout()
    
    // 验证状态被清除
    expect(userStore.state.token).toBe('')
    expect(userStore.state.userInfo).toBeNull()
    
    // 验证storage.remove被调用
    expect(storage.remove).toHaveBeenCalledWith('token')
    
    // 验证路由跳转
    expect(router.push).toHaveBeenCalledWith('/login')
  })

  it('hasRole应正确检查用户角色', () => {
    const userStore = useUserStore()
    
    // 初始状态下没有角色
    expect(userStore.hasRole('admin')).toBe(false)
    
    // 设置用户信息和角色
    userStore.state.userInfo = {
      id: '1',
      username: 'admin',
      name: '管理员',
      avatar: '',
      roles: ['admin', 'editor']
    }
    
    // 验证角色检查
    expect(userStore.hasRole('admin')).toBe(true)
    expect(userStore.hasRole('editor')).toBe(true)
    expect(userStore.hasRole('user')).toBe(false)
  })

  it('hasPermission应正确检查用户权限', () => {
    const userStore = useUserStore()
    
    // 初始状态下没有权限
    expect(userStore.hasPermission('system:user:list')).toBe(false)
    
    // 设置用户信息和权限
    userStore.state.userInfo = {
      id: '1',
      username: 'admin',
      name: '管理员',
      avatar: '',
      permissions: ['system:user:list', 'system:user:create']
    }
    
    // 验证权限检查
    expect(userStore.hasPermission('system:user:list')).toBe(true)
    expect(userStore.hasPermission('system:user:create')).toBe(true)
    expect(userStore.hasPermission('system:user:delete')).toBe(false)
  })

  it('hasToken计算属性应正确返回token状态', () => {
    const userStore = useUserStore()
    
    // 初始状态下没有token
    userStore.state.token = ''
    expect(userStore.hasToken).toBe(false)
    
    // 设置token
    userStore.state.token = 'mock-token'
    expect(userStore.hasToken).toBe(true)
  })

  it('resetToken应仅清除token相关状态', () => {
    const userStore = useUserStore()
    
    // 先设置一些数据
    userStore.state.token = 'mock-token'
    userStore.state.userInfo = {
      id: '1',
      username: 'testuser',
      name: '测试用户',
      avatar: 'avatar.jpg'
    }
    
    // 调用重置token方法
    userStore.resetToken()
    
    // 验证状态被清除
    expect(userStore.state.token).toBe('')
    expect(userStore.state.userInfo).toBeNull()
    
    // 验证storage.remove被调用
    expect(storage.remove).toHaveBeenCalledWith('token')
    
    // 验证路由没有被跳转
    expect(router.push).not.toHaveBeenCalled()
  })
})