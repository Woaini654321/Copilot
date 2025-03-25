import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatItem from '@/components/common/ChatItem.vue'
import { Delete } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

describe('ChatItem.vue', () => {
  const defaultProps = {
    id: '1',
    title: '测试会话',
    preview: '这是一段测试预览文本',
    timestamp: '2025-03-25T10:30:00',
    keyword: ''
  }

  let wrapper: any

  beforeEach(() => {
    wrapper = mount(ChatItem, {
      props: defaultProps,
      global: {
        components: {
          Delete,
          'el-icon': {
            template: '<span class="el-icon"><slot /></span>'
          }
        }
      }
    })
  })

  it('应该正确渲染组件', () => {
    expect(wrapper.find('.chat-item').exists()).toBe(true)
    expect(wrapper.find('.chat-title').text()).toBe(defaultProps.title)
    expect(wrapper.find('.preview-text').text()).toBe(defaultProps.preview)
  })

  it('应该正确格式化时间', () => {
    // 今天的时间显示格式为 HH:mm
    expect(wrapper.find('.chat-time').text()).toBe('10:30')

    // 昨天的时间
    wrapper = mount(ChatItem, {
      props: {
        ...defaultProps,
        timestamp: '2025-03-24T10:30:00'
      },
      global: {
        components: {
          Delete
        }
      }
    })
    expect(wrapper.find('.chat-time').text()).toBe('昨天 10:30')
  })

  it('鼠标悬停时应显示删除按钮', async () => {
    expect(wrapper.find('.delete-icon').exists()).toBe(false)
    
    await wrapper.trigger('mouseover')
    expect(wrapper.find('.delete-icon').exists()).toBe(true)
    
    await wrapper.trigger('mouseleave')
    expect(wrapper.find('.delete-icon').exists()).toBe(false)
  })

  it('点击删除按钮应触发delete事件', async () => {
    await wrapper.trigger('mouseover')
    await wrapper.find('.delete-icon').trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('delete')
    expect(wrapper.emitted().delete[0]).toEqual(['1'])
  })

  it('点击组件应触发select事件', async () => {
    await wrapper.trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('select')
    expect(wrapper.emitted().select[0]).toEqual(['1'])
  })

  it('应该正确高亮显示关键词', async () => {
    wrapper = mount(ChatItem, {
      props: {
        ...defaultProps,
        keyword: '测试'
      },
      global: {
        components: {
          Delete
        }
      }
    })
    
    expect(wrapper.find('.chat-title').html()).toContain('<span class="highlight">测试</span>')
    expect(wrapper.find('.preview-text').html()).toContain('<span class="highlight">测试</span>')
  })
})