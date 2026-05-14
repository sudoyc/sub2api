# 从 0 开始使用 Arqel

Arqel 是一个 AI API 接入层。它把常用模型、Key 管理和用量查看整理到一个入口里，让你可以先把请求跑通，再逐步理解模型、鉴权和消耗。

这套基础教程面向两类人：

- 第一次接触 AI API，希望知道 Key、Base URL、模型名分别是什么。
- 已经在用 Cursor、Claude Code、Gemini CLI、Codex CLI，希望把这些工具接到 Arqel。

## 学习路线

建议按这个顺序阅读，不要一开始就跳到复杂 Agent 配置：

1. [环境准备](/setup/)：安装 Git、Node.js、VS Code 和必要命令行工具。
2. [创建 API Key](/getting-started/api-key)：拿到调用凭证，并按用途拆分 Key。
3. [发送第一条请求](/getting-started/first-request)：用 cURL 验证 Arqel API 可以正常返回。
4. [选择工具接入](/tools/)：把 Cursor、Claude Code、Gemini CLI 或 Codex CLI 接到 Arqel。
5. [理解核心概念](/concepts/)：再回头看 Base URL、模型选择、用量和计费。

## 你需要知道的三个概念

1. **API Key**：你的调用凭证，请不要公开到前端页面或公共仓库。
2. **Base URL**：你的客户端要请求的 API 地址，通常替换原本的 OpenAI API 地址。
3. **模型名**：你要调用的具体模型，例如 Claude、GPT、Gemini 等模型家族里的某个可用模型。

## 最短接入路径

1. 按你的系统完成基础环境准备。
2. 登录 Arqel。
3. 创建一个 API Key。
4. 复制 Base URL。
5. 在工具或 SDK 里填入 API Key 和 Base URL。
6. 选择模型，发送第一条请求。
7. 回到控制台查看用量和请求状态。

::: tip 提醒
Arqel 是接入层，不包装成官方服务，也不承诺绕过平台规则。模型能力、速度、可用性仍由上游状态决定。
:::

## 下一步

- [环境准备总览](/setup/)
- [创建 API Key](/getting-started/api-key)
- [发送第一条请求](/getting-started/first-request)
- [接入检查清单](/getting-started/checklist)
