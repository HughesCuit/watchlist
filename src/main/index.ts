import { app, BrowserWindow, ipcMain } from 'electron'
import store from 'electron-store'
import path from 'path'

const mainWindow = new BrowserWindow({
  width: 1200,
  height: 800,
  webPreferences: {
    preload: path.join(__dirname, '../preload/index.js'),
    nodeIntegration: false,
    contextIsolation: true,
  },
})

mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))

// IPC Handlers
ipcMain.handle('stock:getAll', () => {
  const stocks = store.get('stocks') || []
  return stocks
})

ipcMain.handle('stock:add', (_, stock: Partial<any>) => {
  const stocks = store.get('stocks') || []
  const newStock: any = {
    id: crypto.randomUUID(),
    code: stock.code,
    name: stock.name,
    categoryId: null,
    addedAt: Date.now(),
    sortOrder: stocks.length,
  }
  stocks.push(newStock)
  store.set('stocks', stocks)
  return newStock
})

ipcMain.handle('stock:remove', (_, id: string) => {
  const stocks = store.get('stocks') || []
  const filtered = stocks.filter((s: any) => s.id !== id)
  store.set('stocks', filtered)
})

ipcMain.handle('category:getAll', () => {
  const categories = store.get('categories') || []
  return categories
})

ipcMain.handle('category:add', (_, category: Partial<any>) => {
  const categories = store.get('categories') || []
  const newCategory: any = {
    id: crypto.randomUUID(),
    name: category.name,
    createdAt: Date.now(),
  }
  categories.push(newCategory)
  store.set('categories', categories)
  return newCategory
})

ipcMain.handle('category:remove', (_, id: string) => {
  const categories = store.get('categories') || []
  const filtered = categories.filter((c: any) => c.id !== id)
  store.set('categories', filtered)
})

ipcMain.handle('preference:get', () => {
  return store.get('preferences') || { sortBy: 'addedAt', selectedStockId: null }
})

ipcMain.handle('preference:set', (_, prefs: Partial<any>) => {
  const prefs = store.get('preferences') || { sortBy: 'addedAt', selectedStockId: null }
  Object.assign(prefs, prefs)
  store.set('preferences', prefs)
})

app.whenReady().then(() => {
  mainWindow.show()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})