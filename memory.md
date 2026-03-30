# 会话记录 - UI/UX 重构

**日期**: 2026-03-30  
**会话 ID**: ses_2c0e65d86ffeHHhAAWkPTAzdRX  
**项目**: Watchlist (股票自选股管理 + K线图 MVP)

---

## 完成的工作

### 1. 完整的 UI/UX 重构

**CSS 架构创建:**
- `src/renderer/styles/tokens.css` - 设计令牌（颜色、字体、间距、阴影）
- `src/renderer/styles/components.css` - 组件样式（BEM 方法论）
- `src/renderer/styles/main.css` - 主样式表和响应式断点

**TradingView 风格主题:**
- 背景: `#131722` (深蓝黑)
- 面板: `#1e222d` (深灰)
- 买入/涨: `#00c853` (绿色)
- 卖出/跌: `#ff5252` (红色)
- 强调色: `#2962ff` (蓝色)

**布局改动:**
- 仪表盘布局：侧边栏 (240px) + 主内容区
- 双栏网格：股票列表 + K线图
- 响应式断点 (768px, 640px)

### 2. Bug 修复

| 问题 | 修复 |
|------|------|
| 分类重名 | 添加验证，toast 错误提示 |
| 重复的"全部分类"按钮 | 统一由 `renderSidebarCategories()` 渲染 |
| 分类无法删除 | 添加悬停显示的删除按钮 |
| 切换股票图表不刷新 | `setStock()` 销毁并重建 widget |
| 错误添加 NASDAQ: 前缀 | 检查代码是否包含 `:`，使用分类前缀 |
| 自动选择分类后焦点不对 | 聚焦到股票代码输入框 |

### 3. 新功能

**分类前缀支持:**
- Category 接口添加 `prefix` 字段
- 创建分类弹窗包含可选前缀输入
- `setStock()` 使用分类前缀（如果股票代码无交易所前缀）
- 支持格式：`AAPL`、`NASDAQ:AAPL`、`HK:0700`、`SSE:600519`

**分类删除按钮:**
- 侧边栏悬停时显示
- X 图标 + 悬停红色效果

---

## 修改的文件

| 文件 | 改动 |
|------|------|
| `src/renderer/index.html` | 完整重构：新布局 + JS 逻辑 |
| `src/renderer/styles/tokens.css` | 新的设计令牌 |
| `src/renderer/styles/components.css` | 新的组件样式 |
| `src/renderer/styles/main.css` | 新的主样式表 |
| `src/shared/types.ts` | Category 接口添加 `prefix` |
| `tests/e2e/app.spec.ts` | 更新选择器以适配新 UI |

---

## 提交历史

```
03bd0a7 docs: add session memory
e5692e1 feat: complete UI/UX redesign with TradingView-inspired theme
32a0a74 fix: modal input focus issue
13d0adb fix: use dialogs for input/confirm instead of prompt
71b63b2 fix: use ipcMain.handle and ipcRenderer.invoke for IPC communication
```

---

## 关键决策

1. **未迁移框架** - 保持 vanilla HTML/CSS/JS 以保持简单
2. **CSS @import 顺序** - 必须在 CSS 规则之前，或在 HTML 中使用 `<link>`
3. **侧边栏分类渲染** - JS 函数作为唯一数据源
4. **股票代码前缀** - 三层优先级：股票自带前缀 > 分类前缀 > 无前缀

---

## 测试

- E2E 测试：7/7 通过
- 重构后所有功能保持正常
