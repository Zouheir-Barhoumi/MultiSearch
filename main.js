const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");
const path = require("path");

process.env.NODE_ENV = "production";
const isDev = process.env.NODE_ENV !== "production";
const width = process.env.NODE_ENV !== "production" ? 800 : 500;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: width,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // OPEN DEVTOOLS IF IN DEV ENV

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("start-search", (event, data) => {
  const searchEngines = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://www.duckduckgo.com/?q=",
  };
  const sE = data.selectedEngine;

  const baseUrl = searchEngines[sE];

  const browsers = {
    brave: "/usr/bin/brave-browser-stable",
    firefox: "firefox",
  };

  let browser = browsers[data.selectedBrowser];

  function openSearchQueries(queries) {
    for (const query of queries) {
      const encodedQuery = encodeURIComponent(query);
      const url = baseUrl + encodedQuery;
      exec(`${browser} "${url}"`);
    }
  }

  openSearchQueries(data.searchQueries);
});
