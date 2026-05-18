# Arqel 首页文案交接文档

## 状态

文案已完成，只改了 i18n 文件，**模板和 CSS 未动**。

改动文件：
- `frontend/src/i18n/locales/zh.ts`
- `frontend/src/i18n/locales/en.ts`

## 改动摘要

### Hero 区
| Key | 旧 | 新 |
|-----|----|----|
| `arqel.subtitle` | 把 Claude、GPT、Gemini 接入你的工作流 | 把 Claude、GPT、Gemini 统一接入你的工具链 |
| `arqel.description` | Arqel 提供统一的 API 地址、清晰的模型配置和用量记录。你仍然按模型或服务配置对应的 Key / 凭证；Arqel 负责把接入过程整理得更顺手。 | 一个 API 地址，一份用量面板。Arqel 帮你把模型接入整理清楚。 |

### Metrics 区（3 个标签）
| Key | 旧 | 新 |
|-----|----|----|
| `arqel.metrics.apiUrl` | 统一 API 地址 | 一个入口，全部模型 |
| `arqel.metrics.configItems` | 模型凭证分别配置 | 凭证按模型独立管理 |
| `arqel.metrics.modelChoice` | 按需选择模型 | 用量和消耗透明可查 |

### Guide 区（5 篇）
| Key | 改动 |
|-----|------|
| `arqel.guide.prepare.*` | 未改 |
| `arqel.guide.models.desc` | 去掉「首页只告诉你怎么开始」→「怎么开始看这里」 |
| `arqel.guide.cost.desc` | 「应该让」→「提供」 |
| `arqel.guide.error.desc` | 精简身体段落 |
| `arqel.guide.official.desc` | 「更像一个整理好的接入层」→「是一个接入层工具」 |

### Resources 区
| Key | 旧 | 新 |
|-----|----|----|
| `arqel.resources.beginner.title` | 从第一套可用配置开始 | 先跑通一套，再慢慢调整 |
| `arqel.resources.beginner.desc` | 教程会按工具场景说明... | 教程按工具场景（Cursor、Claude Code）说明... |
| `arqel.resources.community.title` | 需要人工确认时 | 还是没跑通？ |
| `arqel.resources.community.desc` | 如果你已经按教程配置，但仍然不确定... | 按教程配置后仍不确定问题出在哪，可以带着错误信息来问。 |
| `arqel.resources.community.action` | 加入交流群 | 获取支持 |

## 部署须知

线上 arqel.net 的后台数据库里存了一份 `homeContent`（自定义 HTML），它会**覆盖** Vue 模板。部署后需要：

1. 登录后台 → 系统设置 → 找到「首页自定义内容 / Home Content」字段
2. **清空该字段并保存**

清空后线上首页就会走 Vue 模板 + 新 i18n 文案，与本地 Docker 效果一致。

## 不要动的东西

- `HomeView.vue` 的模板结构和 CSS —— 动画、布局、响应式都在这里，不要改
- i18n 的 key 名称 —— 模板依赖这些 key，改名会炸

## 本地验证

```bash
cd frontend && pnpm dev --host 127.0.0.1
# 访问 http://127.0.0.1:3000/home
```

中文版在 `?locale=zh` 或点右上角语言切换。英文版默认。
