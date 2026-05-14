# OpenCode handoff: repair admin table empty-state alignment and remove dashboard lighting effects

Repo: /home/ycyc/projects/sub2api
Fork remote: origin = sudoyc/sub2api
Current branch observed: arqel
Frontend: /home/ycyc/projects/sub2api/frontend
Package manager: pnpm only. Do not use npm.
VPS deploy: do not deploy. VPS is only for runtime/deploy after user confirmation.

## User complaint

The user attached screenshots and reported:

- The empty-state/table alignment problem is still not fixed.
- There is still weird lighting/effects on the dashboard/admin UI.
- Docker dev is on port 3000, but the visual result shown by the user still does not reflect the desired fix.

Screenshot paths from the Hermes session:

- /home/ycyc/.hermes/images/clip_20260514_174522_6.png
- /home/ycyc/.hermes/images/clip_20260514_174531_7.png

Hermes vision was unavailable in this session, so inspect in browser/code instead of relying on the screenshots being analyzed here.

## Current state / important caveat

Hermes made a partial attempted fix in these files:

- frontend/src/components/common/DataTable.vue
- frontend/src/components/layout/AppLayout.vue
- frontend/src/style.css

Do not assume that attempted fix is correct. Review it critically and replace it if needed.

At the time of handoff, `git status --short --branch` showed:

```text
## arqel
 M frontend/src/components/common/DataTable.vue
 M frontend/src/components/layout/AppLayout.vue
 M frontend/src/style.css
?? OPENCODE_FRONTEND_HANDOFF.md
?? sketches/
```

Run live status first and trust live output over this document:

```bash
cd /home/ycyc/projects/sub2api
git status --short --branch
git diff --stat
git diff -- frontend/src/components/common/DataTable.vue frontend/src/components/layout/AppLayout.vue frontend/src/style.css
```

## Development server status observed

A Docker Vite dev container was running:

```text
sub2api-frontend-dev   127.0.0.1:3000->3000/tcp
```

The container does have HMR and binds the local frontend directory:

```text
/home/ycyc/projects/sub2api/frontend -> /app/frontend
/app/frontend/node_modules is a Docker volume
/pnpm/store is a Docker volume
```

Vite logs showed HMR updates for the files above. However, because the user still sees no effect, verify the actual browser URL and computed DOM/CSS. It is possible they are viewing a route served by the backend embedded build on 8081, or that the code fix is simply ineffective.

Use port 3000 for visual smoke testing:

```bash
curl -fsS http://127.0.0.1:3000/ >/dev/null
curl -fsS http://127.0.0.1:3000/@vite/client | head
```

If using browser automation, open:

```text
http://127.0.0.1:3000/
```

For the backend embedded/static build, 8081 will not hot-reload frontend edits.

## Constraints

- Work locally in /home/ycyc/projects/sub2api.
- Frontend work is under frontend/.
- Use pnpm only. Do not use npm.
- Do not deploy to VPS.
- Keep public branding as arqel/Arqel where relevant.
- Before modifying code, inspect affected files and current diff.
- Keep final response concise: conclusion, changed points, verification results.

## Problem 1: empty-state alignment is still wrong

Likely files:

- frontend/src/components/common/DataTable.vue
- frontend/src/components/layout/TablePageLayout.vue
- concrete pages using DataTable, especially admin/user table pages with many columns and empty states.

Current attempted DataTable change:

- A `.table-empty-overlay` was added as an absolutely positioned child of `.table-wrapper`.
- The original `<td colspan>` empty state was replaced with an `sr-only` fallback.
- CSS currently looks roughly like:

```css
.table-empty-overlay {
  position: absolute;
  top: 3.5rem;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
  pointer-events: none;
}
```

Why this may still fail:

