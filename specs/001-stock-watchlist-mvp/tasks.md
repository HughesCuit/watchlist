# Tasks: 投资自选股管理 + K线图展示 MVP

**Feature**: 001-stock-watchlist-mvp  
**Generated**: 2026-03-24  
**Plan**: [plan.md](./plan.md)  
**Spec**: [spec.md](./spec.md)

## Implementation Strategy

**MVP Scope**: User Story 1 (添加和管理自选股) + User Story 4 (K线图展示) + User Story 5 (本地数据持久化)  
**Delivery Order**: Phase 1 → Phase 2 → Phase 3 → Phase 4 → Polish → Then extend with US2, US3

---

## Phase 1: Setup (Project Initialization)

- [ ] T001 Initialize Electron project with TypeScript in src/main/index.ts
- [ ] T002 [P] Create package.json with dependencies: electron, electron-builder, electron-store, vitest in package.json
- [ ] T003 [P] Configure TypeScript (tsconfig.json) and build tools in tsconfig.json
- [ ] T004 Create project directory structure: src/main, src/renderer, src/preload, src/shared, tests/unit, tests/e2e in src/main, src/renderer, src/preload, src/shared, tests/unit, tests/e2e

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 Create shared TypeScript types in src/shared/types.ts
- [ ] T006 Implement electron-store wrapper in src/main/store.ts
- [ ] T007 Create preload script with IPC bridge in src/preload/index.ts
- [ ] T008 Set up Electron main process entry in src/main/index.ts
- [ ] T009 Create renderer entry HTML and TypeScript in src/renderer/index.html and src/renderer/index.ts
- [ ] T010 Configure logging and error handling in src/main/index.ts

---

## Phase 3: US1 - 添加和管理自选股 (P1)

**Goal**: 用户可以添加、删除、查看自选股

**Independent Test**: 添加一只股票到自选列表，验证其出现在列表中

### Implementation

- [ ] T011 [P] [US1] Define Stock type and validation in src/shared/types.ts
- [ ] T012 [P] [US1] Implement stock service with CRUD methods in src/renderer/services/stockService.ts
- [ ] T013 [US1] Register IPC handlers for stock operations in src/main/index.ts
- [ ] T014 [US1] Build StockList UI component in src/renderer/components/StockList.ts
- [ ] T015 [US1] Build StockItem UI component in src/renderer/components/StockItem.ts
- [ ] T016 [US1] Connect UI to stock service in src/renderer/index.ts

### Tests

- [ ] T017 [P] [US1] Write unit tests for stockService in tests/unit/stockService.test.ts
- [ ] T018 [US1] Write E2E test for adding stock in tests/e2e/stock.test.ts

---

## Phase 4: US4 - K线图展示 (P1)

**Goal**: 用户点击股票后显示TradingView K线图

**Independent Test**: 选择股票后验证K线图正确加载

### Implementation

- [ ] T019 [P] [US4] Integrate TradingView Widget in src/renderer/components/KLineChart.ts
- [ ] T020 [US4] Add stock selection handler in src/renderer/index.ts
- [ ] T021 [US4] Implement time period switching (日线/周线/月线) in src/renderer/components/KLineChart.ts

### Tests

- [ ] T022 [P] [US4] Write E2E test for K-line display in tests/e2e/kline.test.ts

---

## Phase 5: US5 - 本地数据持久化 (P1)

**Goal**: 应用重启后数据保留

**Independent Test**: 添加股票后重启应用，数据仍然存在

### Implementation

- [ ] T023 [P] [US5] Configure electron-store for persistence in src/main/store.ts
- [ ] T024 [US5] Add auto-save on data changes in src/renderer/services/stockService.ts
- [ ] T025 [US5] Implement data loading on app startup in src/main/index.ts

### Tests

- [ ] T026 [US5] Write E2E test for data persistence in tests/e2e/persistence.test.ts

---

## Phase 6: US2 - 自选股分类管理 (P2)

**Goal**: 用户可以创建分类并将股票归入分类

**Independent Test**: 创建分类，将股票归入，验证按分类筛选显示

### Implementation

- [ ] T027 [P] [US2] Define Category type in src/shared/types.ts
- [ ] T028 [P] [US2] Implement category service in src/renderer/services/categoryService.ts
- [ ] T029 [US2] Register IPC handlers for category operations in src/main/index.ts
- [ ] T030 [US2] Build CategoryList UI component in src/renderer/components/CategoryList.ts
- [ ] T031 [US2] Add category filter to StockList in src/renderer/components/StockList.ts

### Tests

- [ ] T032 [P] [US2] Write unit tests for categoryService in tests/unit/categoryService.test.ts

---

## Phase 7: US3 - 自选股排序 (P2)

**Goal**: 用户可以按添加时间或股票代码排序

**Independent Test**: 添加多只股票，切换排序方式，验证显示顺序

### Implementation

- [ ] T033 [P] [US3] Define UserPreference type in src/shared/types.ts
- [ ] T034 [US3] Implement sort toggle in UI in src/renderer/components/StockList.ts
- [ ] T035 [US3] Persist sort preference in electron-store in src/main/store.ts

---

## Phase 8: Polish & Cross-Cutting

- [ ] T036 Add app icon and metadata in package.json
- [ ] T037 Configure electron-builder for mac/win build in package.json
- [ ] T038 Optimize startup performance (< 3 seconds)
- [ ] T039 Add error handling for invalid stock codes in src/renderer/services/stockService.ts
- [ ] T040 Build production executable in dist/

---

## Dependency Graph

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) ← Blocking for all User Stories
    ↓
Phase 3 (US1) → Phase 4 (US4)  [US4 depends on US1]
    ↓
Phase 5 (US5)  [Foundation for data]
    ↓
Phase 6 (US2)  [Independent]
    ↓
Phase 7 (US3)  [Independent]
    ↓
Phase 8 (Polish)
```

---

## Parallel Execution Opportunities

| Tasks | Reason |
|-------|--------|
| T002 + T003 | Package config and tsconfig can be created in parallel |
| T011 + T012 + T019 | Stock service, types, and KLineChart component are independent |
| T027 + T028 + T033 | Category service, types, and preference types can be parallelized |
| T017 + T022 + T026 + T032 | All E2E tests can run in parallel |

---

## Summary

| Metric | Count |
|--------|-------|
| Total Tasks | 40 |
| Setup | 4 |
| Foundational | 6 |
| US1 (添加和管理自选股) | 8 |
| US4 (K线图展示) | 4 |
| US5 (本地数据持久化) | 4 |
| US2 (分类管理) | 6 |
| US3 (排序) | 3 |
| Polish | 5 |
| Parallelizable Tasks | 10 |
