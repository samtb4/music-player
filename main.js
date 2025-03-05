const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile("cloud9.html"); // Loads your media player UI

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
