<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0 (project-specific requirements added)
- Modified sections: Added 项目概况, MVP需求, 技术栈
- Templates requiring updates: ✅ .specify/templates/plan-template.md (aligned)
- Templates requiring updates: ✅ .specify/templates/spec-template.md (aligned)
-->

# Watchlist Constitution

## Core Principles

### I. 测试驱动开发 (Test-First Development)
所有功能实现前必须先编写测试；测试必须失败后再实现功能；严格遵循红-绿-重构循环。

**理由**: 确保代码可测试性，防止功能退化，通过测试文档化预期行为。

### II. 独立用户故事 (Independent User Stories)
每个用户故事必须可独立实现、测试、部署和演示；P1 故事构成 MVP 必须可独立运行。

**理由**: 允许增量交付，降低集成风险，提高迭代速度。

### III. 阶段性开发 (Phase-Based Development)
必须按顺序执行：Setup(设置) → Foundational(基础) → User Stories(用户故事) → Polish(完善)。

**理由**: 基础阶段阻塞所有用户故事，确保依赖关系清晰，避免返工。

### IV. 宪法合规性检查 (Constitution Compliance)
所有 PR 和代码审查必须验证是否符合宪法原则；复杂度超标必须提供充分理由。

**理由**: 保持项目一致性，防止技术债务累积，确保设计决策经过审慎考虑。

### V. 语义化版本控制 (Semantic Versioning)
版本号格式：MAJOR.MINOR.PATCH；MAJOR：不兼容的 API 变更；MINOR：向后兼容的新功能；PATCH：向后兼容的缺陷修复。

**理由**: 明确传达变更影响，帮助用户和开发者理解升级风险。

## 项目概况

- **项目名称**: Watchlist (投资监控工具)
- **核心用途**: 股票自选股管理与K线图展示
- **目标用户**: 个人投资者
- **当前阶段**: 概念阶段

## MVP 需求

1. **自选股管理**: 支持添加、删除、排序、分类自选股
2. **K线图展示**: 集成 TradingView Widget 显示K线图
3. **数据存储**: 本地存储，支持离线使用

## 技术栈

- **框架**: Electron (支持 mac/win)
- **数据存储**: 本地文件系统 (JSON/SQLite)
- **K线图**: TradingView Widget
- **测试**: Vitest + Playwright

## 技术标准

- **语言/框架**: 根据具体功能规范确定
- **测试要求**: 单元测试、契约测试、集成测试三分法
- **文档要求**: 每个功能必须包含 spec.md、research.md、data-model.md、quickstart.md
- **路径约定**: 单项目 `src/`、`tests/`；多项目 `backend/`、`frontend/` 分开

## 开发工作流

- **特性开发**: 用户描述 → 编写 spec.md → 创建 plan.md → 实现 → 测试 → 文档
- **任务组织**: 按用户故事分组任务，每个故事独立可交付
- **质量门禁**: Constitution Check 必须通过才能进入研究阶段
- **检查点**: 每个阶段完成后必须验证才能进入下一阶段

## Governance

- **宪法优先**: 本宪法优先于所有其他开发实践
- **修订程序**: 修订需记录变更内容、理由、迁移计划
- **版本策略**: MAJOR：原则移除或重新定义；MINOR：新增原则或实质性扩展；PATCH：澄清、措辞修正
- **合规审查**: 所有 PR 必须验证宪法合规性

**Version**: 1.1.0 | **Ratified**: 2026-03-24 | **Last Amended**: 2026-03-24
