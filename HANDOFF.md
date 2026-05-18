# sub2api 开发交接速报

更新时间：2026-05-18
仓库：`/home/ycyc/projects/sub2api`
当前分支：`arqel`
远端：`origin = git@github.com:sudoyc/sub2api.git`
最近提交：`95a393e6 fix easypay mapi signature compatibility`

这份文档是给新会话用的开发交接入口。先读这里，再按需要去看 `DEV_GUIDE.md`、README 或具体代码。

## 先确认范围

- 当前要整理的是 `sub2api` 仓库内的开发交接文档，不是公网文档站内容。
- 公网文档站已经迁到 `/home/ycyc/projects/arqel-docs`，规则见 `DOCS_MOVED_TO_ARQEL_DOCS.md`。除非用户明确要求，不要编辑 `arqel-docs`。
- `5173` 很可能是 VitePress 文档站，不是 `sub2api` 前端首页。`sub2api` 前端默认开发端口来自 `frontend/vite.config.ts`，通常是 `3000`。
- 本仓库里的 `docs/` 不是当前这次要整理的公网文档站入口，避免重新创建 `docs-site/`。

## 项目现状

`sub2api` 是一个 AI API Gateway / 模型接口中转平台：

- 后端：Go + Gin + Ent，代码在 `backend/`。
- 前端：Vue 3 + Vite + TypeScript + TailwindCSS，代码在 `frontend/`。
- 数据：PostgreSQL + Redis。
- 构建产物：前端 build 输出到 `backend/internal/web/dist`，再由后端嵌入/服务。
- 部署资料：`deploy/`。

当前仓库文件显示：

- Go 版本以 `backend/go.mod` 和 GitHub Actions 为准：`go 1.26.3`。
- Node 版本以 GitHub Actions 为准：`20`。
- 前端包管理只用 `pnpm`，不要用 `npm` 改 lockfile。

## 当前工作区状态

截至本交接文档写入前，`git status --short` 显示：

```text
 M backend/internal/web/embed_on.go
 M backend/internal/web/embed_test.go
 M frontend/src/i18n/locales/en.ts
 M frontend/src/i18n/locales/zh.ts
 M frontend/src/views/HomeView.vue
?? .hermes/
?? sketches/020-home-middle-options/
?? sketches/rendered-from-app/
?? tools/render_frontend_snapshots.mjs
```

接手时必须重新运行：

```bash
git status --short
git diff --stat
```

不要因为这份文档记录了状态就跳过现场检查。

## 当前未提交改动说明

### 首页文案和布局

涉及文件：

- `frontend/src/views/HomeView.vue`
- `frontend/src/i18n/locales/zh.ts`
- `frontend/src/i18n/locales/en.ts`

当前方向：

- 首页主文案改成更直接的模型接口服务表达。
- 删除了原来 01-05 的长段落说明。
- 保留三张重点卡片：一个入口、一把 Key、用量可查。
- 底部资源区压缩为轻量入口：开始使用 / 接入文档 / 支持。

注意：

- 用户后续认为首页下面不需要硬塞内容，文档里能说清的东西不要再堆到首页。
- 若继续改首页，先看当前 diff，不要恢复之前那些长文案。
- 之前有一次 `cd frontend && pnpm typecheck` 通过；接手后如继续改前端，仍应重新跑。

### 后端标题注入和品牌默认值

涉及文件：

- `backend/internal/web/embed_on.go`
- `backend/internal/web/embed_test.go`

当前 diff 的意图：

- 在后端注入静态 HTML 标题时，将空站点名或 `Sub2API` 默认名归一到 `Arqel`。
- 对应测试覆盖了空值、缺失值、默认名和非法 JSON。

注意：

- 这是当前工作区里已经存在的改动，不要随手回退。
- 如要继续处理品牌默认值，前后端默认值应一起检查，避免首屏 HTML title 和前端运行后 title 不一致。

### 未跟踪内容

当前存在这些未跟踪内容：

- `.hermes/`
- `sketches/020-home-middle-options/`
- `sketches/rendered-from-app/`
- `tools/render_frontend_snapshots.mjs`

这些多半是视觉探索、截图或工具文件。除非用户明确要求清理，不要删除。

## 常用开发命令

前端：

```bash
cd frontend
pnpm install
pnpm dev
pnpm typecheck
pnpm lint:check
pnpm build
pnpm test:run
```

后端：

```bash
cd backend
go run ./cmd/server
go test -tags=unit ./...
go test -tags=integration ./...
golangci-lint run ./...
go generate ./ent
```

仓库级：

```bash
make build
make test-frontend
make test-backend
make secret-scan
```

端口规则：

- 后端部署/本地默认常见端口：`8080`。
- 前端 Vite 默认端口：`3000`，可用 `VITE_DEV_PORT` 改。
- 如果浏览器打开 `5173` 看到的是 Arqel Docs，那是在看文档站，不是在看 `sub2api` 首页。

## 新会话接手顺序

1. 先确认用户当前要改的是主站/前端、后端逻辑、还是公网文档站。
2. 在 `/home/ycyc/projects/sub2api` 运行 `git status --short` 和 `git diff --stat`。
3. 如果继续首页，读取 `frontend/src/views/HomeView.vue` 和两个 i18n 文件的当前 diff。
4. 如果继续品牌默认值，读取 `backend/internal/web/embed_on.go`、`backend/internal/web/embed_test.go`，并检查前端 title/branding 相关代码。
5. 如果用户提到 `5173`、VitePress、docs.arqel.net、文档站，先提醒这是 `/home/ycyc/projects/arqel-docs` 的范围，除非用户明确要求切仓库。
6. 只在相关代码改动后跑对应验证；不要用“旧 handoff 里说通过了”替代现场验证。

## 旧 handoff 文件

仓库里还有两个视觉问题交接文件：

- `FRONTEND_VISUAL_FIX_HANDOFF.md`
- `OPENCODE_FRONTEND_HANDOFF.md`

它们记录的是较早的后台视觉/表格问题，不是当前开发交接入口。只有当用户明确要求继续那些后台视觉问题时再参考；否则以本文件为准。

## 可直接给新会话的开场提示

```text
请在 /home/ycyc/projects/sub2api 继续开发。先读 HANDOFF.md，再运行 git status --short 和 git diff --stat。当前目标是 sub2api 仓库本身，不是 /home/ycyc/projects/arqel-docs 文档站。不要编辑 arqel-docs，除非我明确要求。
```
