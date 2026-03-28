const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron
const path = require('path')

function createWindow() {
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
}

const store = {}
const preferences = { sortBy: 'addedAt', selectedStockId: null }

ipcMain.on('stock:getAll', () => {
  return store.stocks || []
})

ipcMain.on('stock:add', (event, stock) => {
  const stocks = store.stocks || []
  const newStock = {
    id: crypto.randomUUID(),
    code: stock.code,
    name: stock.name,
    categoryId: null,
    addedAt: Date.now(),
    sortOrder: stocks.length,
  }
  stocks.push(newStock)
  store.stocks = stocks
  return newStock
})

ipcMain.on('stock:remove', (event, id) => {
  const stocks = store.stocks || []
  const result = stocks.filter((s) => s.id !== id)
  store.stocks = result
})

ipcMain.on('category:getAll', () => {
  return store.categories || []
})

ipcMain.on('category:add', (event, category) => {
  const categories = store.categories || []
  const newCategory = {
    id: crypto.randomUUID(),
    name: category.name,
    createdAt: Date.now(),
  }
  categories.push(newCategory)
  store.categories = categories
  return newCategory
})

ipcMain.on('category:remove', (event, id) => {
  const categories = store.categories || []
  const result = categories.filter((c) => c.id !== id)
  store.categories = result
})

ipcMain.on('preference:get', () => {
  return preferences
})

ipcMain.on('preference:set', (event, prefs) => {
  Object.assign(preferences, prefs)
})

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})