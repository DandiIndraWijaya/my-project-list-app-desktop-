import { exec } from "child_process";
import { app, BrowserWindow, ipcMain } from "electron"
import { readdirSync, statSync } from "fs"
import { fileURLToPath } from 'url';
import path from 'path'

const PROJECTS_DIR = 'C:\\Projects';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow =() => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.handle('get-projects', async () => {
  const entries = readdirSync(PROJECTS_DIR)

  return entries.filter(name => 
    statSync(path.join(PROJECTS_DIR, name)).isDirectory()
  )
})

ipcMain.handle('open-project', async (_event, projectName) => {
  const projectPath = path.join(PROJECTS_DIR, projectName)

  // Open in VSCode
  exec(`code ${projectPath}`)

  // Open Windows terminal
  exec(`start cmd /K "cd /d ${projectPath}"`)

   // Open in Windows File Explorer
   exec(`start explorer ${projectPath}`);
})

ipcMain.on('reload-window', () => {
  BrowserWindow.getFocusedWindow()?.reload();
});