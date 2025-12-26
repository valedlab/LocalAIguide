const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

let mainWindow;
let currentProcess = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    icon: path.join(__dirname, 'logo.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    backgroundColor: '#0a0a0a',
    titleBarStyle: 'hidden',
    frame: false
  });

  mainWindow.loadFile('src/index.html');
  
  // Open DevTools in development
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Window controls
ipcMain.handle('window-minimize', () => {
  mainWindow.minimize();
});

ipcMain.handle('window-maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.handle('window-close', () => {
  mainWindow.close();
});

// Open external URL
ipcMain.handle('open-external', (event, url) => {
  shell.openExternal(url);
});

// Get system info
ipcMain.handle('get-system-info', () => {
  return {
    platform: os.platform(),
    arch: os.arch(),
    cpus: os.cpus().length,
    cpuModel: os.cpus()[0]?.model || 'Unknown',
    totalMemory: Math.round(os.totalmem() / (1024 * 1024 * 1024)) + ' GB',
    freeMemory: Math.round(os.freemem() / (1024 * 1024 * 1024)) + ' GB',
    homeDir: os.homedir()
  };
});

// Check Python
ipcMain.handle('check-python', () => {
  return new Promise((resolve) => {
    const proc = spawn('python', ['--version'], { shell: true });
    let output = '';
    
    proc.stdout.on('data', (data) => { output += data.toString(); });
    proc.stderr.on('data', (data) => { output += data.toString(); });
    
    proc.on('close', (code) => {
      if (code === 0 && output.trim()) {
        resolve({ installed: true, version: output.trim() });
      } else {
        // Try python3
        const proc3 = spawn('python3', ['--version'], { shell: true });
        let output3 = '';
        
        proc3.stdout.on('data', (data) => { output3 += data.toString(); });
        proc3.stderr.on('data', (data) => { output3 += data.toString(); });
        
        proc3.on('close', (code3) => {
          if (code3 === 0 && output3.trim()) {
            resolve({ installed: true, version: output3.trim() });
          } else {
            resolve({ installed: false, version: null });
          }
        });
      }
    });
    
    proc.on('error', () => {
      resolve({ installed: false, version: null });
    });
  });
});

// Check pip
ipcMain.handle('check-pip', () => {
  return new Promise((resolve) => {
    const proc = spawn('pip', ['--version'], { shell: true });
    let output = '';
    
    proc.stdout.on('data', (data) => { output += data.toString(); });
    proc.stderr.on('data', (data) => { output += data.toString(); });
    
    proc.on('close', (code) => {
      if (code === 0 && output.trim()) {
        resolve({ installed: true, version: output.trim().split(' ').slice(0, 2).join(' ') });
      } else {
        const proc3 = spawn('pip3', ['--version'], { shell: true });
        let output3 = '';
        
        proc3.stdout.on('data', (data) => { output3 += data.toString(); });
        proc3.stderr.on('data', (data) => { output3 += data.toString(); });
        
        proc3.on('close', (code3) => {
          if (code3 === 0 && output3.trim()) {
            resolve({ installed: true, version: output3.trim().split(' ').slice(0, 2).join(' ') });
          } else {
            resolve({ installed: false, version: null });
          }
        });
      }
    });
    
    proc.on('error', () => {
      resolve({ installed: false, version: null });
    });
  });
});

// Check Git
ipcMain.handle('check-git', () => {
  return new Promise((resolve) => {
    const proc = spawn('git', ['--version'], { shell: true });
    let output = '';
    
    proc.stdout.on('data', (data) => { output += data.toString(); });
    proc.stderr.on('data', (data) => { output += data.toString(); });
    
    proc.on('close', (code) => {
      if (code === 0 && output.trim()) {
        resolve({ installed: true, version: output.trim() });
      } else {
        resolve({ installed: false, version: null });
      }
    });
    
    proc.on('error', () => {
      resolve({ installed: false, version: null });
    });
  });
});

// Check NVIDIA GPU
ipcMain.handle('check-nvidia-gpu', () => {
  return new Promise((resolve) => {
    const proc = spawn('nvidia-smi', ['--query-gpu=name,memory.total,driver_version', '--format=csv,noheader,nounits'], { shell: true });
    let output = '';
    
    proc.stdout.on('data', (data) => { output += data.toString(); });
    
    proc.on('close', (code) => {
      if (code === 0 && output.trim()) {
        const lines = output.trim().split('\n');
        const gpus = lines.map(line => {
          const parts = line.split(', ');
          return {
            name: parts[0]?.trim() || 'Unknown',
            vram: parts[1] ? `${Math.round(parseInt(parts[1]) / 1024)} GB` : 'Unknown',
            driverVersion: parts[2]?.trim() || 'Unknown'
          };
        });
        resolve({ hasGpu: true, gpuInfo: gpus });
      } else {
        resolve({ hasGpu: false, gpuInfo: null });
      }
    });
    
    proc.on('error', () => {
      resolve({ hasGpu: false, gpuInfo: null });
    });
  });
});

