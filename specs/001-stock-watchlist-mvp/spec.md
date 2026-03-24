# Feature Specification: 投资自选股管理 + K线图展示 MVP

**Feature Branch**: `001-stock-watchlist-mvp`  
**Created**: 2026-03-24  
**Status**: Draft  
**Input**: User description: "投资自选股管理 + K线图展示 MVP"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 添加和管理自选股 (Priority: P1)

作为个人投资者，我需要能够添加股票到我的自选列表中，以便追踪我关注的投资标的。

**Why this priority**: 自选股管理是本应用的核心功能，没有自选股就无法使用其他功能

**Independent Test**: 可以通过添加一只股票到自选列表并验证其出现在列表中来独立测试

**Acceptance Scenarios**:

1. **Given** 用户首次使用应用, **When** 用户添加一只股票 (如 AAPL), **Then** 该股票出现在自选列表中
2. **Given** 自选列表已有股票, **When** 用户删除其中一只股票, **Then** 该股票从列表中消失
3. **Given** 自选列表有多只股票, **When** 用户查看自选列表, **Then** 所有添加的股票都按添加时间顺序显示

---

### User Story 2 - 自选股分类管理 (Priority: P2)

作为投资者，我需要对自选股进行分类，以便按类别管理我的投资标的。

**Why this priority**: 分类功能帮助用户组织大量自选股，提升使用体验

**Independent Test**: 可以通过创建分类、将股票分配到分类中来独立测试

**Acceptance Scenarios**:

1. **Given** 用户有自选股, **When** 用户创建分类 (如 "科技股"), **Then** 新分类出现在分类列表中
2. **Given** 用户有分类和自选股, **When** 用户将股票归入分类, **Then** 股票可以按分类筛选显示

---

### User Story 3 - 自选股排序 (Priority: P2)

作为投资者，我需要能够对自选股进行排序，以便快速找到我想查看的股票。

**Why this priority**: 排序功能提升用户查找效率，特别是在自选股较多时

**Independent Test**: 可以通过添加多只股票并切换排序方式来独立测试

**Acceptance Scenarios**:

1. **Given** 自选列表有多只股票, **When** 用户按添加时间排序, **Then** 股票按添加时间倒序显示
2. **Given** 自选列表有多只股票, **When** 用户按股票代码排序, **Then** 股票按代码字母顺序显示

---

### User Story 4 - K线图展示 (Priority: P1)

作为投资者，我需要查看自选股的K线图，以便分析股票走势。

**Why this priority**: K线图是投资者最常用的技术分析工具，是MVP的核心功能

**Independent Test**: 可以通过选择一只股票并验证K线图正确加载来独立测试

**Acceptance Scenarios**:

1. **Given** 用户在自选列表中, **When** 用户点击选择一只股票, **Then** 页面显示该股票的K线图
2. **Given** K线图已显示, **When** 用户切换到另一只股票, **Then** K线图更新显示新股票的行情
3. **Given** K线图已显示, **When** 用户调整时间周期 (日线/周线/月线), **Then** K线图更新为对应时间周期

---

### User Story 5 - 本地数据持久化 (Priority: P1)

作为用户，我需要我的数据保存在本地，以便下次打开应用时能继续使用。

**Why this priority**: 数据持久化是应用可用性的基础，用户不希望每次重新添加股票

**Independent Test**: 可以通过添加股票、关闭应用、重新打开应用来独立测试

**Acceptance Scenarios**:

1. **Given** 用户已添加自选股, **When** 用户关闭并重新打开应用, **Then** 所有自选股数据保留
2. **Given** 用户已创建分类, **When** 用户关闭并重新打开应用, **Then** 所有分类数据保留

---

### Edge Cases

- 当用户添加一个不存在的股票代码时，系统应提示"股票代码不存在"
- 当网络断开时，K线图应显示缓存数据或提示"网络不可用"
- 当自选股数量达到100只时，系统应支持分页或虚拟滚动
- 当用户尝试删除正在查看的股票的K线图时，应先清除K线图再删除

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统 MUST 支持用户添加股票到自选列表
- **FR-002**: 系统 MUST 支持用户从自选列表删除股票
- **FR-003**: 系统 MUST 支持用户查看自选列表
- **FR-004**: 系统 MUST 支持用户创建股票分类
- **FR-005**: 系统 MUST 支持用户将股票归入分类
- **FR-006**: 系统 MUST 支持用户按添加时间排序自选股
- **FR-007**: 系统 MUST 支持用户按股票代码排序自选股
- **FR-008**: 系统 MUST 在用户选择股票时显示K线图
- **FR-009**: 系统 MUST 支持用户切换K线图时间周期 (日线/周线/月线)
- **FR-010**: 系统 MUST 在本地保存自选股数据
- **FR-011**: 系统 MUST 在本地保存分类数据
- **FR-012**: 系统 MUST 在应用启动时加载本地保存的数据

### Key Entities

- **自选股 (Stock)**: 代表用户关注的股票，包含股票代码、名称、添加时间、所属分类
- **分类 (Category)**: 用于组织自选股的分组，包含分类名称、创建时间
- **用户偏好 (UserPreference)**: 存储用户的排序方式等设置

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 用户能在30秒内完成添加股票到自选列表的操作
- **SC-002**: 应用启动后2秒内显示上次保存的自选列表
- **SC-003**: 用户点击股票后1秒内显示K线图
- **SC-004**: 100%保存的数据在应用重启后正确恢复
- **SC-005**: 用户能在应用内完成自选股添加、删除、分类、排序、K线图查看的完整流程
