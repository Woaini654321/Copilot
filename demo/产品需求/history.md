# 时序图

```mermaid
sequenceDiagram
    participant User
    participant System

    User->>System: 搜索会话记录
    System-->>User: 返回搜索结果

    User->>System: 删除会话记录
    System-->>User: 确认删除操作
    User->>System: 确认删除
    System-->>User: 删除成功
```
