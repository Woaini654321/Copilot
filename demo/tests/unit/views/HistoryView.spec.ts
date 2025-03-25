import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import HistoryView from '@/views/history/index.vue'
import historyApi from '@/api/history'
import { ElMessage } from 'element-plus'

// 模拟接口调用
vi.mock('@/api/history', () => ({
  default: {
    getHistories: vi.fn(),
    searchHistories: vi.fn(),
    deleteHistory: vi.fn()
  }
}))

// 模拟 Element Plus 消息提示
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe('HistoryView.vue', () => {
  let wrapper
  let router

  const mockHistoryData = {
    success: true,
    data: {
      data: [
        {
          id: '1',
          title: '今天的会话',
          preview: '这是今天的会话内容预览',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          title: '昨天的会话',
          preview: '这是昨天的会话内容预览',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      hasMore: true
    }
  }

  beforeEach(() => {
    // 创建路由
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: HistoryView },
        { path: '/history/:id', component: { template: '<div>History Detail</div>' } }
      ]
    })

    // 重置所有模拟
    vi.clearAllMocks()
    
    // 模拟API响应
    historyApi.getHistories.mockResolvedValue(mockHistoryData)
    historyApi.searchHistories.mockResolvedValue({
      success: true,
      data: {
        data: [mockHistoryData.data.data[0]],
        hasMore: false
      }
    })
    historyApi.deleteHistory.mockResolvedValue({ success: true })
  })

  const mountComponent = async () => {
    wrapper = mount(HistoryView, {
      global: {
        plugins: [router],
        stubs: {
          'SearchBox': {
            template: '<div class="search-box"><input v-model="modelValue" @input="$emit(\'search\', $event.target.value)" @clear="$emit(\'clear\')" /></div>',
            props: ['modelValue'],
            emits: ['update:modelValue', 'search', 'clear']
          },
          'ChatItem': {
            template: '<div class="chat-item" @click="$emit(\'select\', id)"><button class="delete-btn" @click.stop="$emit(\'delete\', id)">删除</button></div>',
            props: ['id'],
            emits: ['delete', 'select']
          },
          'DeleteConfirmDialog': {
            template: '<div class="delete-dialog"><button @click="$emit(\'confirm\')">确认</button></div>',
            emits: ['confirm']
          },
          'ElButton': {
            template: '<button><slot/></button>'
          },
          'ElEmpty': {
            template: '<div class="empty-list"><slot/></div>'
          },
          'ElSkeleton': {
            template: '<div class="skeleton"><slot/></div>',
            props: ['rows', 'animated']
          }
        }
      }
    })
    await router.isReady()
    await flushPromises()
  }

  afterEach(() => {
    wrapper?.unmount()
  })

  it('应在组件挂载时获取历史会话列表', async () => {
    await mountComponent()
    
    expect(historyApi.getHistories).toHaveBeenCalledWith({
      page: 1,
      limit: 30
    })
  })

  it('正确渲染历史会话列表', async () => {
    await mountComponent()
    
    const timeSections = wrapper.findAll('.time-section')
    expect(timeSections).toHaveLength(2) // 今天和昨天的分组
  })

  it('搜索功能应正确工作', async () => {
    await mountComponent()
    
    const searchBox = wrapper.find('.search-box input')
    await searchBox.setValue('测试关键词')
    await flushPromises()
    
    expect(historyApi.searchHistories).toHaveBeenCalledWith({
      keyword: '测试关键词',
      page: 1,
      limit: 50
    })
  })

  it('清除搜索应正确重置状态', async () => {
    await mountComponent()
    
    const searchBox = wrapper.find('.search-box input')
    await searchBox.setValue('测试关键词')
    await flushPromises()
    
    await wrapper.find('.search-box input').trigger('clear')
    await flushPromises()
    
    const searchResults = wrapper.findAll('.search-result')
    expect(searchResults.length).toBe(0)
  })

  it('点击加载更多应获取更多历史会话', async () => {
    historyApi.getHistories
      .mockResolvedValueOnce(mockHistoryData)
      .mockResolvedValueOnce({
        success: true,
        data: {
          data: [],
          hasMore: false
        }
      })

    await mountComponent()
    
    const loadMoreBtn = wrapper.find('.load-more button')
    expect(loadMoreBtn.exists()).toBe(true)
    
    await loadMoreBtn.trigger('click')
    await flushPromises()
    
    expect(historyApi.getHistories).toHaveBeenCalledWith({
      page: 2,
      limit: 30
    })
  })

  it('处理选择会话应导航到详情页', async () => {
    await mountComponent()
    
    await wrapper.find('.chat-item').trigger('click')
    await flushPromises()
    
    expect(router.currentRoute.value.path).toBe('/history/1')
  })

  it('API调用失败时应显示错误消息', async () => {
    historyApi.getHistories.mockRejectedValueOnce(new Error('网络错误'))
    
    await mountComponent()
    await flushPromises()
    
    expect(ElMessage.error).toHaveBeenCalled()
  })

  it('没有更多历史会话时应正确显示状态', async () => {
    historyApi.getHistories.mockResolvedValueOnce({
      success: true,
      data: {
        data: mockHistoryData.data.data,
        hasMore: false
      }
    })
    
    await mountComponent()
    
    const noMoreText = wrapper.find('.no-more')
    expect(noMoreText.exists()).toBe(true)
    expect(noMoreText.text()).toBe('已加载全部内容')
  })

  it('历史会话为空时应显示空状态', async () => {
    historyApi.getHistories.mockResolvedValueOnce({
      success: true,
      data: {
        data: [],
        hasMore: false
      }
    })
    
    await mountComponent()
    await flushPromises()
    
    expect(wrapper.find('.empty-list').exists()).toBe(true)
  })

  it('确认删除会话应该调用删除API', async () => {
    await mountComponent()
    
    // 触发删除操作
    await wrapper.find('.delete-btn').trigger('click')
    
    // 触发确认删除
    await wrapper.find('.delete-dialog button').trigger('click')
    await flushPromises()
    
    expect(historyApi.deleteHistory).toHaveBeenCalledWith('1')
    expect(ElMessage.success).toHaveBeenCalledWith('删除成功')
  })
})