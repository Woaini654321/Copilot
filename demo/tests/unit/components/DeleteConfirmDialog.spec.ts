import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DeleteConfirmDialog from '@/components/common/DeleteConfirmDialog.vue'
import { Warning } from '@element-plus/icons-vue'

describe('DeleteConfirmDialog.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(DeleteConfirmDialog, {
      global: {
        components: {
          Warning,
          ElDialog: {
            template: '<div class="el-dialog" v-if="modelValue"><div class="el-dialog__header"><span class="el-dialog__title">{{ title }}</span></div><div class="el-dialog__body"><slot /></div><div class="el-dialog__footer"><slot name="footer" /></div></div>',
            props: ['modelValue', 'title']
          },
          ElButton: {
            template: '<button class="el-button" :class="type ? `el-button--${type}` : \'\'"><slot /></button>',
            props: ['type']
          },
          ElIcon: {
            template: '<i class="el-icon"><slot /></i>'
          }
        }
      }
    })
  })

  it('初始状态下对话框应该是隐藏的', () => {
    expect(wrapper.find('.el-dialog').exists()).toBe(false)
  })

  it('调用showDialog方法应该显示对话框', async () => {
    await wrapper.vm.showDialog()
    expect(wrapper.find('.el-dialog').exists()).toBe(true)
  })

  it('点击确认按钮应该触发confirm事件并关闭对话框', async () => {
    await wrapper.vm.showDialog()
    const confirmButton = wrapper.findAll('.el-button').at(1)
    await confirmButton?.trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('confirm')
    expect(wrapper.find('.el-dialog').exists()).toBe(false)
  })

  it('点击取消按钮应该触发cancel事件并关闭对话框', async () => {
    await wrapper.vm.showDialog()
    const cancelButton = wrapper.findAll('.el-button').at(0)
    await cancelButton?.trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('cancel')
    expect(wrapper.find('.el-dialog').exists()).toBe(false)
  })

  it('对话框内容应该正确渲染', async () => {
    await wrapper.vm.showDialog()
    
    expect(wrapper.find('.el-dialog__title').text()).toBe('确认删除')
    expect(wrapper.find('.warning-icon').exists()).toBe(true)
    expect(wrapper.find('.warning-text').text()).toBe('是否确认删除此会话记录？此操作不可撤销。')
    
    const buttons = wrapper.findAll('.el-button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('取消')
    expect(buttons[1].text()).toBe('确认删除')
  })
})