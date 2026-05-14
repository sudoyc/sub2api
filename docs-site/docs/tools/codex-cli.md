# Codex CLI 接入

Codex CLI 是 OpenAI 生态里的命令行 Coding Agent。接入 Arqel 前，需要确认你使用的 Codex 版本是否支持自定义 Provider、API Key 和 Base URL。

本页分两种方式：

- 使用 CC-switch 管理配置。
- 手动配置环境变量或 Codex 配置。

::: details 图片占位：Codex CLI 启动界面
这里需要一张 Codex CLI 在终端启动后的截图，展示可输入任务的界面，不要包含 API Key。
:::

## 安装

先确认 Node.js 和 npm 可用：

```bash
node -v
npm -v
```

macOS / Linux / WSL：

```bash
npm install -g @openai/codex
codex --version
```

Windows PowerShell：

```powershell
npm install -g @openai/codex
codex --version
```

如果 Windows 原生环境遇到兼容问题，建议切到 WSL2。

### macOS 注意事项

- 安装后重开终端验证 `codex --version`。
- 如果遇到权限问题，优先用 nvm 处理 Node 环境。

### Windows 注意事项

- Codex 在 Windows 原生环境中可能存在版本差异或兼容问题。
- 如果遇到登录、shell、MCP、stdio 相关异常，建议在 WSL2 中安装和运行 Codex。

### WSL 注意事项

- WSL 中的 Codex 配置与 Windows 原生 Codex 配置分离。
- 使用 VS Code 时建议通过 Remote - WSL 打开项目。

## 配置思路

如果当前版本支持 OpenAI-compatible 配置，可以使用：

```bash
export OPENAI_API_KEY="$ARQEL_API_KEY"
export OPENAI_BASE_URL="$ARQEL_BASE_URL"
```

然后在 Codex 配置中选择对应 provider 或模型。

::: warning
Codex CLI 的认证和配置方式会随版本变化。请以你安装版本的官方文档和 `codex --help` 为准。
:::

## 方式 A：使用 CC-switch

步骤：

1. 打开 CC-switch。
2. 新增 Arqel Provider，填写 API Key、Base URL、具体模型名。
3. 切换到 Codex 页面。
4. 启用 Arqel Provider。
5. 关闭正在运行的 Codex。
6. 如果使用 VS Code 插件，Reload Window 或重启 VS Code。
7. 重新打开终端。
8. 运行 `codex`。

只读测试：

```text
请列出当前项目的主要目录，并解释每个目录的作用。不要修改文件。
```

::: details 图片占位：CC-switch 中 Codex Provider 配置
这里需要一张 CC-switch 的 Codex 配置截图，标注 Arqel Provider 已启用。
:::

## 方式 B：手动配置

如果当前 Codex 版本支持 OpenAI-compatible 配置，可以设置：

macOS / Linux / WSL：

```bash
export OPENAI_API_KEY="$ARQEL_API_KEY"
export OPENAI_BASE_URL="$ARQEL_BASE_URL"
```

Windows PowerShell：

```powershell
$env:OPENAI_API_KEY=$env:ARQEL_API_KEY
$env:OPENAI_BASE_URL=$env:ARQEL_BASE_URL
```

然后按 Codex 当前版本要求选择 Provider 和模型。

## 建议先执行只读任务

```text
请阅读当前项目结构，并说明如何运行测试。不要修改文件。
```

确认请求和上下文读取正常后，再执行代码修改任务。

## 推荐项目规则

可以在项目根目录准备 `AGENTS.md`：

```markdown
# AGENTS.md

## How to run
- Install:
- Test:

## Rules
- Make the smallest change that fixes the issue.
- Show a plan before editing.
- Never commit secrets or credentials.
- Before finishing, run tests or explain why not.
```

## VS Code 插件

如果你使用 Codex IDE / VS Code 插件：

1. 打开 VS Code。
2. 进入 Extensions。
3. 搜索 Codex。
4. 安装对应插件。
5. 配置登录或 API Provider。
6. 如果通过 CC-switch 切换配置，建议 Reload Window。

::: details 图片占位：VS Code 扩展市场中的 Codex 插件
这里需要一张 VS Code Extensions 页面截图，框出 Codex 插件。
:::

## 常见问题

### Codex 读不到配置

检查：

1. 当前运行的是 Windows 版还是 WSL 版 Codex。
2. CC-switch 写入的是哪套配置。
3. 是否重启 CLI 和 VS Code 插件。
4. 是否填写了 Arqel 支持的具体模型名。

### Windows 原生环境异常

优先尝试 WSL2。Codex、MCP、stdio 工具在类 Linux 环境里通常更稳定。
