const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),  // Specify the preload script
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Listen for mood change from renderer
ipcMain.on('mood-change', (event, mood) => {
    console.log('Mood changed to:', mood);
    
    // Send a response back to the renderer
    event.reply('mood-response', mood);
});