1. The visible empty-state overlay may not match the actual visible card area if nested wrappers (`TablePageLayout.vue` card/table-scroll-container, `.table-wrapper`, and table width) disagree about height/scrollport.
2. The overlay uses a hardcoded `top: 3.5rem`; header height may differ due `py-3`/`py-4`, responsive styling, or nested table containers, shifting perceived center vertically.
3. The overlay may not be centered relative to the full visible card if filters/pagination/table containers introduce extra fixed areas or if `.table-wrapper` does not fill the intended area on that route.
4. Pages with custom `#empty` slots may render `EmptyState` components with their own width/margins/padding that make the icon/text appear off-center even if the overlay wrapper is centered.
5. If the user is looking at a table not using `DataTable.vue` (for example `AvailableChannelsTable.vue` has its own `<td colspan>` empty state), this generic DataTable fix will not apply.

What to do:

- Identify the exact route/component shown in the screenshot/browser.
- Inspect DOM in browser, not just code.
- For the visible broken empty state, compare centers programmatically:

```js
const wrap = document.querySelector('.table-wrapper')?.getBoundingClientRect()
const card = document.querySelector('.table-scroll-container')?.getBoundingClientRect()
const empty = document.querySelector('.table-empty-overlay, [data-empty-state], .empty-state')?.getBoundingClientRect()
console.log({ wrap, card, empty, wrapCenter: wrap && wrap.left + wrap.width / 2, emptyCenter: empty && empty.left + empty.width / 2 })
```

- The acceptance criterion is: the visual center of the empty icon/text is aligned to the visible table/card scroll area, not to the full overflowed table width.
- If the current overlay approach is wrong, replace it with a route-safe implementation. Options:
  - Put the empty overlay at the `TablePageLayout` / `.table-scroll-container` level rather than inside the horizontally scrolling table.
  - Or pass a prop/slot state so `DataTable` can render a centered empty block outside the `<table>` but inside the visible card area.
  - Avoid centering inside `<td colspan>` of a `min-width: max-content` table.
- Preserve sticky header/columns and horizontal scrolling for non-empty tables.
- Check any non-DataTable empty states visible in the screenshot and fix those separately if needed.

## Problem 2: weird lighting/effects are still visible

Likely files to inspect:

- frontend/src/style.css
- frontend/src/components/layout/AppLayout.vue
- frontend/src/components/layout/AppHeader.vue
- frontend/src/components/layout/TablePageLayout.vue
- specific route component shown by screenshot

Hermes removed two obvious sources:

- `body` radial-gradient in `frontend/src/style.css`
- fixed `.app-shell-bg` decoration layer in `frontend/src/components/layout/AppLayout.vue`

But a code scan still found many functional/admin UI effects that can look like lighting/glass:

- `frontend/src/components/layout/AppHeader.vue`
  - `<header class="glass sticky ...">`
  - `.glass` in `style.css` uses `backdrop-blur-sm` and translucent background.
- `frontend/src/components/layout/TablePageLayout.vue`
  - `.table-scroll-container` uses `box-shadow: var(--arqel-shadow)`.
  - `thead` applies `backdrop-blur-sm` and transparent color-mix background.
- `frontend/src/style.css`
  - `--arqel-shadow` has visible shadow/ring in both light and dark themes.
  - `.glass`, `.glass-card`, `.card`, `.card-glass`, `.card-hover` apply shadows, blur, translucent backgrounds, transitions.
  - `.btn-primary` has a purple glow-like box-shadow.
- There may be route-specific gradients/shadows in admin pages such as UsersView/AccountsView/SettingsView/etc.

What the user wants here:

- Authenticated/admin dashboard/list pages should be restrained and flat.
- Remove unexplained ambient spotlight, glass, blur, decorative glow, and excessive shadows from functional admin/list UI.
- Public homepage can keep the established polished dark/purple direction; do not flatten the public homepage unless needed.

What to do:

- In browser, inspect the exact glowing/lighting elements from the screenshot with DevTools/computed styles.
- Remove or neutralize only the admin/app-shell sources causing the effect.
- Strong candidates to change:
  - Replace `AppHeader` class `glass` with a plain opaque header background using `var(--arqel-panel)` / `var(--arqel-bg)` and no backdrop blur.
  - Remove `backdrop-blur-sm` and transparent background from `TablePageLayout.vue` table header; use opaque `var(--arqel-panel-muted)` or `var(--arqel-panel)`.
  - Reduce admin/list `.card`/`.table-scroll-container` shadows to none or a very subtle 1px border only.
  - Avoid global changes that damage the homepage/auth pages unless the selector is clearly dashboard/admin-specific.
