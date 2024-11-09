const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  sendMood: (mood) => ipcRenderer.send('mood-change', mood),
  onMoodResponse: (callback) => ipcRenderer.on('mood-response', callback),
});