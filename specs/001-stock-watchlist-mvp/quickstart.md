# Quickstart: 投资自选股管理 + K线图展示 MVP

## 环境准备

1. **安装 Node.js** (v18+)
2. **安装依赖**: `npm install`
3. **启动开发**: `npm run dev`
4. **构建生产**: `npm run build`

## 项目命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动 Electron 开发模式 (热重载) |
| `npm run build` | 构建 mac/win 安装包 |
| `npm run test` | 运行单元测试 |
| `npm run test:e2e` | 运行 E2E 测试 |

## 用户流程

### 1. 添加自选股
1. 点击 "+" 按钮
2. 输入股票代码 (如 AAPL)
3. 股票添加到列表

### 2. 查看K线图
1. 点击列表中的股票
2. 右侧显示 TradingView K线图

### 3. 分类管理
1. 点击 "分类" 标签
2. 创建新分类
3. 将股票拖入分类

### 4. 排序切换
1. 点击排序图标
2. 切换 "添加时间" / "股票代码"

## 目录结构

```
src/
├── main/          # Electron 主进程
├── renderer/     # UI 代码
├── preload/      # 预加载脚本
└── shared/       # 共享类型

tests/
├── unit/         # 单元测试 (Vitest)
└── e2e/          # E2E 测试 (Playwright)
```
