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
  })

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