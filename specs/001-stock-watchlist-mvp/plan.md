# Implementation Plan: 投资自选股管理 + K线图展示 MVP

**Branch**: `001-stock-watchlist-mvp` | **Date**: 2026-03-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-stock-watchlist-mvp/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

构建一个 Electron 桌面应用，支持用户管理自选股票列表并通过 TradingView Widget 查看K线图。MVP 包含：自选股 CRUD、分类管理、排序、本地数据持久化。

## Technical Context

**Language/Version**: TypeScript 5.x + Electron 28+  
**Primary Dependencies**: electron, electron-builder, tradingview-widget, electron-store (本地存储)  
**Storage**: Local JSON file via electron-store  
**Testing**: Vitest (unit) + Playwright (E2E)  
**Target Platform**: macOS 12+, Windows 10+  
**Project Type**: desktop-app  
**Performance Goals**: 启动时间 < 3秒，K线图加载 < 1秒  
**Constraints**: 离线可用，本地数据存储  
**Scale/Scope**: 单用户，本地数据，< 1000 自选股

## Constitution Check

| 检查项 | 状态 |
|--------|------|
| 测试驱动开发 (TDD) | ✅ 需在实现阶段遵循 |
| 独立用户故事 | ✅ 5个用户故事可独立测试 |
| 阶段性开发 | ✅ 遵循 Setup → Foundational → User Stories → Polish |
| 宪法合规性检查 | ✅ PR 需验证 |
| 语义化版本控制 | ✅ 遵循 MAJOR.MINOR.PATCH |

**Gate**: PASS - 无需额外复杂度跟踪

## Project Structure

### Documentation (this feature)

```
specs/001-stock-watchlist-mvp/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for desktop app)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```
src/
├── main/                # Electron main process
│   ├── index.ts         # Main entry
│   └── store.ts         # Local storage (electron-store)
├── renderer/            # Electron renderer process
│   ├── index.html       # Entry HTML
│   ├── index.ts         # Renderer entry
│   ├── components/      # UI components
│   │   ├── StockList.ts
│   │   ├── StockItem.ts
│   │   ├── CategoryList.ts
│   │   └── KLineChart.ts
│   ├── services/        # Business logic
│   │   ├── stockService.ts
│   │   └── categoryService.ts
│   └── styles/          # CSS
│       └── main.css
├── preload/             # Preload script for IPC
│   └── index.ts
└── shared/              # Shared types
    └── types.ts

tests/
├── unit/                # Vitest unit tests
└── e2e/                 # Playwright E2E tests
```

**Structure Decision**: 单项目结构，使用 Electron main/renderer 模式。数据存储使用 electron-store (JSON)，K线图通过 TradingView Widget iframe 嵌入。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A - 无复杂度违规
