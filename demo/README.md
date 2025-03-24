# Vue3 Admin Template

一个基于 Vue3 + TypeScript + Vite + Element Plus 的后台管理系统模板

## 技术栈

- 编程语言：TypeScript 5.7.2
- 前端框架：Vue 3.5.13
- 构建工具：Vite 6.2.0
- UI 框架：Element Plus 2.9.7
- 状态管理：Pinia 3.0.1
- 路由管理：Vue Router 4.5.0
- HTTP 客户端：Axios 1.8.4
- CSS 预处理器：Sass
- 代码规范：TypeScript

## 项目结构

```
src/
├── api/                # API 接口管理
├── assets/            # 静态资源
│   ├── icons/        # 图标资源
│   ├── images/       # 图片资源
│   └── styles/       # 样式资源
├── components/        # 公共组件
│   ├── common/       # 通用组件
│   └── layout/       # 布局组件
├── composables/      # 组合式函数
├── router/           # 路由配置
├── stores/           # 状态管理
│   └── modules/      # 状态模块
├── types/            # 类型定义
├── utils/            # 工具函数
└── views/            # 页面视图
    ├── dashboard/    # 仪表盘页面
    ├── error/        # 错误页面
    └── login/        # 登录页面
```

## 环境配置

### 开发环境

```bash
NODE_ENV=development
VITE_APP_ENV=development
VITE_APP_API_BASE_URL=http://localhost:3000/api
VITE_APP_MOCK_ENABLED=true
VITE_APP_TITLE=Vue3 Admin Template (Development)
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 主要功能

- 📦 Vue3 组件自动导入
- 🎨 Element Plus 组件按需加载
- 📱 响应式布局
- 🔐 基础路由权限管理
- 💾 Pinia 状态管理
- 🌐 Axios 请求封装
- 🎯 TypeScript 类型支持
- 📝 环境变量配置

## 开发指南

1. 组件开发规范
   - 使用 Vue3 组合式 API
   - 组件命名采用大驼峰命名法
   - 公共组件放置在 components 目录下

2. 样式开发规范
   - 使用 SCSS 预处理器
   - 全局样式变量定义在 variables.scss
   - 样式重置文件为 reset.scss

3. API 接口规范
   - 接口统一管理在 api 目录
   - 使用封装的 request.ts 发起请求
   - 支持请求拦截和响应拦截

4. 状态管理规范
   - 使用 Pinia 进行状态管理
   - 模块化管理，存放在 stores/modules
   - 支持持久化存储
