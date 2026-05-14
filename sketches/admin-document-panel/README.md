## Variant: admin document panel

### Design stance
把 admin/settings 变成类似文档/控制台设置页：白底、高对比、低装饰、强可读。

### Key choices
- Layout: sidebar + document sections。
- Typography: 更像设置文档，label/description 清晰。
- Color: 浅色平面，完全避开暗色光晕问题。
- Interaction: 保存按钮 alert，仅作草图反馈。

### Trade-offs
- Strong at: settings 页面最清楚，彻底摆脱“打光”。
- Weak at: 与现有深色 arqel admin 方向差异较大，落地需要主题分支。

### Best for
- /admin/settings 或需要长表单的管理页。
