const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getProjects: () => ipcRenderer.invoke('get-projects'),
  openProject: (projectName) => ipcRenderer.invoke('open-project', projectName),
  reloadWindow: () => ipcRenderer.send('reload-window')
});
