const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getProjects: () => ipcRenderer.invoke('get-projects'),
  openVSCode: (name) => ipcRenderer.invoke('open-vscode', name),
  openTerminal: (name) => ipcRenderer.invoke('open-terminal', name),
  openExplorer: (name) => ipcRenderer.invoke('open-explorer', name),
  reloadWindow: () => ipcRenderer.send('reload-window'),
});
