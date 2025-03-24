/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_ENV: 'development' | 'test' | 'production'
  readonly VITE_APP_API_BASE_URL: string
  readonly VITE_APP_MOCK_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}