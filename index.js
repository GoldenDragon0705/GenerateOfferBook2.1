const { app, BrowserWindow, Menu, ipcMain, dialog, session } = require('electron')
const url = require('url')
const path = require('path')
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // nodeIntegration: true,
      // contextIsolation: false,
      // enableRemoteModule: true,
      // nodeIntegrationInWorker: true,
    }   
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  ipcMain.handle('load_images', (e, params) => {
    const config = {
      title: 'Select image files.',
      buttonLabel: 'Select',
      filters: [{
        name: "Image files", extensions: ["jpg", "jpeg", "png"]
      }],
      properties: ['openFile', 'multiSelections']
    };
    const filenames = dialog.showOpenDialogSync(win, config) || [];
    e.sender.send('loaded_filenames', {...params, filenames});
  });
};

const menutemplate = [
  {
    label: 'Offerbook',
    submenu: [
      {
        label: 'Create'
      },
      {
        label: "Save"
      }, 
      {
        label: "Save As"
      },
      {
        label: "Expert",
        submenu: [{
          label: "PDF file"
        }]
      }
    ]
  },
  {
    label: "Debug",
    submenu: [{
      role: "toggleDevTools"
    }]
  }
];

const menu = Menu.buildFromTemplate(menutemplate);
Menu.setApplicationMenu(menu);
app.on('ready', createWindow);