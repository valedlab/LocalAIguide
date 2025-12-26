# 🤖 Local AI Guide

A modern, user-friendly desktop application that provides step-by-step guidance for setting up and running local AI models on your machine. Built with Electron and designed for both beginners and advanced users.

## ✨ Features

- 📱 **Clean, Modern UI** - Sleek dark-themed interface with smooth interactions
- 💻 **System Information** - Real-time display of your system specs and capabilities
- 🔍 **Python Detection** - Automatically checks for Python installation and version
- 🚀 **Easy Setup Guide** - Comprehensive step-by-step instructions for local AI setup
- ⚡ **Fast & Lightweight** - Minimal resource usage while providing maximum functionality
- 🔒 **Secure** - Context isolation and sandboxing for safe execution
- 🎨 **Responsive Design** - Works seamlessly on different screen sizes

## 📥 Installation

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Python 3.8+** - [Download here](https://www.python.org/)
- **npm** (comes with Node.js)

### Step 1: Clone or Download the Project

```bash
# If you have Git
git clone <your-repo-url>
cd local-ai-guide

# Or extract the downloaded folder and open terminal in that directory
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- `electron` - Desktop app framework
- `electron-builder` - Build and package the app
- `electron-store` - Local data storage
- And other dependencies from `package.json`

### Step 3: Run the Application

```bash
npm start
```

The app will launch immediately. You can now:
- View your system information
- Check if Python is installed
- Follow the local AI setup guides

## 🏗️ Building the Installer

To create a standalone installer (.exe) for distribution:

```bash
npm run build
```

This will generate:
- **Installer**: `dist/Local AI Guide Setup 1.0.0.exe`
- **Portable Version**: `dist/Local AI Guide 1.0.0.exe` (if configured)

The installer is completely self-contained—users just download the .exe and run it!

## 📁 Project Structure

```
local-ai-guide/
├── main.js                 # Main Electron process
├── preload.js             # Preload script for IPC communication
├── package.json           # Project configuration & dependencies
├── logo.ico              # Application icon
├── src/
│   ├── index.html        # Main HTML file
│   ├── app.js            # UI logic and interactions
│   └── styles.css        # Application styling
├── dist/                 # Build output (created after npm run build)
└── README.md            # This file!
```

## 🎮 Usage

Once the app is open:

1. **System Info Panel** - View your machine's specifications
2. **Python Check** - Click "Check Python" to verify installation
3. **Setup Guides** - Follow detailed instructions for setting up local AI models
4. **External Links** - Quick access to relevant documentation and resources

## 🔧 Development

### Hot Reload

During development, any changes you make to the code will be reflected when you refresh the app (press `F5` or `Ctrl+R`).

To enable DevTools for debugging, uncomment this line in `main.js`:

```javascript
// mainWindow.webContents.openDevTools();
```

### Building from Source

If you're making modifications:

1. Edit files in `src/` or the main process files
2. Test with `npm start`
3. Build the installer with `npm run build`

## 📦 Customization

### Change the App Icon

Replace `logo.ico` with your own icon file, or update the paths in:
- `main.js` - Line 13: `icon: path.join(__dirname, 'logo.ico')`
- `package.json` - Build section icon references

### Change the App Name

Edit `package.json`:
```json
{
  "name": "your-app-name",
  "productName": "Your App Display Name"
}
```

### Modify Installer Settings

Edit the `build` section in `package.json`:
```json
"build": {
  "appId": "com.yourcompany.appname",
  "productName": "Your App Name",
  "win": {
    "target": "nsis",
    "icon": "logo.ico"
  }
}
```

## 🐛 Troubleshooting

### App won't start
- Ensure Node.js is installed: `node --version`
- Reinstall dependencies: `rm -r node_modules` and `npm install`

### Python not detected
- Make sure Python is installed and added to PATH
- Try `python --version` in command prompt

### Build fails
- Clear the builder cache: `del %AppData%\electron-builder\Cache`
- Delete dist folder: `rmdir /s dist`
- Run `npm run build` again

### Icon not showing
- Ensure `logo.ico` is in the project root
- Clear Windows icon cache: `del %AppData%\IconCache.db`
- Restart your computer

## 📝 License

This project is provided as-is for educational and personal use.

## 🤝 Contributing

Found a bug or have a feature idea? Feel free to improve the project!

## 📚 Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Builder](https://www.electron.build/)
- [Local LLM Setup Guides](https://ollama.ai/)
- [Python Documentation](https://docs.python.org/)

---

**Happy coding! 🚀** If you find this tool helpful, consider sharing it with others interested in local AI setup.
