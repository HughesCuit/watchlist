export interface Stock {
  id: string
  code: string
  name?: string
  categoryId?: string | null
  addedAt: number
  sortOrder: number
}

export interface Category {
  id: string
  name: string
  createdAt: number
}

export interface UserPreference {
  sortBy: 'addedAt' | 'code'
  selectedStockId?: string | null
}

export interface AppState {
  stocks: Stock[]
  categories: Category[]
  preferences: UserPreference
}

export interface StockData {
  code: string
  name?: string
}

export interface CategoryData {
  name: string
}