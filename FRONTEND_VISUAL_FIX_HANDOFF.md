# Frontend visual fix handoff

> 历史记录：这份文件只用于较早的后台视觉/表格问题排查。当前开发交接入口请先看 `HANDOFF.md`。如果用户没有明确要求继续这些后台视觉问题，不要把本文件当作当前任务范围。

Repo: `/home/ycyc/projects/sub2api`
Branch: `arqel`
Fork remote: `origin = sudoyc/sub2api`
Frontend: `/home/ycyc/projects/sub2api/frontend`
Package manager: `pnpm` only. Do not use `npm`.
Deploy: do not deploy to VPS unless the user explicitly asks.

## Current Conclusion

Do not claim the current visual issues are fully fixed yet.

Earlier in the session, `/admin/users` empty-state alignment and admin shell lighting were verified with headless Chromium and mocked API data. After that, the live worktree changed further: `DataTable.vue`, `AuthLayout.vue`, `style.css`, `ProxiesView.vue`, branding utilities, and handoff files now contain additional edits. Those latest edits have not been browser-verified as a final whole.

The next session should treat the current worktree as a partial, dirty visual-fix branch that needs critical review, browser verification, and possibly pruning/rework.

## User-Reported Issues

- Empty-state/table alignment still looked wrong in screenshots.
- Admin/dashboard/list UI still had weird lighting/effects.
- Latest screenshot-related focus also includes `/admin/proxies` toolbar/row action alignment and button visual effects.
- User explicitly does not want a response that only says typecheck/lint/build passed; browser/DOM or screenshot-level verification is required.

Latest screenshot paths mentioned in the prior handoff:

- `/home/ycyc/.hermes/images/clip_20260514_201509_11.png`
- `/home/ycyc/.hermes/images/clip_20260514_201535_12.png`

If vision is available in the new session, inspect these first. If not, use browser/DOM/computed-style checks and/or image tools.

## Current Worktree

Latest observed `git status --short --branch`:

```text
## arqel
 M frontend/src/components/common/DataTable.vue
 M frontend/src/components/layout/AppHeader.vue
 M frontend/src/components/layout/AppLayout.vue
 M frontend/src/components/layout/AuthLayout.vue
 M frontend/src/components/layout/TablePageLayout.vue
 M frontend/src/main.ts
 M frontend/src/router/title.ts
 M frontend/src/stores/app.ts
 M frontend/src/style.css
 M frontend/src/views/admin/ProxiesView.vue
?? FRONTEND_VISUAL_FIX_HANDOFF.md
?? OPENCODE_FRONTEND_HANDOFF.md
?? frontend/src/utils/publicBrand.ts
?? sketches/
```

Latest observed `git diff --stat`:

```text
frontend/src/components/common/DataTable.vue       | 102 ++++++++++++-------
frontend/src/components/layout/AppHeader.vue       |   8 +-
frontend/src/components/layout/AppLayout.vue       |   8 --
frontend/src/components/layout/AuthLayout.vue      |  47 ++-------
frontend/src/components/layout/TablePageLayout.vue |   6 +-
frontend/src/main.ts                               |   5 +-
frontend/src/router/title.ts                       |   4 +-
frontend/src/stores/app.ts                         |  12 +--
frontend/src/style.css                             | 112 ++++++++++++++-------
frontend/src/views/admin/ProxiesView.vue           |  87 ++++++++++++----
10 files changed, 241 insertions(+), 150 deletions(-)
```

Run live status again in the new session and trust live output over this file.

## What Has Been Changed

### DataTable / Empty State

File: `frontend/src/components/common/DataTable.vue`

Current diff removes the old `<td colspan>` visible empty state from the desktop table body and renders the desktop empty slot separately as `.table-empty-layer` / `.table-empty-state`.

Important: the latest live diff currently shows `.table-empty-layer` as a sticky block with `left: 0`, `width: 100%`, `min-width: 100%`, and `min-height: 14rem`. This is not the exact absolute overlay variant that was previously verified in Chromium. Re-verify the current implementation.

Acceptance target:

- The empty visual center must match the visible `.table-wrapper` or `.table-scroll-container` center.
- It must not be centered against the overflowed wide table width.
- Sticky headers/columns and horizontal scrolling must still work for non-empty tables.

### Admin Shell Lighting

Files:

- `frontend/src/components/layout/AppLayout.vue`
- `frontend/src/components/layout/AppHeader.vue`
- `frontend/src/components/layout/TablePageLayout.vue`
- `frontend/src/style.css`

Current changes include:

- Removed `AppLayout` fixed radial `.app-shell-bg` decoration.
- Replaced `AppHeader` `glass` class with `.app-header` using opaque `var(--arqel-bg)`, no `backdrop-filter`, no shadow.
- Removed `TablePageLayout` table card shadow.
- Removed `TablePageLayout` `thead` `backdrop-blur-sm` and transparent color-mix background; now uses `var(--arqel-panel-muted)`.
- Removed global body radial background.
- Reduced `--arqel-shadow` in light/dark.

Acceptance target on admin/list routes:

- No `radial-gradient` on body/app shell/header/table card.
- No `backdrop-filter`/blur on app header or table header/card.
- No glow-like large/colored shadows on shell/header/table cards.

### Auth Layout Flattening

File: `frontend/src/components/layout/AuthLayout.vue`

