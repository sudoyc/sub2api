# Gemini CLI 接入

Gemini CLI 适合在终端中使用 Gemini 系列能力。接入 Arqel 时，重点是确认 CLI 是否支持 OpenAI-compatible Base URL，或是否需要通过环境变量配置。

本页分两种方式：

- 使用 CC-switch 管理配置。
- 手动配置环境变量或 CLI 配置。

::: details 图片占位：Gemini CLI 启动界面
这里需要一张 Gemini CLI 在终端中启动后的截图，展示可输入提示词的界面，不要包含 API Key。
:::

## 安装

先确认 Node.js 和 npm 可用：

```bash
node -v
npm -v
```

macOS / Linux / WSL：

```bash
npm install -g @google/gemini-cli
gemini --version
```

Windows PowerShell：

```powershell
npm install -g @google/gemini-cli
gemini --version
```

macOS 如果偏好 Homebrew，也可以查看当前 Homebrew 是否提供对应包。

### macOS 注意事项

- npm 安装后如果命令找不到，重开终端。
- 如果使用 Homebrew 安装 Gemini CLI，注意它和 npm 安装的版本可能不是同一份。

### Windows 注意事项

- 推荐用 PowerShell 安装和测试。
- 如果 Gemini CLI 在 Windows 原生环境里配置不生效，先确认环境变量是否在当前 PowerShell 会话中。
- 遇到复杂 shell/MCP 兼容问题，可以改用 WSL2。

### WSL 注意事项

- WSL 里安装的 `gemini` 读取 WSL 的 `~/.gemini` 和环境变量。
- Windows 版 CC-switch 写入的配置不一定会影响 WSL 里的 Gemini CLI。

## 准备工作

- Arqel API Key。
- Arqel Base URL。
- Gemini 相关的具体可用模型名。

## 常见配置方式

不同 CLI 版本可能不同，常见方式包括：

```bash
export ARQEL_API_KEY="sk-..."
export ARQEL_BASE_URL="https://api.arqel.dev/v1"
```

如果工具要求使用 OpenAI 风格变量，可以按工具说明映射：

```bash
export OPENAI_API_KEY="$ARQEL_API_KEY"
export OPENAI_BASE_URL="$ARQEL_BASE_URL"
```

::: warning
变量名以实际 Gemini CLI 版本为准。本文档后续会补充具体命令和版本说明。
:::

## 方式 A：使用 CC-switch

步骤：

1. 打开 CC-switch。
2. 新增 Arqel Provider，填写 API Key、Base URL、具体模型名。
3. 切换到 Gemini CLI 页面。
4. 启用 Arqel Provider。
5. 关闭正在运行的 Gemini CLI。
6. 重新打开终端。
7. 进入项目目录。
8. 运行 `gemini`。

测试问题：

```text
请用三句话说明当前项目的用途。不要修改文件。
```

::: details 图片占位：CC-switch 中 Gemini CLI Provider 配置
这里需要一张 CC-switch 的 Gemini CLI 配置截图，标注 Arqel Provider 已启用。
:::

## 方式 B：手动配置

不同 Gemini CLI 版本配置方式不同。常见方式是通过环境变量或 `~/.gemini/.env`。

macOS / Linux / WSL 临时变量：

```bash
export ARQEL_API_KEY="sk-..."
export ARQEL_BASE_URL="https://api.arqel.dev/v1"
```

如果工具要求 OpenAI 风格变量，可以映射：

```bash
export OPENAI_API_KEY="$ARQEL_API_KEY"
export OPENAI_BASE_URL="$ARQEL_BASE_URL"
```

Windows PowerShell：

```powershell
$env:ARQEL_API_KEY="sk-..."
$env:ARQEL_BASE_URL="https://api.arqel.dev/v1"
$env:OPENAI_API_KEY=$env:ARQEL_API_KEY
$env:OPENAI_BASE_URL=$env:ARQEL_BASE_URL
```

然后运行：

```bash
gemini
```

## 测试建议

先执行只读问题，确认请求链路可用，再执行涉及文件修改的 Agent 任务。

## Trusted Folder 提醒

Gemini CLI 可能有可信目录机制。遇到 `.env` 或本地配置不生效时，先确认当前项目目录是否被标记为可信。

## 推荐项目规则

可以在项目根目录准备 `GEMINI.md`：

```markdown
# GEMINI.md

## Project context
- What this repo is:
- How to run:
- How to test:

## Rules
- Explain before editing.
- Keep changes small.
- Never expose API keys.
```

## 常见问题

### `.env` 不生效

检查：

1. 当前目录是否可信。
2. `.env` 文件是否放在 Gemini CLI 会读取的位置。
3. 当前运行的是 Windows 版 Gemini，还是 WSL 版 Gemini。
4. 是否重启了终端。

### CC-switch 切换后没变化

检查：

1. CC-switch 是否管理的是你正在运行的那份 Gemini CLI。
2. 是否启用了 Arqel Provider。
3. 是否重新打开终端或重启 Gemini CLI。
