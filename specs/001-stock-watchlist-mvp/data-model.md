# Data Model: 投资自选股管理 + K线图展示 MVP

## Entities

### Stock (自选股)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string (UUID) | 是 | 唯一标识 |
| code | string | 是 | 股票代码 (如 AAPL) |
| name | string | 否 | 股票名称 (可选) |
| categoryId | string | 否 | 所属分类ID |
| addedAt | number (timestamp) | 是 | 添加时间 |
| sortOrder | number | 是 | 排序顺序 |

**Validation**:
- code: 非空，最大 10 字符
- name: 最大 50 字符
- categoryId: 必须是已存在的分类ID或 null

---

### Category (分类)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string (UUID) | 是 | 唯一标识 |
| name | string | 是 | 分类名称 |
| createdAt | number (timestamp) | 是 | 创建时间 |

**Validation**:
- name: 非空，最大 30 字符，不能重复

---

### UserPreference (用户偏好)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| sortBy | "addedAt" \| "code" | 是 | 排序方式 |
| selectedStockId | string | 否 | 当前查看的股票ID |

**Validation**:
- sortBy: 枚举值之一

---

## Data Store Schema (electron-store)

```json
{
  "stocks": [
    {
      "id": "uuid",
      "code": "AAPL",
      "name": "Apple Inc.",
      "categoryId": "uuid or null",
      "addedAt": 1234567890,
      "sortOrder": 0
    }
  ],
  "categories": [
    {
      "id": "uuid",
      "name": "科技股",
      "createdAt": 1234567890
    }
  ],
  "preferences": {
    "sortBy": "addedAt",
    "selectedStockId": null
  }
}
```

## State Transitions

### Stock Lifecycle

```
[不存在] --添加--> [自选列表中] --删除--> [不存在]
                     |
                     +--归入分类--> [有分类]
                     +--移除分类--> [无分类]
```

### Category Lifecycle

```
[不存在] --创建--> [分类列表中] --删除--> [不存在]
                                    (若分类下有股票，解除关联)
```

## API Contract (IPC)

由于是桌面应用，通过 Electron IPC 通信：

| Channel | Direction | Payload | Response |
|---------|-----------|---------|----------|
| stock:getAll | renderer→main | - | Stock[] |
| stock:add | renderer→main | {code, name?} | Stock |
| stock:remove | renderer→main | {id} | void |
| stock:update | renderer→main | Partial<Stock> | Stock |
| category:getAll | renderer→main | - | Category[] |
| category:add | renderer→main | {name} | Category |
| category:remove | renderer→main | {id} | void |
| preference:get | renderer→main | - | UserPreference |
| preference:set | renderer→main | Partial<UserPreference> | void |
