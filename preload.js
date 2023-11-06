const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    openDialog: (method, config) => {
        const result = ipcRenderer.invoke('dialog', method, config);
        return result;
    },
    saveFileNames: (callback) => {
        ipcRenderer.on("file_names", (event, data) => {
            callback(data);
        })
    }
});