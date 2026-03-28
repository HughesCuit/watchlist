const { contextBridge, ipcRenderer } = require('electron')

const electronAPI = {
  stocks: {
    getAll: () => ipcRenderer.invoke('stock:getAll'),
    add: (stock) => ipcRenderer.invoke('stock:add', stock),
    remove: (id) => ipcRenderer.invoke('stock:remove', id),
  },
  categories: {
    getAll: () => ipcRenderer.invoke('category:getAll'),
    add: (category) => ipcRenderer.invoke('category:add', category),
    remove: (id) => ipcRenderer.invoke('category:remove', id),
  },
  preferences: {
    get: () => ipcRenderer.invoke('preference:get'),
    set: (prefs) => ipcRenderer.invoke('preference:set', prefs),
  },
  showInput: (title, defaultValue) => ipcRenderer.invoke('showInput', title, defaultValue),
  showConfirm: (message) => ipcRenderer.invoke('showConfirm', message),
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)

// Expose dialogs module for input/confirm dialogs
contextBridge.exposeInMainWorld('dialogs', window.dialogs)