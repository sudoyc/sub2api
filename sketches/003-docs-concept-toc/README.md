## Variant: Concept TOC

### Design stance
右侧做首屏概念目录，整体更克制、更文档站。

### Key choices
- 基于用户喜欢的 Product Split：左侧 hero 继续保留。
- 移除 terminal，避免命令行装饰和文档关系不强。
- 下方卡片加入 reveal 上浮动画，并保留 hover 上浮反馈。
- 沿用 arqel dark/purple、细边框、克制卡片深度。

### Trade-offs
- Strong at: 比上一版更像文档首页，且不破坏主站视觉连续性。
- Weak at: 仍是 throwaway HTML，需要选定后再落到实际 docs/VitePress 结构。

### Best for
- 选择 docs 首页的首屏结构和信息组织方式。
