import { ipcRenderer } from 'electron'

const stockService = {
  getAll: async () => {
    const stocks = await window.electronAPI.stocks.getAll()
    return stocks
  },

  add: async (stock: Partial<any>) => {
    const newStock = await window.electronAPI.stocks.add(stock)
    return newStock
  },

  remove: async (id: string) => {
    await window.electronAPI.stocks.remove(id)
  },

  update: async (stock: Partial<any>) => {
    // 先删除再添加
    const stockList = await stockService.getAll()
    const existingStock = stockList.find((s: any) => s.id === stock.id)
    if (existingStock) {
      await stockService.remove(stock.id)
      return stockService.add(stock)
    }
    return null
  },
}

export default stockService