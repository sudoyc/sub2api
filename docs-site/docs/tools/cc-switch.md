# CC-switch 使用教程

CC-switch 是一个跨平台桌面工具，用来统一管理 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw 等 Agent 工具的 Provider、MCP、Prompts 和 Skills。

如果你只使用一个工具，可以先手动配置；如果你会同时使用 Claude Code、Gemini CLI、Codex CLI，推荐尽早使用 CC-switch，避免反复手改配置文件。

::: tip 适合谁
这篇教程适合已经完成 [环境准备](/setup/) 和 [创建 API Key](/getting-started/api-key) 的用户。如果你还不知道 API Key 和 Base URL 是什么，先读入门教程。
:::

## CC-switch 在 Arqel 流程里的位置

推荐顺序是：

1. 安装基础环境：Node.js、Git、VS Code。
2. 登录 Arqel，创建 API Key。
3. 在 Arqel 控制台复制 Base URL 和具体模型名。
4. 安装 CC-switch。
5. 在 CC-switch 中新增 Arqel Provider。
6. 把这个 Provider 应用到 Claude Code、Gemini CLI 或 Codex CLI。
7. 重启对应工具并发送测试请求。

CC-switch 不是模型服务，也不是 Arqel 的替代品。它只是帮你把不同工具的配置集中管理。

## 你需要准备什么

- Arqel API Key。
- Arqel Base URL。
- 一个具体可用的模型名。
- 已安装的目标 Agent 工具，例如 Claude Code、Gemini CLI、Codex CLI。
- CC-switch 安装包。

::: details 图片占位：Arqel 控制台中 API Key / Base URL / 模型名的位置
这里需要一张截图，标注 Arqel 控制台里三个位置：API Key、Base URL、可用模型名。截图中请隐藏完整 Key，只保留前后几位。
:::

## 下载 CC-switch

官方入口：

