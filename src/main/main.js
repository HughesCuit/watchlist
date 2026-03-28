const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const store = {}
const preferences = { sortBy: 'addedAt', selectedStockId: null }

// Register IPC handlers
ipcMain.handle('stock:getAll', () => {
  return store.stocks || []
})

ipcMain.handle('stock:add', (event, stock) => {
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

ipcMain.handle('stock:remove', (event, id) => {
  const stocks = store.stocks || []
  const result = stocks.filter((s) => s.id !== id)
  store.stocks = result
})

ipcMain.handle('category:getAll', () => {
  return store.categories || []
})

ipcMain.handle('category:add', (event, category) => {
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

ipcMain.handle('category:remove', (event, id) => {
  const categories = store.categories || []
  const result = categories.filter((c) => c.id !== id)
  store.categories = result
})

ipcMain.handle('preference:get', () => {
  return preferences
})

ipcMain.handle('preference:set', (event, prefs) => {
  Object.assign(preferences, prefs)
})

// IPC handlers for input dialogs
ipcMain.handle('showInput', async (event, title, defaultValue) => {
  const result = await new Promise((resolve) => {
    const input = new window.dialogs.Input({
      title: title || '输入',
      type: 'input',
      value: defaultValue,
      default: defaultValue,
      callback: (input) => {
        resolve(input)
      },
    })
    input.show()
  })
  return result
})

ipcMain.handle('showConfirm', async (event, message) => {
  const result = await new Promise((resolve) => {
    const dialog = new window.dialogs.Confirm({
      type: 'question',
      message: message,
      default: true,
      callback: (confirmed) => {
        resolve(confirmed)
      },
    })
    dialog.show()
  })
  return result
})

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
  webPreferences: {
    preload: path.join(__dirname, '../preload/index.js'),
    nodeIntegration: true,
    contextIsolation: false,
  },
  })

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
}

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