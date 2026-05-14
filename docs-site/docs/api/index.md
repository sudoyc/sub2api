# API 总览

Arqel API 目标是尽量兼容常见 OpenAI-style 调用方式，便于已有工具和 SDK 接入。

## 基础信息

```text
Base URL: https://api.arqel.dev/v1
Auth: Authorization: Bearer <ARQEL_API_KEY>
```

## Chat Completions

```http
POST /chat/completions
```

示例：

```json
{
  "model": "请替换为控制台里可用的模型名",
  "messages": [
    { "role": "user", "content": "你好" }
  ]
}
```

::: warning
本页是文档站 API 参考骨架。具体路径、模型名和返回结构需要以当前后端实现为准补全。
:::
