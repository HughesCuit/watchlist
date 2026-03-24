# Research: 投资自选股管理 + K线图展示 MVP

## 技术选型决策

### 1. Electron 框架

**Decision**: 使用 Electron 构建桌面应用

**Rationale**: 
- Constitution 明确规定使用 Electron
- 支持 mac/win 双平台
- 有成熟的 TypeScript 生态

**Alternatives considered**:
- Tauri: Rust 后端，学习曲线较高
- NW.js: 维护不活跃

---

### 2. 本地存储方案

**Decision**: electron-store (JSON 文件存储)

**Rationale**:
- 轻量级，无需额外依赖
- 自动持久化，数据加密可选
- 适合单用户本地应用

**Alternatives considered**:
- SQLite: 过度设计，MVP 不需要复杂查询
- IndexedDB: 浏览器端存储，不如 electron-store 方便

---

### 3. K线图集成

**Decision**: TradingView Widget (iframe 嵌入)

**Rationale**:
- Constitution 明确指定
- 无需 API key，直接可用
- 功能完整 (日线/周线/月线)

**Alternatives considered**:
- Lightweight Charts: 需要自行获取数据源
- Highcharts: 需 license

---

### 4. 测试框架

**Decision**: Vitest + Playwright

**Rationale**: 
- Constitution 明确规定
- Vitest: 快速，兼容 Jest API
- Playwright: 桌面应用 E2E 测试成熟方案

---

## 实施要点

1. **Electron 安全**: 使用 contextBridge 隔离 renderer，禁用 nodeIntegration
2. **数据备份**: electron-store 自动备份，异常时可恢复
3. **TradingView Widget 配置**: 使用 symbol 属性动态切换股票
