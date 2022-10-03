const { app, BrowserWindow } = require('electron');
const url = require('url');

const { PORT = 3000 } = process.env;

const coreUri = url.format({
  protocol: 'http',
  hostname: 'localhost',
  port: PORT,
  slashes: true,
  pathname: 'index.html',
});

const openWindow = () => {
  const win = new BrowserWindow();
  win.maximize();
  win.webContents.openDevTools({ mode: 'right' });
  return win.loadURL(coreUri);
};

app.commandLine.appendSwitch('ignore-connections-limit', 'localhost');
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('host-rules', 'MAP localhost 127.0.0.1');
app.whenReady().then(openWindow);
app.on('window-all-closed', () => process.platform === 'darwin' || app.quit());
