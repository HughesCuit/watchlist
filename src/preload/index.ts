import { contextBridge, ipcRenderer } from 'electron'
import { Stock, Category, UserPreference } from '../shared/types'

contextBridge.exposeInMainWorld('electronAPI', {
  stocks: {
    getAll: () => ipcRenderer.invoke('stock:getAll'),
    add: (stock: Partial<Stock>) => ipcRenderer.invoke('stock:add', stock),
    remove: (id: string) => ipcRenderer.invoke('stock:remove', id),
  },
  categories: {
    getAll: () => ipcRenderer.invoke('category:getAll'),
    add: (category: Partial<Category>) => ipcRenderer.invoke('category:add', category),
    remove: (id: string) => ipcRenderer.invoke('category:remove', id),
  },
  preferences: {
    get: () => ipcRenderer.invoke('preference:get'),
    set: (prefs: Partial<UserPreference>) => ipcRenderer.invoke('preference:set', prefs),
  },
})