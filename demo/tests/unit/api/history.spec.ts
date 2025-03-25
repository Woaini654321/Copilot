import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import historyApi from '@/api/history'
import request from '@/utils/request'

// 模拟request模块
vi.mock('@/utils/request', () => ({
  default: vi.fn().mockImplementation((config) => {
    return Promise.resolve({
      success: true,
      data: { message: '请求成功', config },
      message: '操作成功'
    })
  })
}))

describe('history API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('getHistories方法应该使用正确的请求配置', async () => {
    const params = { page: 1, limit: 10 }
    await historyApi.getHistories(params)

    expect(request).toHaveBeenCalledWith({
      url: '/history',
      method: 'get',
      params
    })
  })

  it('searchHistories方法应该使用正确的请求配置', async () => {
    const params = { keyword: '测试关键词', page: 1, limit: 10 }
    await historyApi.searchHistories(params)

    expect(request).toHaveBeenCalledWith({
      url: '/history/search',
      method: 'get',
      params
    })
  })

  it('getHistoryById方法应该使用正确的请求配置', async () => {
    const id = '123456'
    await historyApi.getHistoryById(id)

    expect(request).toHaveBeenCalledWith({
      url: `/history/${id}`,
      method: 'get'
    })
  })

  it('deleteHistory方法应该使用正确的请求配置', async () => {
    const id = '123456'
    await historyApi.deleteHistory(id)

    expect(request).toHaveBeenCalledWith({
      url: `/history/${id}`,
      method: 'delete'
    })
  })

  it('请求失败时应该正确处理错误', async () => {
    // 模拟请求失败
    vi.mocked(request).mockImplementationOnce(() => 
      Promise.reject(new Error('请求失败'))
    )

    try {
      await historyApi.getHistories({ page: 1, limit: 10 })
      // 如果没有抛出错误，则测试失败
      expect('应该抛出错误').toBe(false)
    } catch (error) {
      expect(error.message).toBe('请求失败')
    }
  })

  it('请求返回不同参数时应该正确处理', async () => {
    // 模拟不同的返回值
    const mockResponse = {
      success: true,
      data: {
        total: 100,
        list: [{ id: '1', title: '测试会话' }]
      },
      message: '获取成功'
    }
    
    vi.mocked(request).mockImplementationOnce(() => 
      Promise.resolve(mockResponse)
    )

    const result = await historyApi.getHistories({ page: 1, limit: 10 })
    expect(result).toEqual(mockResponse)
  })
})