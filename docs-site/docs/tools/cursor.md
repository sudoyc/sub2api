# Cursor 接入

Cursor 适合在编辑器里直接使用 AI 辅助写代码。如果你的 Cursor 配置支持自定义 OpenAI-compatible API，可以接入 Arqel。

Cursor 和命令行 Agent 不完全一样。它主要是编辑器应用，配置入口通常在设置界面里，而不是终端配置文件。

::: details 图片占位：Cursor 设置入口
这里需要一张 Cursor 设置页面截图，标注进入模型/API 配置的位置。
:::

## 准备工作

- 一个 Arqel API Key。
- Arqel Base URL。
- 一个 Arqel 控制台中可用的具体模型名。

## macOS / Windows / Linux 差异

Cursor 是桌面应用，三端核心配置思路一致：

1. 打开 Cursor 设置。
2. 找到模型或 API 配置。
3. 填入 API Key、Base URL、模型名。
4. 保存后重启 Cursor 或 Reload Window。

差异主要在安装方式：

- macOS：下载 `.dmg`，拖入 Applications。
- Windows：下载安装包并按提示安装。
- Linux：根据官方提供的安装包或 AppImage 安装。

如果你在 WSL 中开发代码，但 Cursor 运行在 Windows 上，需要确认 Cursor 实际读取的是 Windows 环境还是 Remote - WSL 项目环境。

## 配置思路

1. 打开 Cursor 的模型或 API 设置。
2. 找到 OpenAI-compatible / Custom API 配置项。
3. 填入 Arqel API Key。
4. 填入 Arqel Base URL。
5. 选择模型并发送测试问题。

::: warning
不同 Cursor 版本的设置入口可能变化。本文档后续会按实际版本补充截图和具体字段名。
:::

::: details 图片占位：Cursor 自定义 API 配置表单
这里需要一张 Cursor 模型/API 设置表单截图，标注 API Key、Base URL、模型名字段。请打码 Key。
:::

## 测试问题

可以先问一个很短的问题：

```text
请用一句话解释 Base URL 是什么。
```

如果能正常回复，再尝试真实代码任务。

## 常见问题

### Cursor 没有自定义 Base URL 入口

不同版本和订阅状态可能影响可配置项。请先确认当前 Cursor 版本是否支持 OpenAI-compatible / Custom API。

### 配置后仍然失败

按顺序检查：

1. Arqel API Key 是否可用。
2. Base URL 是否完整。
3. 模型名是否来自 Arqel 控制台。
4. Cursor 是否需要重启或 Reload Window。
5. 当前请求是否真的走了自定义 Provider。