- Acceptance criterion: on the complained admin/list route, computed styles should show no `radial-gradient`, no `backdrop-filter`, no `filter: blur`, and no glow-like colored/large box shadows on the shell/header/table card.

Useful scan commands:

```bash
cd /home/ycyc/projects/sub2api
python - <<'PY'
import pathlib
root = pathlib.Path('frontend/src')
needles = ['radial-gradient','app-shell-bg','backdrop-blur','backdrop-filter','blur','bg-gradient','shadow-lg','shadow-xl','shadow-2xl','drop-shadow','shadow-primary','shadow-black','--arqel-shadow','glass','card-glass']
for p in root.rglob('*'):
    if p.suffix not in ['.vue','.css','.ts','.html']:
        continue
    s = p.read_text(errors='ignore')
    hits = [n for n in needles if n in s]
    if hits:
        print(p, ', '.join(hits))
PY
```

## Verification required before final answer

From frontend/:

```bash
cd /home/ycyc/projects/sub2api/frontend
pnpm run typecheck
pnpm run lint:check
pnpm run build
```

Also do a browser smoke test on port 3000 if possible:

- Confirm Vite dev page is used, not backend embedded 8081.
- Open the route matching the screenshot.
- Verify empty-state center vs visible card/table wrapper with DOM rects.
- Verify computed styles for shell/header/table card contain no unwanted radial gradient, backdrop blur, or glow-like shadow.

Do not deploy.

## START PROMPT

You are OpenCode working in /home/ycyc/projects/sub2api, the user's fork (origin is sudoyc/sub2api). The frontend is in frontend/ and uses pnpm only; do not use npm. Do not deploy to VPS.

The user reports two unresolved visual bugs in the admin/dashboard table UI: (1) the empty-state alignment is still wrong, and (2) there is still weird lighting/effects. Hermes made a partial attempted fix in DataTable.vue, AppLayout.vue, and style.css, but the user says it did not work. Review the current code and diff critically; do not assume the attempted fix is correct.

Your tasks:

1. Inspect current git status/diff and the relevant files:
   - frontend/src/components/common/DataTable.vue
   - frontend/src/components/layout/TablePageLayout.vue
   - frontend/src/components/layout/AppLayout.vue
   - frontend/src/components/layout/AppHeader.vue
   - frontend/src/style.css
   - the concrete route/page component that reproduces the screenshot if you can identify it.

2. Fix the empty-state alignment so the visible icon/text is centered against the visible table/card scroll area, not the overflowed table width. Avoid `<td colspan>` centering in a min-width/max-content overflow table. If the current overlay approach is wrong, replace it. Preserve sticky headers/columns and horizontal scrolling.

3. Remove the weird lighting/effects from authenticated/admin dashboard/list pages. In particular, inspect and neutralize admin/app-shell sources such as AppHeader `.glass`, TablePageLayout `backdrop-blur-sm`, translucent table headers, large/glow shadows, radial gradients, fixed decoration layers, and route-specific decorative effects. Keep the public homepage design intact unless a selector explicitly affects the admin shell too.

4. Verify with browser/DOM if possible on http://127.0.0.1:3000/:
   - Compare bounding rect center of the empty-state visual element with `.table-wrapper` or `.table-scroll-container` visible rect center.
   - Check computed styles on shell/header/table card: no radial-gradient, no backdrop-filter/blur, and no glow-like large/colored shadows on the complained admin/list route.

5. Run:
   - cd frontend && pnpm run typecheck
   - cd frontend && pnpm run lint:check
   - cd frontend && pnpm run build

6. Final response should be concise and include: conclusion, changed files, verification results, and whether anything remains unverified. Do not commit/push/deploy unless explicitly asked.
