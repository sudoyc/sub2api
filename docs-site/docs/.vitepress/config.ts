import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Arqel Docs',
  description: 'Arqel 入门教程、工具接入、概念说明和常见帮助。',
  lang: 'zh-CN',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { property: 'og:site_name', content: 'Arqel Docs' }],
    ['meta', { property: 'og:url', content: 'https://docs.arqel.net/' }]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Arqel Docs',
    nav: [
      { text: '入门', link: '/getting-started/' },
      { text: '工具接入', link: '/tools/' },
      { text: '概念', link: '/concepts/' },
      { text: '常见帮助', link: '/help/' }
    ],
    sidebar: [
      {
        text: '入门教程',
        collapsed: false,
        items: [
          { text: '从 0 开始', link: '/getting-started/' },
          { text: '环境准备总览', link: '/setup/' },
          { text: 'macOS 环境准备', link: '/setup/macos' },
          { text: 'Windows 环境准备', link: '/setup/windows' },
          { text: 'Linux / WSL 环境准备', link: '/setup/linux-wsl' },
          { text: '环境变量与安全', link: '/setup/env-vars' },
          { text: '创建 API Key', link: '/getting-started/api-key' },
          { text: '发送第一条请求', link: '/getting-started/first-request' },
          { text: '接入检查清单', link: '/getting-started/checklist' }
        ]
      },
      {
        text: '常见工具和 Agent',
        collapsed: false,
        items: [
          { text: '工具接入总览', link: '/tools/' },
          { text: 'CC-switch', link: '/tools/cc-switch' },
          { text: 'Cursor', link: '/tools/cursor' },
          { text: 'Claude Code', link: '/tools/claude-code' },
          { text: 'Gemini CLI', link: '/tools/gemini-cli' },
          { text: 'Codex CLI', link: '/tools/codex-cli' },
          { text: 'OpenAI SDK', link: '/tools/openai-sdk' }
        ]
      },
      {
        text: '概念梳理',
        collapsed: false,
        items: [
          { text: '核心概念', link: '/concepts/' },
          { text: 'Base URL', link: '/concepts/base-url' },
          { text: '模型选择', link: '/concepts/models-and-routing' },
          { text: '用量、余额和计费', link: '/concepts/usage-and-billing' }
        ]
      },
      {
        text: '常见帮助',
        collapsed: false,
        items: [
          { text: 'FAQ', link: '/help/' },
          { text: '请求失败排查', link: '/help/troubleshooting' },
          { text: '错误码', link: '/help/errors' }
        ]
      },
      {
        text: 'API 参考',
        collapsed: true,
        items: [
          { text: 'API 总览', link: '/api/' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '语言',
    externalLinkIcon: true,
    footer: {
      message: 'Arqel 是 AI API 接入层，模型能力、速度和可用性仍受上游状态影响。',
      copyright: 'Copyright © 2026 Arqel'
    }
  }
})
