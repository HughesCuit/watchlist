import Store from 'electron-store'

const store = new Store({
  name: 'watchlist-store',
  cwd: true,
})

export const getStocks = () => store.get('stocks') as Stock[]
export const setStocks = (stocks: Stock[]) => store.set('stocks', stocks)

export const getCategories = () => store.get('categories') as Category[]
export const setCategories = (categories: Category[]) => store.set('categories', categories)

export const getPreferences = () => store.get('preferences') as UserPreference
export const setPreferences = (prefs: UserPreference) => store.set('preferences', prefs)

export const resetStore = () => {
  store.clear()
  store.set('stocks', [])
  store.set('categories', [])
  store.set('preferences', { sortBy: 'addedAt', selectedStockId: null })
}