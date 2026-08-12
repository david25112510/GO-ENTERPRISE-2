'use strict';
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('goDesktop', {
  isElectron: true,
  getAppVersion: () => ipcRenderer.invoke('app:getVersion'),
  checkForUpdates: () => ipcRenderer.invoke('update:check'),
  installUpdate: (installerPath) => ipcRenderer.invoke('update:install', installerPath),
  onUpdateAvailable: (cb) => { const listener = (_e, info) => cb(info); ipcRenderer.on('update:available', listener); return () => ipcRenderer.removeListener('update:available', listener); },
  getSettings: () => ipcRenderer.invoke('settings:get'),
  setSettings: (partial) => ipcRenderer.invoke('settings:set', partial),
  chooseSharedFolder: () => ipcRenderer.invoke('settings:chooseSharedFolder'),
  openSharedFolder: () => ipcRenderer.invoke('settings:openSharedFolder'),
  getDisplays: () => ipcRenderer.invoke('settings:getDisplays'),
  readData: () => ipcRenderer.invoke('data:read'),
  writeData: (db) => ipcRenderer.invoke('data:write', db),
  onDataChangedExternally: (cb) => { const listener = (_e, payload) => cb(payload); ipcRenderer.on('data:changedExternally', listener); return () => ipcRenderer.removeListener('data:changedExternally', listener); },
  openTvWindow: () => ipcRenderer.invoke('tv:open'),
  closeTvWindow: () => ipcRenderer.invoke('tv:close'),
  isTvWindow: () => ipcRenderer.invoke('tv:isSelf')
});
