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

# VS Code 策略问题解决工具

## 问题描述

这个工具集旨在帮助解决 VS Code 中出现的 **"无法写入 chat.agent.enabled，因为它是在系统策略中配置的"** 错误。这个错误通常表示 GitHub Copilot 的某些设置被系统策略锁定，无法通过普通用户权限修改。

## 包含文件

1. `check_vscode_policy.ps1` - Windows 系统检查脚本（使用 PowerShell）
2. `check_vscode_policy.sh` - macOS/Linux 系统检查脚本（Shell 脚本）

## 使用方法

### Windows 用户

1. 右键点击 `check_vscode_policy.ps1` 
2. 选择 "使用 PowerShell 运行"
3. 查看脚本输出，它会检查系统中可能存在的策略设置并提供相关信息

### macOS/Linux 用户

1. 打开终端
2. 执行以下命令赋予脚本可执行权限：
   ```bash
   chmod +x /Users/admin/Desktop/Copilot/demo/check_vscode_policy.sh
   ```
3. 运行脚本：
   ```bash
   /Users/admin/Desktop/Copilot/demo/check_vscode_policy.sh
   ```
4. 查看输出结果和建议解决方案

## 可能的解决方案

根据脚本检测结果，您可以尝试以下解决方案：

1. **公司/组织管理的电脑**：
   - 联系 IT 部门请求解除限制或提供 Copilot 权限

2. **个人电脑**：
   - 检查并修改被发现的配置文件（请先备份）
   - Windows：检查注册表中的策略设置
   - macOS：检查管理配置文件（MDM Profile）
   - 以管理员身份运行 VS Code（不推荐作为长期解决方案）
   - 尝试重新安装 VS Code 和 GitHub Copilot 扩展

3. **其他方法**：
   - 创建新的用户账户并在其中安装 VS Code
   - 如使用便携版 VS Code，尝试切换到常规安装版

## 注意事项

- 修改系统策略文件可能会影响系统安全性，请谨慎操作
- 在修改任何文件前，请确保先备份
- 如果是在工作环境中，请咨询 IT 管理员，而不是自行修改策略设置