- 官网：[https://ccswitch.io](https://ccswitch.io)
- GitHub Releases：[https://github.com/farion1231/cc-switch/releases](https://github.com/farion1231/cc-switch/releases)

### macOS

推荐方式一：Homebrew。

```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
```

升级：

```bash
brew upgrade --cask cc-switch
```

推荐方式二：下载 `.dmg`。

1. 打开 Releases 页面。
2. 找到最新版。
3. 下载 macOS `.dmg` 文件。
4. 双击打开，把 CC-switch 拖入 Applications。
5. 从启动台或应用程序目录打开。

::: details 图片占位：macOS Releases 下载位置
这里需要一张 GitHub Releases 截图，框出 macOS `.dmg` 下载项。
:::

### Windows

推荐下载 `.msi` 安装包。

1. 打开 Releases 页面。
2. 找到最新版。
3. 下载 Windows `.msi`。
4. 双击安装。
5. 从开始菜单打开 CC-switch。

如果你不想安装，也可以下载 Portable 版本，但新手推荐 `.msi`。

::: details 图片占位：Windows MSI 下载位置
这里需要一张 GitHub Releases 截图，框出 Windows `.msi` 下载项。
:::

### Linux

根据发行版选择：

- Debian / Ubuntu：下载 `.deb`。
- Fedora / RHEL / openSUSE：下载 `.rpm`。
- 不确定发行版：可以尝试 `.AppImage`。

Ubuntu / Debian 示例：

```bash
sudo apt install ./CC-Switch-v版本号-Linux.deb
```

如果使用 AppImage：

```bash
chmod +x CC-Switch-v版本号-Linux.AppImage
./CC-Switch-v版本号-Linux.AppImage
```

::: details 图片占位：Linux 安装包下载位置
这里需要一张 GitHub Releases 截图，框出 `.deb`、`.rpm`、`.AppImage` 三类文件。
:::

## 第一次打开 CC-switch

第一次打开时，CC-switch 可能会扫描你现有的 Claude Code、Gemini CLI、Codex CLI 配置。

建议：

1. 如果你之前没有配置过这些工具，可以直接进入主界面。
2. 如果你已有官方登录配置，先不要删除，让 CC-switch 导入为默认配置。
3. 在新增 Arqel Provider 前，确认当前工具能正常启动。

::: details 图片占位：CC-switch 首次启动或主界面
这里需要一张 CC-switch 主界面截图，标注左侧工具列表、Provider 区域、启用按钮。
:::

## 新增 Arqel Provider

不同版本界面文字可能略有差异，但核心字段通常类似：

| 字段 | 填什么 |
| --- | --- |
| Provider 名称 | `Arqel` 或 `Arqel Claude` |
| API Key | Arqel 控制台创建的 Key |
| Base URL | Arqel 控制台提供的 Base URL |
| 模型名 | 控制台里可用的具体模型名 |
| Provider 类型 | 按目标工具选择 Claude / OpenAI-compatible / Gemini 等 |

操作步骤：

1. 点击 Add Provider 或新增 Provider。
2. 选择预设或 Custom Provider。
3. 填入 Provider 名称。
4. 填入 Arqel API Key。
5. 填入 Arqel Base URL。
6. 填入具体模型名。
7. 保存。
8. 点击 Enable 或切换到该 Provider。

::: warning
模型名必须填写 Arqel 控制台里可用的具体名称。不要填写不存在的模型名，也不要使用文档中的占位文字。
:::

::: details 图片占位：新增 Provider 表单
这里需要一张 CC-switch 新增 Provider 的截图，标注 Provider 名称、API Key、Base URL、模型名字段。请用打码 Key。
:::

## 应用到不同 Agent

CC-switch 的价值在于同一套 Provider 信息可以写入不同工具的配置文件。但每个工具生效方式不同。

### Claude Code

建议流程：

1. 在 CC-switch 里选择 Claude Code。
2. 启用 Arqel Provider。
3. 关闭正在运行的 Claude Code。
4. 重新打开终端。
5. 进入项目目录。
6. 运行 `claude`。
7. 发送一个只读问题测试。

测试问题：

```text
请说明当前目录是什么项目，不要修改任何文件。
```

如果失败，优先检查 Base URL、Key、模型名。

::: details 图片占位：Claude Code Provider 启用状态
这里需要一张 CC-switch 中 Claude Code 页面启用 Arqel Provider 后的截图。
:::

### Gemini CLI

建议流程：

1. 在 CC-switch 里选择 Gemini CLI。
2. 启用 Arqel Provider。
3. 关闭正在运行的 Gemini CLI。
4. 重新打开终端。
5. 进入可信项目目录。
6. 运行 `gemini`。
7. 发送一个简单问题测试。

Gemini CLI 可能有 Trusted Folder 机制。如果配置看起来没生效，先确认当前目录是否被信任。

::: details 图片占位：Gemini CLI Provider 启用状态
这里需要一张 CC-switch 中 Gemini CLI 页面启用 Arqel Provider 后的截图。
:::

### Codex CLI

建议流程：

1. 在 CC-switch 里选择 Codex。
2. 启用 Arqel Provider。
3. 重启 Codex CLI。
4. 如果使用 VS Code 插件，也建议 Reload Window 或重启 VS Code。
5. 运行 `codex` 或执行一个只读任务。

Windows 用户如果遇到 Codex 原生环境兼容问题，建议在 WSL2 中使用。

::: details 图片占位：Codex Provider 启用状态
这里需要一张 CC-switch 中 Codex 页面启用 Arqel Provider 后的截图。
:::

## 多平台注意事项

### macOS

- 如果用 Homebrew 安装 CC-switch，升级更方便。
- 如果应用无法打开，先确认下载来源是官网或 GitHub Releases。
- 终端环境变量和 CC-switch 写入的配置可能都存在，排查时要确认当前工具实际读取哪个配置。

### Windows

- 建议先用 Windows 原生版本 CC-switch 管理 Windows 里的 CLI。
- 如果 CLI 在 WSL 中运行，Windows 版 CC-switch 未必能直接管理 WSL 内的配置文件。
- Windows PowerShell 和 WSL 的环境变量不自动同步。
- 使用 Codex 或 MCP 遇到兼容问题时，优先考虑 WSL2。

### Linux / WSL

- Linux 桌面环境可以直接使用 Linux 版 CC-switch。
- WSL 场景要特别注意：你的 CLI 是运行在 Windows 里，还是运行在 WSL 里。
- 如果 CLI 运行在 WSL 里，配置文件也在 WSL 用户目录中，例如 `~/.codex`、`~/.gemini`。

::: warning
不要混用“Windows 里的 CLI”和“WSL 里的 CLI”而不自知。它们读取的配置文件位置可能完全不同。
:::

## 常见问题

### 切换 Provider 后没有生效

按顺序排查：

1. 是否点击了 Enable / 启用。
2. 是否重启了对应 CLI。
3. 是否重启了 VS Code 插件。
4. 当前运行的是 Windows 里的 CLI，还是 WSL 里的 CLI。
5. Provider 里 Base URL、API Key、模型名是否填写正确。

### 我还能切回官方登录吗？

可以。CC-switch 支持保留官方登录或官方 Provider。建议不要删除默认配置，新增 Arqel Provider 后在两者之间切换。

### CC-switch 会不会替我创建 Arqel Key？

不会。API Key 仍然需要你在 Arqel 控制台创建。CC-switch 只是保存和写入配置。

### 是否必须使用 CC-switch？

不是。单个工具可以手动配置。多工具并行时，CC-switch 能减少重复配置和路径错误。

## 下一步

- [Claude Code 接入](/tools/claude-code)
- [Gemini CLI 接入](/tools/gemini-cli)
- [Codex CLI 接入](/tools/codex-cli)
