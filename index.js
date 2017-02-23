'use strict';

const {app, BrowserWindow, Menu, dialog} = require('electron');

let mainWindow;

let menuTemplate = [{
  label: 'MyApp',
  submenu: [
    { label: 'About', accelerator: 'CmdOrCtrl+Shift+A', click() { showAboutDialog() }},
    { type: 'separator' },
    { label: 'Settings', accelerator: 'CmdOrCtrl+,', click() { showSettingsWindow() }},
    { type: 'separator' },
    { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click() { app.quit() }},
  ]
}];

let menu = Menu.buildFromTemplate(menuTemplate);

function showAboutDialog() {
  dialog.showMessageBox({
    type: 'info',
    buttons: ['OK'],
    message: 'About This App',
    detail: 'This app was created by @shgtkshruch'
  });
}

function createMainWindow() {
  // diplay menu
  Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({
    width: 600,
    height: 400
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('avtivate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});
