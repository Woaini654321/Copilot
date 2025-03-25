import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBox from '@/components/common/SearchBox.vue'
import { Search } from '@element-plus/icons-vue'

describe('SearchBox.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(SearchBox, {
      props: {
        modelValue: ''
      },
      global: {
        components: {
          Search,
          'el-input': {
            template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" @clear="$emit(\'clear\')" />',
            props: ['modelValue'],
            emits: ['update:modelValue', 'clear']
          },
          'el-icon': {
            template: '<span class="el-icon"><slot /></span>'
          }
        }
      }
    })
  })

  it('应该正确渲染搜索框组件', () => {
    expect(wrapper.find('.search-box').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('输入搜索内容应该触发search事件', async () => {
    const input = wrapper.find('input')
    await input.setValue('测试搜索')
    
    // 等待防抖
    await new Promise(resolve => setTimeout(resolve, 350))
    
    expect(wrapper.emitted()).toHaveProperty('search')
    expect(wrapper.emitted().search[0]).toEqual(['测试搜索'])
  })

  it('清空搜索框应该触发clear事件', async () => {
    const input = wrapper.find('input')
    await input.setValue('测试搜索')
    await input.trigger('clear')
    
    expect(wrapper.emitted()).toHaveProperty('clear')
  })
})