# Gemini Design Prompt: Arqel Homepage Redesign

使用 `current-exact.html` 作为当前线上首页的视觉和内容基准。它是从当前 `HomeView.vue` 结构和中文 i18n 文案整理出来的静态快照。请以这个文件为“现状”，不要把它当成目标稿。

请基于我提供的 HTML 参考稿，重新设计一个更有信息量、更美观的 Arqel 首页静态 HTML。目标是给前端工程师作为 Vue 首页改版参考，不需要接入真实后端。

## 背景

Arqel 是一个面向 AI 编程工具和 Agent 的多模型 API 接入层。用户关心的不是抽象的「统一 API」，而是：

- 我的 Agent / CLI 能不能接？
- 支持 Claude、GPT、Gemini 哪些模型族？
- 配置时要填哪些东西？
- 请求、用量、费用、错误在哪里看？

当前首页的问题是文案太空泛，五个 guide 叙事栏信息密度低。请删除这类长篇 guide 叙事，改成更具体的信息模块。

## 必须包含的内容模块

1. Hero
   - 直接说明 Arqel 是「AI Agent / 编程工具的多模型 API 入口」。
   - 不要写夸张营销文案。
   - 需要有两个 CTA：创建 API Key、查看配置教程。

2. 支持的 Agent / 客户端矩阵
   - Claude Code
   - Gemini CLI
   - Codex CLI
   - OpenCode
   - Cursor
   - Antigravity
   - 每个卡片写清楚适用场景和接入方式，不要只有名字。

3. 支持的模型与能力
   - Claude：Sonnet / Opus / Haiku
   - GPT：OpenAI-compatible / Codex CLI 场景
   - Gemini：Pro / Flash / Image
   - 可提到 Sora / Image 作为扩展能力，但不要放大成核心卖点。
   - 同时展示：统一 Base URL、独立凭证、模型名选择、分组路由、用量记录、错误排查。

4. 配置示例
   - 用一个漂亮的代码块或控制台卡片展示：API Key、Base URL、模型名。
   - 让用户一眼知道实际要填什么。

5. 边界说明
   - Arqel 不是 Claude、OpenAI、Gemini 官方服务。
   - 它是接入层和管理面板，不替代官方账号权益。

## 视觉方向

偏开发者工具，不要 SaaS 模板感。可以参考这些气质：

- Cursor：克制、编辑器/代码面板、清晰的信息层级。
- OpenCode：终端感、具体配置、不要空泛插画。
- Vercel / Linear：干净、高密度、有工程感。

推荐风格：

- 深色为主，紫蓝色作为少量强调色。
- 大标题要有冲击力，但正文要短。
- 使用真实信息矩阵、代码块、状态标签、模型/Agent 卡片。
- 卡片不要太多阴影，使用细边框、半透明面板和层次清晰的网格。
- 页面在移动端也要可读，Agent 矩阵可以从 3 列变 1 列。

## 文案约束

- 语言：中文。
- 品牌名：Arqel。
- 不要出现 Sub2API，除非是内部或上游项目说明；首页不应出现。
- 不要使用「革命性」「一站式」「无缝」「极致」这类空话。
- 每段正文尽量不超过 2 行。
- 多用具体名词：Claude Code、Gemini CLI、Codex CLI、OpenCode、Cursor、Base URL、API Key、模型名、用量记录、请求日志。

## 输出要求

- 输出一个完整可运行的单文件 HTML。
- CSS 写在 `<style>` 里，不依赖外部框架。
- 可以用纯 CSS 做细微动效，但不要过度。
- 不要使用图片资源。
- 可以使用文字 Logo、简洁 SVG 或 CSS 图形。
- 保持桌面和移动端响应式。

## 参考信息结构

请参考同目录的 `current-exact.html`。这个文件代表当前首页长什么样、有哪些区块、哪里信息密度低。你的任务是重新设计，不是复制它。

## 重要判断标准

用户打开首页 10 秒内应该知道：

- Arqel 给哪些 Agent 用。
- 支持哪些模型族。
- 配置时要填哪些东西。
- 为什么它比一段抽象介绍更有用。
