## Variant: admin command table

### Design stance
把 /admin/proxies 当成高频操作台：搜索/批处理永远在顶部，右侧保留状态摘要。

### Key choices
- Layout: 窄 rail + command bar + table + 右侧 summary。
- Typography: 更紧凑，适合大量数据。
- Color: 平面深色，但比 quiet 更有“产品工具”感。
- Interaction: tab 切换状态。

### Trade-offs
- Strong at: proxies 页面效率高，操作按钮一致。
- Weak at: settings 页面需要另做表单布局，不能全站照搬。

### Best for
- /admin/proxies、/admin/accounts 这类批处理表格页。
