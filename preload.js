const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  minimize: () => ipcRenderer.invoke('window-minimize'),
  maximize: () => ipcRenderer.invoke('window-maximize'),
  close: () => ipcRenderer.invoke('window-close'),
  
  // System checks
  checkPython: () => ipcRenderer.invoke('check-python'),
  checkPip: () => ipcRenderer.invoke('check-pip'),
  checkGit: () => ipcRenderer.invoke('check-git'),
  checkNvidiaGpu: () => ipcRenderer.invoke('check-nvidia-gpu'),
  checkCuda: () => ipcRenderer.invoke('check-cuda'),
  
  // Commands
  runCommand: (cmd) => ipcRenderer.invoke('run-command', cmd),
  killProcess: () => ipcRenderer.invoke('kill-process'),
  isProcessRunning: () => ipcRenderer.invoke('is-process-running'),
  
  // Command output listener
  onCommandOutput: (callback) => {
    ipcRenderer.on('command-output', (event, data) => callback(data));
  },
  
  // Ollama specific
  getOllamaModels: () => ipcRenderer.invoke('get-ollama-models'),
  getInstalledOllamaModels: () => ipcRenderer.invoke('get-installed-ollama-models'),
  
  // Recent models
  getRecentModels: () => ipcRenderer.invoke('get-recent-models'),
  addRecentModel: (model) => ipcRenderer.invoke('add-recent-model', model),
  
  // Utils
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  getSystemInfo: () => ipcRenderer.invoke('get-system-info')
});