Current changes include:

- Removed auth page decorative gradient orbs and grid background.
- Removed auth radial background.
- Added `.auth-card` with no shadow and no backdrop filter.
- Brand mark shadow removed.
- Subtitle now uses `normalizePublicSiteSubtitle`.

This needs visual verification on `/login` and auth-related pages if the screenshots include auth UI.

### Global Button/Shadow Flattening

File: `frontend/src/style.css`

Current changes include:

- `.btn-primary` changed from gradient/glow to solid accent and no shadow.
- `.btn-danger`, `.btn-success`, `.btn-warning`, `.btn-stripe`, `.btn-airwallex`, `.btn-alipay`, `.btn-wxpay` changed from gradient/shadow variants to flatter solid buttons with borders and no box shadow.

This is broader than the admin shell. New session should confirm it is desired and does not damage public/payment flows.

### Public Branding Normalization

Files:

- `frontend/src/utils/publicBrand.ts` (new, untracked)
- `frontend/src/main.ts`
- `frontend/src/router/title.ts`
- `frontend/src/stores/app.ts`
- `frontend/src/components/layout/AuthLayout.vue`

Current intent:

- Default public site name normalizes empty/`Sub2API` to `Arqel`.
- Default public subtitle normalizes empty/legacy `Subscription to API Conversion Platform` to `AI API Gateway`.

This is probably aligned with Arqel branding, but it is part of the dirty worktree and should be reviewed before commit.

### Proxies View Alignment

File: `frontend/src/views/admin/ProxiesView.vue`

Current changes include:

- Toolbar actions use `.proxy-toolbar-actions` and `.proxy-toolbar-button` for consistent height/alignment.
- Refresh icon button gets fixed square width.
- Removed duplicate icon `mr-2` where `.btn` already provides gap.
- Row actions use `.proxy-row-action` / `.proxy-row-action-danger`.
- Actions column class is set to `proxy-actions-column` with `width/min-width: 17rem`.

This must be verified on `/admin/proxies` with actual or mocked data. Check toolbar button top/height/center and row action alignment.

## Verification Already Done Earlier

Earlier before later edits, these checks passed:

- `pnpm run typecheck`
- `pnpm run lint:check`
- `pnpm run build`
- `git diff --check`

Earlier headless Chromium verification on `http://127.0.0.1:3000/admin/users` with mocked empty user data passed for the then-current implementation:

- Empty visual center matched `.table-wrapper`: `0px` delta.
- Empty visual center matched `.table-scroll-container`: `0px` delta.
- `body`, `.app-shell`, `.app-header`, `.table-scroll-container`, and table `thead` showed no radial gradient, no backdrop filter, and no shadow.

Important: because the worktree changed afterward, rerun all verification before claiming the current state is fixed.

## Required Next Verification

From `frontend/`:

```bash
pnpm run typecheck
pnpm run lint:check
pnpm run build
```

Browser/DOM verification required on `http://127.0.0.1:3000/`:

- `/admin/users` or the route matching the empty-state screenshot.
- `/admin/proxies` for toolbar/row action alignment and button effects.
- `/login` if the screenshot/auth complaint is relevant.

Suggested DOM checks:

```js
const wrap = document.querySelector('.table-wrapper')?.getBoundingClientRect()
const card = document.querySelector('.table-scroll-container')?.getBoundingClientRect()
const empty = document.querySelector('.table-empty-state, .empty-state')?.getBoundingClientRect()
console.log({
  wrap,
  card,
  empty,
  dxWrap: wrap && empty ? Math.abs((wrap.left + wrap.width / 2) - (empty.left + empty.width / 2)) : null,
  dxCard: card && empty ? Math.abs((card.left + card.width / 2) - (empty.left + empty.width / 2)) : null,
})
```

For lighting/effects, inspect computed styles for:

- `body`
- `.app-shell`
- `.app-header`
- `.table-scroll-container`
- `.table-scroll-container thead`
- complained buttons/action cells

Check `backgroundImage`, `backdropFilter`, `filter`, `boxShadow`, and element bounding rects.

## Files Not To Commit Unless Explicitly Intended

- `OPENCODE_FRONTEND_HANDOFF.md`
- `FRONTEND_VISUAL_FIX_HANDOFF.md` unless user wants handoff docs committed
- `sketches/`
- `sketches/gemini.html~` is ignored backup

Do not commit/push/deploy unless user explicitly asks.

## New Session Prompt

```text
You are working in /home/ycyc/projects/sub2api on branch arqel. This is my fork sudoyc/sub2api. Frontend is in frontend/ and uses pnpm only; do not use npm. Do not deploy to VPS.

Read /home/ycyc/projects/sub2api/FRONTEND_VISUAL_FIX_HANDOFF.md first. The worktree is dirty with partial frontend visual fixes. Do not assume the current edits are correct and do not claim the visual bugs are fixed just because typecheck/lint/build pass.

Tasks: review the current diff, inspect the latest screenshots if possible, then verify/fix the admin table empty-state alignment, weird lighting/effects, auth/admin shell flattening, and /admin/proxies toolbar/row action alignment. Use browser/DOM/computed-style verification on http://127.0.0.1:3000/. Run pnpm run typecheck, pnpm run lint:check, and pnpm run build. Do not commit/push/deploy unless I explicitly ask.
```
