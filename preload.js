const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  loadImages : (offerId, brandId, mode) => {
    ipcRenderer.invoke('load_images', {offerId, brandId, mode});
  },
  onFilenames: (callback) => {
    ipcRenderer.on('loaded_filenames', (e, params) => {
      callback(params);
    });
  }
});