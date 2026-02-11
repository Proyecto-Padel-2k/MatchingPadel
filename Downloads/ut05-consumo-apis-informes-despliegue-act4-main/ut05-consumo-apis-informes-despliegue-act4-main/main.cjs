const { app, BrowserWindow } = require("electron");
const path = require("path");

// URL de tu web en producción (COPIA AQUÍ TU ENLACE DE VERCEL)
const appURL = "https://ut05-consumo-apis-informes-desplieg-phi.vercel.app/";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // preload: path.join(__dirname, "preload.cjs"), // Opcional
    },
  });

  // Si estamos en desarrollo (npm run electron-dev), cargamos localhost
  // Si estamos en producción (el .exe), cargamos la URL de Vercel
  if (process.env.ELECTRON_START_URL) {
    win.loadURL(process.env.ELECTRON_START_URL);
    win.webContents.openDevTools(); // Abre herramientas de desarrollo
  } else {
    win.loadURL(appURL);
    // win.removeMenu(); // Descomenta si quieres quitar el menú superior
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});