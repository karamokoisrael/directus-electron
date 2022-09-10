// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const server = require("directus/server");
require("dotenv").config();
const { fork } = require("child_process");

const path = require("path");

async function createServer() {
  return new Promise((resolve, reject) => {
    try {
      const serverProcess = fork(
        `${__dirname}/node_modules/directus/dist/start.js`
      );
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

async function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Create and run directus server
  await createServer();

  // Load directus url
  setTimeout(() => {
    mainWindow.loadURL(`http://localhost:${process.env.PORT}`);
    mainWindow.focus();
  }, 3000);

  // Load the index.html of the app.
  // mainWindow.loadFile('index.html')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
