import { createPinia } from 'pinia'
import type { App } from 'vue'

const store = createPinia()

// 对store进行全局配置
export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
export * from './modules/user'
export * from './modules/app'

export default store