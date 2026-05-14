## Variant: admin flat quiet

### Design stance
最克制的深色后台：只用边框、层级和留白，不用光晕、渐变、blur 或重阴影。

### Key choices
- Layout: 传统 sidebar + topbar + content。
- Typography: 小字号、清晰层级，偏工具型。
- Color: 近黑面板 + 单一紫色主按钮。
- Interaction: 按钮点击短暂 focus ring。

### Trade-offs
- Strong at: 干净、可读、很容易落到当前 Vue/Tailwind 代码。
- Weak at: 视觉记忆点少，不够“高级”。

### Best for
- admin/settings、admin/proxies 这种功能优先页面。
