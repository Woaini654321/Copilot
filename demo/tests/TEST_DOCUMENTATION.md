# 前端单元测试文档

## 1. 概述

本文档描述了前端项目的单元测试架构、覆盖范围、测试方法和运行指南。我们使用 Vitest 作为测试框架，结合 Vue Test Utils 进行 Vue 组件测试，实现了对组件、API、存储和工具函数的全面测试。

## 2. 测试架构

### 2.1 技术栈

- **测试框架**: Vitest
- **组件测试库**: Vue Test Utils
- **测试环境**: JSDOM
- **断言库**: Vitest 内置断言
- **测试覆盖率工具**: @vitest/coverage-v8

### 2.2 目录结构

```
tests/
  unit/
    setupTests.ts              # 测试全局设置
    components/                # 组件测试
      SearchBox.spec.ts
      ChatItem.spec.ts
      DeleteConfirmDialog.spec.ts
    api/                       # API 测试
      history.spec.ts
    stores/                    # Store 测试
      user.spec.ts
    utils/                     # 工具函数测试
      highlight.spec.ts
    views/                     # 视图组件测试
      HistoryView.spec.ts
    run_tests.sh               # 测试运行脚本
```

## 3. 测试覆盖范围

### 3.1 组件测试

| 组件 | 文件 | 测试覆盖内容 |
| ---- | ---- | ------------ |
| SearchBox | components/SearchBox.spec.ts | 1. 组件渲染<br>2. 输入绑定<br>3. 防抖搜索<br>4. 清除功能<br>5. 连续输入的防抖处理 |
| ChatItem | components/ChatItem.spec.ts | 1. 组件渲染<br>2. 标题和预览文本显示<br>3. 鼠标悬停效果<br>4. 删除和选择事件<br>5. 关键词高亮<br>6. 时间格式化 |
| DeleteConfirmDialog | components/DeleteConfirmDialog.spec.ts | 1. 对话框显示与隐藏<br>2. 确认和取消按钮事件<br>3. 组件暴露的方法和属性<br>4. 对话框内容渲染 |

### 3.2 API 测试

| API 模块 | 文件 | 测试覆盖内容 |
| -------- | ---- | ------------ |
| historyApi | api/history.spec.ts | 1. getHistories 方法<br>2. searchHistories 方法<br>3. getHistoryById 方法<br>4. deleteHistory 方法<br>5. 错误处理<br>6. 不同参数的处理 |

### 3.3 Store 测试

| Store 模块 | 文件 | 测试覆盖内容 |
| ---------- | ---- | ------------ |
| useUserStore | stores/user.spec.ts | 1. 初始化状态<br>2. 登录功能<br>3. 获取用户信息<br>4. 退出登录<br>5. 权限和角色检查<br>6. 重置 Token<br>7. 计算属性<br>8. 错误处理 |

### 3.4 工具函数测试

| 工具函数 | 文件 | 测试覆盖内容 |
| -------- | ---- | ------------ |
| highlightText | utils/highlight.spec.ts | 1. 空关键词处理<br>2. 关键词高亮<br>3. 多次出现的关键词高亮<br>4. 大小写不敏感<br>5. 特殊字符处理<br>6. 空文本处理<br>7. 正则表达式字符处理 |

### 3.5 视图组件测试

| 视图组件 | 文件 | 测试覆盖内容 |
| -------- | ---- | ------------ |
| HistoryView | views/HistoryView.spec.ts | 1. 初始数据加载<br>2. 历史会话列表渲染<br>3. 搜索功能<br>4. 清除搜索<br>5. 加载更多<br>6. 删除确认<br>7. 会话选择与路由跳转<br>8. API 错误处理<br>9. 加载状态和空状态显示 |

## 4. 测试方法

### 4.1 组件测试策略

- **渲染测试**: 验证组件正确渲染并显示预期的内容
- **交互测试**: 验证用户交互（点击、输入等）触发正确的行为
- **事件测试**: 验证组件正确触发自定义事件
- **状态测试**: 验证组件内部状态变化的正确性
- **属性测试**: 验证传入的 props 正确影响组件行为

### 4.2 API 测试策略

- **请求参数测试**: 验证 API 调用使用正确的请求参数和 URL
- **响应处理测试**: 验证 API 响应被正确处理
- **错误处理测试**: 验证 API 请求失败时的错误处理逻辑

### 4.3 Store 测试策略

- **状态管理测试**: 验证 store 正确管理状态
- **异步操作测试**: 验证 store 中的异步操作（如 API 调用）
- **状态持久化测试**: 验证 store 状态的持久化和恢复
- **计算属性测试**: 验证 store 中的计算属性

### 4.4 模拟策略

- **API 模拟**: 使用 `vi.mock()` 模拟 API 响应
- **组件模拟**: 使用 `stubs` 选项模拟子组件
- **路由模拟**: 使用 `createRouter` 创建测试路由
- **依赖模拟**: 模拟外部依赖以隔离被测单元

## 5. 运行测试

### 5.1 运行所有测试

```bash
npm test
```

### 5.2 运行特定测试

```bash
npm test -- tests/unit/components/SearchBox.spec.ts
```

### 5.3 生成测试覆盖率报告

```bash
npm run coverage
```

覆盖率报告将生成在 `coverage` 目录中，可以打开 `coverage/index.html` 查看详细报告。

### 5.4 使用测试脚本

我们提供了一个便捷的测试运行脚本：

```bash
chmod +x tests/run_tests.sh  # 赋予执行权限
./tests/run_tests.sh         # 运行脚本
```

## 6. 最佳实践

- **保持测试独立**: 每个测试应该独立运行，不依赖其他测试的状态
- **避免测试实现细节**: 测试应关注组件的行为而非实现细节
- **使用工厂函数**: 对于复杂的测试数据，使用工厂函数创建
- **清理副作用**: 在每个测试后清理任何副作用（如 DOM 修改、定时器等）
- **测试边界条件**: 包括空值、错误情况和边界值测试
- **保持测试简单**: 每个测试应该关注单一功能点

## 7. 常见问题解答

### 7.1 为什么某些测试中使用了 `flushPromises`？

在异步操作后，使用 `flushPromises` 等待所有 Promise 解决，确保组件状态已更新。

### 7.2 如何测试依赖于 ElementPlus 的组件？

我们使用模拟组件替代真实的 ElementPlus 组件，并通过 stubs 选项简化测试。

### 7.3 如何处理路由相关的测试？

使用 `createRouter` 创建模拟路由，并通过 `router.push` 跟踪路由变化。

### 7.4 如何测试 Pinia store？

使用 `setActivePinia` 和 `createPinia` 创建测试环境中的 store 实例。

## 8. 维护与更新

- 添加新功能时同步更新相应测试
- 定期检查测试覆盖率并优化测试
- 保持测试文档与代码的同步更新
- 在代码审核中检查测试质量