// Check CUDA
ipcMain.handle('check-cuda', () => {
  return new Promise((resolve) => {
    const proc = spawn('nvcc', ['--version'], { shell: true });
    let output = '';
    
    proc.stdout.on('data', (data) => { output += data.toString(); });
    proc.stderr.on('data', (data) => { output += data.toString(); });
    
    proc.on('close', (code) => {
      if (code === 0 && output.trim()) {
        const versionMatch = output.match(/release (\d+\.\d+)/);
        const version = versionMatch ? `CUDA ${versionMatch[1]}` : 'CUDA Installed';
        resolve({ installed: true, version: version });
      } else {
        // Check CUDA_PATH
        const cudaPath = process.env.CUDA_PATH || process.env.CUDA_HOME;
        if (cudaPath && fs.existsSync(cudaPath)) {
          resolve({ installed: true, version: `CUDA at ${cudaPath}` });
        } else {
          resolve({ installed: false, version: null });
        }
      }
    });
    
    proc.on('error', () => {
      resolve({ installed: false, version: null });
    });
  });
});

// Run command with streaming output
ipcMain.handle('run-command', (event, command) => {
  return new Promise((resolve) => {
    // Kill any existing process
    if (currentProcess) {
      try {
        currentProcess.kill();
      } catch (e) {}
      currentProcess = null;
    }
    
    const isWindows = process.platform === 'win32';
    const shell = isWindows ? 'cmd.exe' : '/bin/bash';
    const shellFlag = isWindows ? '/c' : '-c';
    
    // Send start message
    mainWindow.webContents.send('command-output', {
      type: 'start',
      data: `$ ${command}\n`
    });
    
    currentProcess = spawn(shell, [shellFlag, command], {
      env: { 
        ...process.env, 
        PYTHONUNBUFFERED: '1',
        PIP_PROGRESS_BAR: 'on',
        FORCE_COLOR: '0'
      },
      cwd: os.homedir()
    });
    
    currentProcess.stdout.on('data', (data) => {
      const text = data.toString();
      mainWindow.webContents.send('command-output', {
        type: 'stdout',
        data: text
      });
    });
    
    currentProcess.stderr.on('data', (data) => {
      const text = data.toString();
      mainWindow.webContents.send('command-output', {
        type: 'stderr',
        data: text
      });
    });
    
    currentProcess.on('error', (error) => {
      mainWindow.webContents.send('command-output', {
        type: 'error',
        data: `Error: ${error.message}\n`
      });
      currentProcess = null;
      resolve({ success: false, code: -1 });
    });
    
    currentProcess.on('close', (code) => {
      mainWindow.webContents.send('command-output', {
        type: 'end',
        data: `\nProcess exited with code ${code}\n`,
        code: code
      });
      currentProcess = null;
      resolve({ success: code === 0, code: code });
    });
  });
});

// Kill current process
ipcMain.handle('kill-process', () => {
  if (currentProcess) {
    try {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', currentProcess.pid, '/f', '/t'], { shell: true });
      } else {
        currentProcess.kill('SIGTERM');
      }
      currentProcess = null;
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  return { success: true };
});

// Check if process is running
ipcMain.handle('is-process-running', () => {
  return currentProcess !== null;

  // Add at the end of your main.js, before the last closing bracket

// Get Ollama models list from API
ipcMain.handle('get-ollama-models', async () => {
  return new Promise((resolve) => {
    const https = require('https');
    
    https.get('https://ollama.com/api/tags', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ success: true, models: parsed.models || [] });
        } catch (e) {
          resolve({ success: false, models: [] });
        }
      });
    }).on('error', () => {
      resolve({ success: false, models: [] });
    });
  });
});

// Get installed Ollama models
ipcMain.handle('get-installed-ollama-models', () => {
  return new Promise((resolve) => {
    const proc = spawn('ollama', ['list'], { shell: true });
    let output = '';
    
    proc.stdout.on('data', (data) => { output += data.toString(); });
    proc.stderr.on('data', (data) => { output += data.toString(); });
    
    proc.on('close', (code) => {
      if (code === 0) {
        const lines = output.trim().split('\n').slice(1); // Skip header
        const models = lines.map(line => {
          const parts = line.split(/\s+/);
          return {
            name: parts[0],
            size: parts[2],
            modified: parts[3]
          };
        }).filter(m => m.name);
        resolve({ success: true, models });
      } else {
        resolve({ success: false, models: [] });
      }
    });
    
    proc.on('error', () => {
      resolve({ success: false, models: [] });
    });
  });
});

// Store for recent models
const Store = require('electron-store');
const store = new Store();

ipcMain.handle('get-recent-models', () => {
  return store.get('recentModels', []);
});

ipcMain.handle('add-recent-model', (event, model) => {
  let recent = store.get('recentModels', []);
  // Remove if exists, add to front
  recent = recent.filter(m => m.id !== model.id);
  recent.unshift(model);
  // Keep only last 5
  recent = recent.slice(0, 5);
  store.set('recentModels', recent);
  return recent;
});
});