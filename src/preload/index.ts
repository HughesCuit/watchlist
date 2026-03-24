import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  stocks: {
    getAll: () => ipcRenderer.invoke('stock:getAll'),
    add: (stock: Partial<any>) => ipcRenderer.invoke('stock:add', stock),
    remove: (id: string) => ipcRenderer.invoke('stock:remove', id),
  },
  categories: {
    getAll: () => ipcRenderer.invoke('category:getAll'),
    add: (category: Partial<any>) => ipcRenderer.invoke('category:add', category),
    remove: (id: string) => ipcRenderer.invoke('category:remove', id),
  },
  preferences: {
    get: () => ipcRenderer.invoke('preference:get'),
    set: (prefs: Partial<any>) => ipcRenderer.invoke('preference:set', prefs),
  },
})