import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import storage from '@/utils/storage'

interface AppState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  device: 'desktop' | 'mobile'
  size: 'default' | 'large' | 'small'
  theme: 'light' | 'dark'
  language: 'zh-cn' | 'en'
}

export const useAppStore = defineStore('app', () => {
  // 状态
  const state = reactive<AppState>({
    sidebar: {
      opened: storage.get('sidebarStatus') ? !!storage.get('sidebarStatus') : true,
      withoutAnimation: false,
    },
    device: 'desktop',
    size: (storage.get('size') as AppState['size']) || 'default',
    theme: (storage.get('theme') as AppState['theme']) || 'light',
    language: (storage.get('language') as AppState['language']) || 'zh-cn',
  })

  // 计算属性
  const sidebarOpened = computed(() => state.sidebar.opened)
  const currentSize = computed(() => state.size)
  const currentTheme = computed(() => state.theme)
  const currentLanguage = computed(() => state.language)

  // 操作方法
  function toggleSidebar() {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      storage.set('sidebarStatus', 1)
    } else {
      storage.set('sidebarStatus', 0)
    }
  }

  function closeSidebar(withoutAnimation: boolean) {
    storage.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  }

  function toggleDevice(device: AppState['device']) {
    state.device = device
  }

  function setSize(size: AppState['size']) {
    state.size = size
    storage.set('size', size)
  }

  function setTheme(theme: AppState['theme']) {
    state.theme = theme
    storage.set('theme', theme)
    // 切换CSS变量或主题类名
    document.documentElement.setAttribute('data-theme', theme)
  }

  function setLanguage(language: AppState['language']) {
    state.language = language
    storage.set('language', language)
  }

  return {
    state,
    sidebarOpened,
    currentSize,
    currentTheme,
    currentLanguage,
    toggleSidebar,
    closeSidebar,
    toggleDevice,
    setSize,
    setTheme,
    setLanguage,
  }
})