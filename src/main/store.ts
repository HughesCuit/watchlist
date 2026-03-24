import Store from 'electron-store'

const store = new Store({
  name: 'watchlist-store',
})

export const getStocks = () => store.get('stocks')
export const setStocks = (stocks: any[]) => store.set('stocks', stocks)

export const getCategories = () => store.get('categories')
export const setCategories = (categories: any[]) => store.set('categories', categories)

export const getPreferences = () => store.get('preferences')
export const setPreferences = (prefs: any) => store.set('preferences', prefs)

export const resetStore = () => {
  store.clear()
  store.set('stocks', [])
  store.set('categories', [])
  store.set('preferences', { sortBy: 'addedAt', selectedStockId: null })
}