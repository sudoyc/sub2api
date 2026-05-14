# Claude Code 接入

Claude Code 是命令行里的 AI 编程 Agent。接入时要重点确认它是否支持你当前使用方式下的自定义 API 地址和 Key。

本页分两种方式：

- 使用 CC-switch 管理配置。
- 手动配置环境变量或工具配置。

如果你同时使用多个 Agent，建议优先读 [CC-switch 使用教程](/tools/cc-switch)。

::: details 图片占位：Claude Code 在终端中的启动界面
这里需要一张 Claude Code 启动后的终端截图，展示已经进入 Claude Code 交互界面。截图中不要包含 API Key。
:::

## 安装

Claude Code 需要 Node.js 和 npm。请先确认：

```bash
node -v
npm -v
```

如果命令不存在，先回到 [环境准备](/setup/)。

macOS / Linux / WSL：

```bash
npm install -g @anthropic-ai/claude-code
claude --version
```

Windows PowerShell：

```powershell
npm install -g @anthropic-ai/claude-code
claude --version
```

### macOS 注意事项

- 推荐先用 Homebrew 或 nvm 安装 Node.js。
- 如果 `npm install -g` 权限失败，优先处理 Node 安装方式，不建议长期依赖 `sudo`。
- 安装后如果 `claude` 命令找不到，重开终端再试。

### Windows 注意事项

- 推荐在 Windows Terminal / PowerShell 中安装。
- 安装后务必重新打开终端。
- 如果后续涉及复杂 MCP 或 shell 工具，遇到兼容问题时再考虑 WSL2。

### WSL 注意事项

- 如果你在 WSL 里安装 Claude Code，就要在 WSL 里配置 Key。
- Windows PowerShell 里的环境变量不会自动同步到 WSL。
- 项目建议放在 `~/code/...`，不要放在 `/mnt/c/...`。

## 适用场景

- 在终端里让 Agent 阅读、修改和解释项目代码。
- 做代码审查、错误排查、重构建议。
- 执行多步骤开发任务。

## 配置要点

- API Key 使用 Arqel 创建的 Key。
- Base URL 使用 Arqel 提供的地址。
- 模型名按工具支持情况填写。

常见环境变量形态：

```bash
export ANTHROPIC_API_KEY="$ARQEL_API_KEY"
export ANTHROPIC_BASE_URL="$ARQEL_BASE_URL"
```

::: warning
Claude Code 的配置能力会随版本变化。请以当前版本官方文档为准确认 Base URL / Gateway 配置项。
:::

## 方式 A：使用 CC-switch

适合多工具用户。

步骤：

1. 安装并打开 CC-switch。
2. 新增 Arqel Provider。
3. Provider 中填写 Arqel API Key、Base URL、具体模型名。
4. 切到 Claude Code 页面。
5. 启用 Arqel Provider。
6. 关闭正在运行的 Claude Code。
7. 重新打开终端，进入项目目录。
8. 运行 `claude`。

只读测试：

```text
请阅读当前目录，说明这是什么项目。不要修改任何文件。
```

::: details 图片占位：CC-switch 中 Claude Code Provider 配置
这里需要一张 CC-switch 的 Claude Code 配置截图，标注 Arqel Provider 已启用。
:::

## 方式 B：手动配置

如果当前 Claude Code 版本支持通过环境变量指定网关，可以按工具文档配置类似变量：

macOS / Linux / WSL：

```bash
export ANTHROPIC_API_KEY="$ARQEL_API_KEY"
export ANTHROPIC_BASE_URL="$ARQEL_BASE_URL"
```

Windows PowerShell：

```powershell
$env:ANTHROPIC_API_KEY=$env:ARQEL_API_KEY
$env:ANTHROPIC_BASE_URL=$env:ARQEL_BASE_URL
```

然后运行：

```bash
claude
```

::: warning
不同版本 Claude Code 对 Base URL / Gateway 的支持方式可能不同。若命令无法识别，请以官方文档和当前版本帮助信息为准。
:::

## VS Code 插件

如果你使用 Claude Code 的 VS Code 插件：

1. 打开 VS Code。
2. 进入 Extensions。
3. 搜索 Claude Code。
4. 安装插件。
5. 按插件提示登录或连接本地 CLI。
6. 如果刚通过 CC-switch 切换 Provider，建议执行 Reload Window 或重启 VS Code。

::: details 图片占位：VS Code 扩展市场中的 Claude Code 插件
这里需要一张 VS Code Extensions 页面截图，框出 Claude Code 插件。
:::

## 建议先测试

在真实项目里执行复杂任务前，先让 Agent 回答一个不改文件的问题：

```text
请说明当前目录下 package.json 的 scripts 含义，不要修改文件。
```

确认请求能正常返回后，再授权它进行代码修改。

## 推荐项目规则

在项目根目录准备 `CLAUDE.md`，写清楚：

```markdown
# CLAUDE.md

## Project
- Tech stack:
- How to run tests:

## Rules
- Prefer small, reviewable diffs.
- Do not commit secrets.
- Before finishing, show changed files and verification results.
```

## 常见问题

### `claude` 命令找不到

先检查：

```bash
node -v
npm -v
```

再重新安装 Claude Code，并重开终端。

### 切换 CC-switch 后还是走旧配置

检查：

1. CC-switch 是否启用了正确 Provider。
2. 是否重启 Claude Code。
3. 当前是在 macOS/Windows 终端，还是 WSL 终端。
4. 你安装的 Claude Code 是否和 CC-switch 管理的是同一套用户目录。

### 能启动但请求失败

优先检查 Arqel API Key、Base URL、模型名。不要先怀疑 Agent，先用 [发送第一条请求](/getting-started/first-request) 验证 API 本身可用。
