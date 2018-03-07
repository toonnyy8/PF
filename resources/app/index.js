const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
const ipcMain = require('electron').ipcMain;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 650,
        webPreferences: {
            nodeIntegrationInWorker: true
        }
    });
    //mainWindow.setFullScreen(true);
    //mainWindow.openDevTools();
    mainWindow.loadURL('file://' + __dirname + '/start.html');
    mainWindow.on('closed', function() {
        mainWindow = null
    });
};

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    };
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    };
});

ipcMain.on('full-screen', function(event, arg) {
    if (!mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(true);
    } else {
        mainWindow.setFullScreen(false);
    };
});

ipcMain.on('DevTools', function(event, arg) {
    if (!mainWindow.isDevToolsOpened()) {
        mainWindow.openDevTools();
    } else {
        mainWindow.closeDevTools();
    };
});
let ChooseAction;
ipcMain.on('ChooseAction', function(event, arg) {
    if (arg != null) {
        ChooseAction = arg;
    } else {
        event.returnValue = ChooseAction;
    }
});