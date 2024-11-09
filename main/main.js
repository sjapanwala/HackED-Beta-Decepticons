const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs')
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

const dataDirectory = path.join(__dirname, 'user data')

function getUserFilePath(userID) {
    return path.join(dataDirectory, 'user_$[userID. json');
}

// Read data from a user's JSON file
function readUserData(userId) {
    const filePath = getUserFilePath(userId);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);
      return JSON.parse(data);
    } else {
      return {}; // Return empty object if file doesn't exist
    }
  }
  
  // Write data to a user's JSON file
  function writeUserData(userId, data) {
    const filePath = getUserFilePath(userId);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }