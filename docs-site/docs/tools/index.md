# 工具接入总览

大多数工具接入 Arqel 时都围绕三个信息：

- **API Key**：Arqel 控制台创建的 Key。
- **Base URL**：Arqel 提供的 API 地址。
- **模型名**：Arqel 控制台里可用的具体模型名。

不同 Agent 工具的配置位置不一样：有的读环境变量，有的读 JSON，有的读 TOML，有的还会区分 Windows 和 WSL。新手最容易出错的地方不是 Key 本身，而是“我到底把 Key 填到哪个工具、哪个系统环境里了”。

## 两条接入路线

### 路线 A：手动配置

适合：

- 你只使用一个工具。
- 你想先理解每个工具自己的配置方式。
- 你不想安装额外桌面管理工具。

阅读对应工具：

- [Cursor](/tools/cursor)
- [Claude Code](/tools/claude-code)
- [Gemini CLI](/tools/gemini-cli)
- [Codex CLI](/tools/codex-cli)
- [OpenAI SDK](/tools/openai-sdk)

### 路线 B：使用 CC-switch 统一管理

适合：

- 你同时使用 Claude Code、Gemini CLI、Codex CLI。
- 你需要经常切换 Provider。
- 你不想手动编辑多个配置文件。
- 你还要管理 MCP、Prompts、Skills。

推荐先读：

- [CC-switch 使用教程](/tools/cc-switch)

::: details 图片占位：手动配置 vs CC-switch 配置流程图
这里需要一张流程图：左边是手动配置，每个工具单独填 Key/Base URL/模型名；右边是 CC-switch，统一添加 Arqel Provider 后同步到多个工具。
:::

## 已规划的工具文档

- [CC-switch](/tools/cc-switch)
- [Cursor](/tools/cursor)
- [Claude Code](/tools/claude-code)
- [Gemini CLI](/tools/gemini-cli)
- [Codex CLI](/tools/codex-cli)
- [OpenAI SDK](/tools/openai-sdk)

## 写文档时的统一格式

每个工具文档建议保持相同结构：

1. 适用场景。
2. 准备工作。
3. 配置 API Key。
4. 配置 Base URL。
5. 选择模型。
6. 测试请求。
7. 常见错误。

## 官方直连和 Arqel 接入的区别

很多工具默认连接官方 API 或官方账号。接入 Arqel 时，通常需要额外配置：

- 自定义 API Key。
- 自定义 Base URL。
- 自定义模型名。

如果工具不支持自定义 Base URL，就不能直接以 OpenAI-compatible 方式接入 Arqel，需要等待工具支持或使用其他中间配置方案。

## 平台差异一定要注意

### macOS

macOS 通常最简单。终端、Homebrew、Node.js、CLI 工具都在同一个用户环境中。

常见问题：

- 安装后命令找不到：重开终端。
- npm 全局安装权限问题：考虑 nvm。
- 配置写入 `~/.zshrc` 后未生效：运行 `source ~/.zshrc` 或重开终端。

### Windows

Windows 有两套常见环境：

- PowerShell / Windows Terminal：Windows 原生环境。
- WSL2：Windows 里的 Linux 环境。

这两套环境的配置不自动同步。你在 PowerShell 里设置的 Key，WSL 里通常读不到。

### Linux / WSL

Linux / WSL 更接近服务器环境，适合运行命令行 Agent。

常见问题：

- 项目放在 `/mnt/c/...` 下导致性能差。
- Node.js 用系统包安装后版本太旧。
- WSL 里的 CLI 读不到 Windows 版 CC-switch 写入的配置。

## 推荐新手路线

1. 先完成 [环境准备](/setup/)。
2. 用 [发送第一条请求](/getting-started/first-request) 验证 Arqel API 可用。
3. 如果只用一个工具，按对应工具文档手动配置。
4. 如果用多个 Agent，安装 [CC-switch](/tools/cc-switch) 统一管理。
5. 每接入一个工具，都先做只读测试，不要一上来让 Agent 修改项目。
