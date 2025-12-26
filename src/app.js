// ============================================
// Ollama Models Database with sizes and requirements
// ============================================
const OLLAMA_MODELS = [
  // Llama 3.2 Series
  { id: 'llama3.2:1b', name: 'Llama 3.2 1B', size: 1.3, vram: 2, ram: 4, description: 'Smallest Llama, fast responses', tags: ['fast', 'lightweight'] },
  { id: 'llama3.2:3b', name: 'Llama 3.2 3B', size: 2.0, vram: 3, ram: 6, description: 'Good balance of speed and quality', tags: ['balanced', 'recommended'] },
  { id: 'llama3.2', name: 'Llama 3.2 8B', size: 4.7, vram: 6, ram: 8, description: 'Default Llama 3.2, great all-rounder', tags: ['popular', 'recommended'] },
  
  // Llama 3.1 Series
  { id: 'llama3.1:8b', name: 'Llama 3.1 8B', size: 4.7, vram: 6, ram: 8, description: 'Previous gen, still excellent', tags: ['stable'] },
  { id: 'llama3.1:70b', name: 'Llama 3.1 70B', size: 40, vram: 48, ram: 64, description: 'Large model, needs beefy hardware', tags: ['large', 'powerful'] },
  
  // Mistral Series
  { id: 'mistral', name: 'Mistral 7B', size: 4.1, vram: 5, ram: 8, description: 'Fast and capable, great for coding', tags: ['coding', 'fast', 'popular'] },
  { id: 'mistral-nemo', name: 'Mistral Nemo 12B', size: 7.1, vram: 8, ram: 12, description: 'Larger Mistral variant', tags: ['coding'] },
  { id: 'mixtral:8x7b', name: 'Mixtral 8x7B', size: 26, vram: 32, ram: 48, description: 'MoE model, very capable', tags: ['large', 'powerful'] },
  
  // Coding Models
  { id: 'codellama:7b', name: 'Code Llama 7B', size: 3.8, vram: 5, ram: 8, description: 'Specialized for code generation', tags: ['coding', 'popular'] },
  { id: 'codellama:13b', name: 'Code Llama 13B', size: 7.4, vram: 10, ram: 16, description: 'Better code understanding', tags: ['coding'] },
  { id: 'codellama:34b', name: 'Code Llama 34B', size: 19, vram: 24, ram: 32, description: 'Best Code Llama for complex tasks', tags: ['coding', 'large'] },
  { id: 'deepseek-coder:6.7b', name: 'DeepSeek Coder 6.7B', size: 3.8, vram: 5, ram: 8, description: 'Strong coding model', tags: ['coding'] },
  { id: 'starcoder2:7b', name: 'StarCoder2 7B', size: 4.0, vram: 5, ram: 8, description: 'Code completion specialist', tags: ['coding'] },
  
  // Small & Fast Models
  { id: 'phi3:mini', name: 'Phi-3 Mini 3.8B', size: 2.2, vram: 3, ram: 6, description: 'Microsoft small model, surprisingly good', tags: ['fast', 'lightweight', 'recommended'] },
  { id: 'phi3:medium', name: 'Phi-3 Medium 14B', size: 7.9, vram: 10, ram: 16, description: 'Larger Phi variant', tags: ['balanced'] },
  { id: 'gemma:2b', name: 'Gemma 2B', size: 1.4, vram: 2, ram: 4, description: 'Google tiny model', tags: ['fast', 'lightweight'] },
  { id: 'gemma:7b', name: 'Gemma 7B', size: 4.8, vram: 6, ram: 8, description: 'Google medium model', tags: ['balanced'] },
  { id: 'gemma2:9b', name: 'Gemma 2 9B', size: 5.5, vram: 7, ram: 10, description: 'Latest Gemma, very capable', tags: ['recommended', 'popular'] },
  { id: 'gemma2:27b', name: 'Gemma 2 27B', size: 15, vram: 18, ram: 24, description: 'Large Gemma 2', tags: ['powerful'] },
  { id: 'qwen2:7b', name: 'Qwen2 7B', size: 4.4, vram: 6, ram: 8, description: 'Alibaba model, multilingual', tags: ['multilingual', 'balanced'] },
  { id: 'qwen2:72b', name: 'Qwen2 72B', size: 41, vram: 48, ram: 64, description: 'Large Qwen model', tags: ['large', 'powerful'] },
  
  // Vision Models
  { id: 'llava:7b', name: 'LLaVA 7B', size: 4.5, vram: 6, ram: 8, description: 'Can understand images', tags: ['vision', 'multimodal'] },
  { id: 'llava:13b', name: 'LLaVA 13B', size: 8.0, vram: 10, ram: 16, description: 'Better image understanding', tags: ['vision', 'multimodal'] },
  { id: 'bakllava', name: 'BakLLaVA', size: 4.5, vram: 6, ram: 8, description: 'Alternative vision model', tags: ['vision', 'multimodal'] },
  
  // Specialized Models
  { id: 'neural-chat', name: 'Neural Chat 7B', size: 4.1, vram: 5, ram: 8, description: 'Optimized for conversations', tags: ['chat'] },
  { id: 'openchat', name: 'OpenChat 7B', size: 4.1, vram: 5, ram: 8, description: 'Community fine-tuned chat model', tags: ['chat'] },
  { id: 'wizard-math', name: 'Wizard Math 7B', size: 4.1, vram: 5, ram: 8, description: 'Specialized for math problems', tags: ['math'] },
  { id: 'meditron:7b', name: 'Meditron 7B', size: 4.1, vram: 5, ram: 8, description: 'Medical domain model', tags: ['medical'] },
  
  // Uncensored/Unrestricted
  { id: 'dolphin-mixtral:8x7b', name: 'Dolphin Mixtral', size: 26, vram: 32, ram: 48, description: 'Uncensored MoE model', tags: ['uncensored', 'large'] },
  { id: 'dolphin-llama3:8b', name: 'Dolphin Llama3 8B', size: 4.7, vram: 6, ram: 8, description: 'Uncensored Llama 3', tags: ['uncensored'] },
  
  // Tiny Models (< 2GB)
  { id: 'tinyllama', name: 'TinyLlama 1.1B', size: 0.6, vram: 1, ram: 2, description: 'Extremely small, for testing', tags: ['tiny', 'fast'] },
  { id: 'tinydolphin', name: 'TinyDolphin 1.1B', size: 0.6, vram: 1, ram: 2, description: 'Tiny uncensored model', tags: ['tiny', 'fast', 'uncensored'] },
];
// ============================================
// Error Detection & Auto-Fix System
// ============================================
const ERROR_PATTERNS = [
  // Python/pip not found
  {
    patterns: [
      /python[3]?\s*(:|is not recognized|not found|command not found)/i,
      /'python[3]?' is not recognized/i,
      /No module named pip/i
    ],
    title: 'Python Not Found',
    description: 'Python is not installed or not in your system PATH.',
    fixes: [
      { label: 'Download Python', action: 'download', url: 'https://www.python.org/downloads/' },
      { label: 'Check PATH', action: 'info', text: 'Make sure to check "Add Python to PATH" during installation, then restart this app.' }
    ]
  },
  
  // pip not found
  {
    patterns: [
      /pip[3]?\s*(:|is not recognized|not found|command not found)/i,
      /'pip[3]?' is not recognized/i
    ],
    title: 'pip Not Found',
    description: 'pip package manager is not installed or not in PATH.',
    fixes: [
      { label: 'Install pip', action: 'run', command: 'python -m ensurepip --upgrade' },
      { label: 'Alternative', action: 'run', command: 'python -m pip install --upgrade pip' }
    ]
  },
  
  // Git not found
  {
    patterns: [
      /git\s*(:|is not recognized|not found|command not found)/i,
      /'git' is not recognized/i
    ],
    title: 'Git Not Found',
    description: 'Git is not installed on your system.',
    fixes: [
      { label: 'Download Git', action: 'download', url: 'https://git-scm.com/downloads' }
    ]
  },
  
  // Module not found
  {
    patterns: [
      /ModuleNotFoundError: No module named ['"]([\w\-_]+)['"]/i,
      /ImportError: No module named ['"]([\w\-_]+)['"]/i,
      /No module named ([\w\-_]+)/i
    ],
    title: 'Missing Python Module',
    description: 'A required Python package is not installed.',
    fixes: [
      { label: 'Install Module', action: 'run', command: 'pip install {module}', dynamic: true }
    ],
    extractModule: true
  },
  
  // CUDA/GPU errors
  {
    patterns: [
      /CUDA out of memory/i,
      /torch\.cuda\.OutOfMemoryError/i,
      /CUDA error: out of memory/i
    ],
    title: 'GPU Out of Memory',
    description: 'Your GPU doesn\'t have enough VRAM for this operation.',
    fixes: [
      { label: 'Use CPU Mode', action: 'info', text: 'Try adding --cpu flag or setting CUDA_VISIBLE_DEVICES=""' },
      { label: 'Use Lower VRAM', action: 'info', text: 'Try --lowvram or --medvram flags if available' },
      { label: 'Close GPU Apps', action: 'info', text: 'Close other apps using GPU (games, browsers, etc.)' }
    ]
  },
  
  // CUDA not available
  {
    patterns: [
      /CUDA is not available/i,
      /no CUDA GPUs are available/i,
      /torch\.cuda\.is_available\(\) returned False/i,
      /AssertionError: Torch not compiled with CUDA enabled/i
    ],
    title: 'CUDA Not Available',
    description: 'PyTorch can\'t find CUDA or GPU drivers.',
    fixes: [
      { label: 'Install CUDA PyTorch', action: 'run', command: 'pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121' },
      { label: 'Download CUDA Toolkit', action: 'download', url: 'https://developer.nvidia.com/cuda-downloads' },
      { label: 'Update GPU Drivers', action: 'download', url: 'https://www.nvidia.com/drivers' }
    ]
  },
  
  // Permission denied
  {
    patterns: [
      /Permission denied/i,
      /PermissionError/i,
      /Access is denied/i,
      /\[WinError 5\]/i
    ],
    title: 'Permission Denied',
    description: 'The operation requires administrator privileges.',
    fixes: [
      { label: 'Run as Admin', action: 'info', text: 'Close this app and run it as Administrator' },
      { label: 'Use --user flag', action: 'run', command: 'pip install --user {package}', note: 'For pip installs, try adding --user flag' }
    ]
  },
  
  // SSL Certificate errors
  {
    patterns: [
      /SSL: CERTIFICATE_VERIFY_FAILED/i,
      /SSLCertVerificationError/i,
      /\[SSL: CERTIFICATE_VERIFY_FAILED\]/i
    ],
    title: 'SSL Certificate Error',
    description: 'SSL verification failed. This might be a network/firewall issue.',
    fixes: [
      { label: 'Upgrade Certificates', action: 'run', command: 'pip install --upgrade certifi' },
      { label: 'Disable SSL (temp)', action: 'run', command: 'pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org {package}' }
    ]
  },
  
  // Rust/Cargo required
  {
    patterns: [
      /cargo['"]\s*not found/i,
      /error: can't find Rust compiler/i,
      /Rust compiler is not installed/i,
      /requires Rust/i
    ],
    title: 'Rust Compiler Required',
    description: 'This package requires Rust to compile from source.',
    fixes: [
      { label: 'Install Rust', action: 'download', url: 'https://rustup.rs/' },
      { label: 'Alternative', action: 'info', text: 'After installing Rust, restart your terminal and try again.' }
    ]
  },
  
  // Visual C++ Build Tools
  {
    patterns: [
      /Microsoft Visual C\+\+ .* is required/i,
      /error: Microsoft Visual C\+\+/i,
      /distutils\.errors\.DistutilsPlatformError/i,
      /Unable to find vcvarsall\.bat/i
    ],
    title: 'Visual C++ Build Tools Required',
    description: 'This package needs to compile C++ code.',
    fixes: [
      { label: 'Download Build Tools', action: 'download', url: 'https://visualstudio.microsoft.com/visual-cpp-build-tools/' },
      { label: 'Info', action: 'info', text: 'Install "Desktop development with C++" workload' }
    ]
  },
  
  // Disk space
  {
    patterns: [
      /No space left on device/i,
      /not enough space/i,
      /disk quota exceeded/i,
      /\[Errno 28\]/i
    ],
    title: 'Disk Space Full',
    description: 'Not enough disk space to complete the operation.',
    fixes: [
      { label: 'Check Space', action: 'info', text: 'Free up disk space and try again. Models can be 1-50GB!' }
    ]
  },
  
  // Connection errors
  {
    patterns: [
      /Connection refused/i,
      /ConnectionResetError/i,
      /Network is unreachable/i,
      /Could not reach/i,
      /Failed to establish/i,
      /TimeoutError/i,
      /timed out/i
    ],
    title: 'Connection Failed',
    description: 'Network connection failed. Check your internet.',
    fixes: [
      { label: 'Retry', action: 'info', text: 'Check your internet connection and try again.' },
      { label: 'Use VPN', action: 'info', text: 'Some regions may need VPN to access certain resources.' }
    ]
  },
  
  // Git clone errors
  {
    patterns: [
      /fatal: repository .* not found/i,
      /fatal: could not read from remote repository/i
    ],
    title: 'Git Repository Error',
    description: 'Could not access the Git repository.',
    fixes: [
      { label: 'Check URL', action: 'info', text: 'Verify the repository URL is correct and public.' },
      { label: 'Try HTTPS', action: 'info', text: 'Make sure you\'re using https:// not git@' }
    ]
  },
  
  // Ollama not found
  {
    patterns: [
      /ollama\s*(:|is not recognized|not found|command not found)/i,
      /'ollama' is not recognized/i
    ],
    title: 'Ollama Not Installed',
    description: 'Ollama is not installed or not in PATH.',
    fixes: [
      { label: 'Download Ollama', action: 'download', url: 'https://ollama.com/download' },
      { label: 'Restart Terminal', action: 'info', text: 'If just installed, close and reopen this app.' }
    ]
  },
  
  // Ollama model not found
  {
    patterns: [
      /model .* not found/i,
      /pull model manifest/i,
      /Error: pull model manifest/i
    ],
    title: 'Model Not Found',
    description: 'The specified model doesn\'t exist or couldn\'t be downloaded.',
    fixes: [
      { label: 'Check Model Name', action: 'info', text: 'Verify the model name is correct on ollama.com/library' },
      { label: 'View Models', action: 'download', url: 'https://ollama.com/library' }
    ]
  },
  
  // Externally managed environment (Linux)
  {
    patterns: [
      /externally-managed-environment/i,
      /This environment is externally managed/i
    ],
    title: 'Externally Managed Environment',
    description: 'Your Linux system restricts pip installs for system Python.',
    fixes: [
      { label: 'Use venv', action: 'run', command: 'python -m venv venv && source venv/bin/activate' },
      { label: 'Force Install', action: 'run', command: 'pip install --break-system-packages {package}', note: 'Not recommended, but works' }
    ]
  },
  
  // Version conflicts
  {
    patterns: [
      /ResolutionImpossible/i,
      /package versions have conflicting dependencies/i,
      /Cannot install .* because these package versions have conflicting/i
    ],
    title: 'Dependency Conflict',
    description: 'Package versions conflict with each other.',
    fixes: [
      { label: 'Use Fresh venv', action: 'run', command: 'python -m venv fresh_env && fresh_env\\Scripts\\activate' },
      { label: 'Force Install', action: 'run', command: 'pip install --ignore-installed {package}' }
    ]
  },

  // Torch/CUDA version mismatch
  {
    patterns: [
      /The detected CUDA version .* mismatches the version that was used to compile PyTorch/i,
      /CUDA driver version is insufficient/i
    ],
    title: 'CUDA Version Mismatch',
    description: 'PyTorch was compiled for a different CUDA version.',
    fixes: [
      { label: 'Reinstall PyTorch', action: 'run', command: 'pip uninstall torch torchvision torchaudio -y && pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121' },
      { label: 'Check CUDA Version', action: 'run', command: 'nvcc --version' }
    ]
  }
];

// Track detected errors to avoid duplicates
let detectedErrors = new Set();

function detectErrors(text) {
  for (const error of ERROR_PATTERNS) {
    for (const pattern of error.patterns) {
      const match = text.match(pattern);
      if (match) {
        // Create unique key for this error
        const errorKey = error.title;
        if (detectedErrors.has(errorKey)) continue;
        detectedErrors.add(errorKey);
        
        // Extract module name if applicable
        let moduleMatch = null;
        if (error.extractModule && match[1]) {
          moduleMatch = match[1];
        }
        
        showErrorHelper(error, moduleMatch);
        return true;
      }
    }
  }
  return false;
}

function showErrorHelper(error, moduleName = null) {
  const container = document.getElementById('error-helper-container');
  if (!container) return;
  
  // Process fixes - replace {module} placeholder
  const fixes = error.fixes.map(fix => {
    let processedFix = { ...fix };
    if (fix.command && moduleName) {
      processedFix.command = fix.command.replace('{module}', moduleName).replace('{package}', moduleName);
    }
    if (fix.label === 'Install Module' && moduleName) {
      processedFix.label = `Install ${moduleName}`;
    }
    return processedFix;
  });
  
  const helperId = `error-${Date.now()}`;
  
  const helperHTML = `
    <div class="error-helper" id="${helperId}">
      <div class="error-helper-header">
        <div class="error-helper-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div class="error-helper-title">
          <h4>${error.title}</h4>
          <p>${error.description}</p>
        </div>
        <button class="error-helper-close" data-helper-id="${helperId}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="error-helper-fixes">
        <span class="fixes-label">Quick fixes:</span>
        ${fixes.map((fix, i) => {
          if (fix.action === 'download') {
            return `<button class="fix-btn" data-action="download" data-url="${fix.url}">${fix.label}</button>`;
          } else if (fix.action === 'run') {
            return `<button class="fix-btn primary" data-action="run" data-command="${encodeURIComponent(fix.command)}">${fix.label}</button>`;
          } else {
            return `<button class="fix-btn info" data-action="info" data-text="${encodeURIComponent(fix.text)}">${fix.label}</button>`;
          }
        }).join('')}
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', helperHTML);
  
  // Add event listeners
  const helperEl = document.getElementById(helperId);
  
  helperEl.querySelector('.error-helper-close').addEventListener('click', () => {
    helperEl.remove();
  });
  
  helperEl.querySelectorAll('.fix-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (btn.dataset.action === 'download') {
        window.electronAPI?.openExternal(btn.dataset.url);
      } else if (btn.dataset.action === 'run') {
        const cmd = decodeURIComponent(btn.dataset.command);
        helperEl.remove();
        await runCommand(cmd);
      } else if (btn.dataset.action === 'info') {
        const text = decodeURIComponent(btn.dataset.text);
        alert(text); // Simple alert, could be a modal
      }
    });
  });
  
  // Auto-scroll to show the helper
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearErrorHelpers() {
  const container = document.getElementById('error-helper-container');
  if (container) container.innerHTML = '';
  detectedErrors.clear();
}
// ============================================
// AI Models Data
// ============================================
const AI_MODELS = [
  {
    id: 'ollama',
    name: 'Ollama',
    category: 'text',
    description: 'Run large language models locally. Supports Llama 3, Mistral, Gemma, and more.',
    requirements: ['8GB+ RAM', 'Optional: GPU'],
    hasModelSelector: true,
    steps: [
      { title: 'Download Ollama', description: 'Get the installer from ollama.com', action: 'download', url: 'https://ollama.com/download' },
      { title: 'Install Ollama', description: 'Run the downloaded installer', action: 'manual' },
      { title: 'Select & Pull Model', description: 'Choose a model to download', action: 'model-select' },
      { title: 'Test the Model', description: 'Run a quick test', action: 'run', command: 'ollama run {model} "Hello!"', dynamic: true }
    ]
  },
  {
    id: 'lm-studio',
    name: 'LM Studio',
    category: 'text',
    description: 'Desktop app to discover, download, and run local LLMs with a beautiful interface.',
    requirements: ['8GB+ RAM', 'Optional: GPU'],
    steps: [
      { title: 'Download LM Studio', description: 'Get it from lmstudio.ai', action: 'download', url: 'https://lmstudio.ai/' },
      { title: 'Install Application', description: 'Run the installer', action: 'manual' },
      { title: 'Download a Model', description: 'Use the built-in browser to download a model', action: 'manual' }
    ]
  },
  {
    id: 'gpt4all',
    name: 'GPT4All',
    category: 'text',
    description: 'Open-source chatbot with LocalDocs feature for chatting about your files.',
    requirements: ['8GB+ RAM'],
    steps: [
      { title: 'Download GPT4All', description: 'Get it from gpt4all.io', action: 'download', url: 'https://gpt4all.io/' },
      { title: 'Install Application', description: 'Run the installer', action: 'manual' },
      { title: 'Download a Model', description: 'Choose a model from the built-in library', action: 'manual' }
    ]
  },
  {
    id: 'stable-diffusion-webui',
    name: 'Stable Diffusion WebUI',
    category: 'image',
    description: 'AUTOMATIC1111\'s feature-rich web UI for Stable Diffusion image generation.',
    requirements: ['NVIDIA GPU (6GB+)', 'Python 3.10', 'Git'],
    steps: [
      { title: 'Clone Repository', description: 'Clone the WebUI repo', action: 'run', command: 'git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git' },
      { title: 'Download a Model', description: 'Get SD 1.5 or SDXL from HuggingFace', action: 'download', url: 'https://huggingface.co/runwayml/stable-diffusion-v1-5' },
      { title: 'Place Model', description: 'Put .safetensors in models/Stable-diffusion/', action: 'manual' },
      { title: 'Launch WebUI', description: 'Start the application', action: 'run', command: 'cd stable-diffusion-webui && webui-user.bat' }
    ]
  },
  {
    id: 'comfyui',
    name: 'ComfyUI',
    category: 'image',
    description: 'Powerful node-based UI for Stable Diffusion with advanced workflow capabilities.',
    requirements: ['NVIDIA GPU (6GB+)', 'Python 3.10', 'Git'],
    steps: [
      { title: 'Clone Repository', description: 'Clone ComfyUI', action: 'run', command: 'git clone https://github.com/comfyanonymous/ComfyUI.git' },
      { title: 'Install Requirements', description: 'Install Python dependencies', action: 'run', command: 'cd ComfyUI && pip install -r requirements.txt' },
      { title: 'Install PyTorch CUDA', description: 'Install PyTorch with GPU support', action: 'run', command: 'pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121' },
      { title: 'Launch ComfyUI', description: 'Start the server', action: 'run', command: 'cd ComfyUI && python main.py' }
    ]
  },
  {
    id: 'fooocus',
    name: 'Fooocus',
    category: 'image',
    description: 'Simplified Stable Diffusion - minimal setup, automatic model downloads.',
    requirements: ['NVIDIA GPU (4GB+)', 'Python 3.10'],
    steps: [
      { title: 'Clone Repository', description: 'Clone Fooocus', action: 'run', command: 'git clone https://github.com/lllyasviel/Fooocus.git' },
      { title: 'Launch Fooocus', description: 'Start (auto-downloads models)', action: 'run', command: 'cd Fooocus && python launch.py' }
    ]
  },
  {
    id: 'whisper',
    name: 'OpenAI Whisper',
    category: 'audio',
    description: 'State-of-the-art speech recognition for transcribing audio in any language.',
    requirements: ['Python 3.8+', 'FFmpeg', 'Optional: GPU'],
    steps: [
      { title: 'Install Whisper', description: 'Install via pip', action: 'run', command: 'pip install openai-whisper' },
      { title: 'Install FFmpeg', description: 'Required for audio processing', action: 'download', url: 'https://ffmpeg.org/download.html' },
      { title: 'Test Whisper', description: 'Transcribe an audio file', action: 'run', command: 'whisper --help' }
    ]
  },
  {
    id: 'bark',
    name: 'Bark',
    category: 'audio',
    description: 'Text-to-speech with emotions, music, and sound effects.',
    requirements: ['Python 3.8+', 'GPU recommended'],
    steps: [
      { title: 'Install Bark', description: 'Install from GitHub', action: 'run', command: 'pip install git+https://github.com/suno-ai/bark.git' },
      { title: 'Install scipy', description: 'Required for audio output', action: 'run', command: 'pip install scipy' }
    ]
  },
  {
    id: 'xtts',
    name: 'XTTS v2',
    category: 'audio',
    description: 'Voice cloning TTS - clone any voice with just 6 seconds of audio.',
    requirements: ['Python 3.9+', 'GPU recommended'],
    steps: [
      { title: 'Install TTS', description: 'Install Coqui TTS', action: 'run', command: 'pip install TTS' }
    ]
  },
  {
    id: 'svd',
    name: 'Stable Video Diffusion',
    category: 'video',
    description: 'Generate short video clips from images using diffusion.',
    requirements: ['NVIDIA GPU (12GB+)', 'ComfyUI'],
    steps: [
      { title: 'Install ComfyUI', description: 'SVD works through ComfyUI', action: 'manual' },
      { title: 'Download SVD Model', description: 'Get from HuggingFace', action: 'download', url: 'https://huggingface.co/stabilityai/stable-video-diffusion-img2vid-xt' }
    ]
  }
];

// ============================================
// App State
// ============================================
let selectedAI = null;
let selectedOllamaModel = null;
let isRunning = false;
let systemSpecs = { ram: 8, vram: 0, hasGpu: false };
let recentModels = [];

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  initWindowControls();
  initNavigation();
  await initSystemCheck();
  initAIGrid();
  initFilters();
  initTerminal();
  initInstallation();
  await loadRecentModels();
});

// ============================================
// Window Controls
// ============================================
function initWindowControls() {
  document.getElementById('minimize-btn')?.addEventListener('click', () => window.electronAPI?.minimize());
  document.getElementById('maximize-btn')?.addEventListener('click', () => window.electronAPI?.maximize());
  document.getElementById('close-btn')?.addEventListener('click', () => window.electronAPI?.close());
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => goToStep(item.dataset.step));
  });
  
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => goToStep(btn.dataset.goto));
  });
  
  document.getElementById('install-another-btn')?.addEventListener('click', () => {
    selectedAI = null;
    selectedOllamaModel = null;
    document.querySelector('.success-banner')?.remove();
    goToStep('select-ai');
  });
}

function goToStep(step) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.toggle('active', i.dataset.step === step));
  document.querySelectorAll('.step-content').forEach(c => c.classList.toggle('active', c.dataset.step === step));
  
  if (step === 'system-check') runSystemChecks();
  if (step === 'installation' && selectedAI) setupInstallation();
}

// ============================================
// Recent Models
// ============================================
async function loadRecentModels() {
  if (window.electronAPI?.getRecentModels) {
    recentModels = await window.electronAPI.getRecentModels();
  }
}

async function addToRecentModels(model) {
  if (window.electronAPI?.addRecentModel) {
    recentModels = await window.electronAPI.addRecentModel(model);
  }
}

// ============================================
// System Checks
// ============================================
async function initSystemCheck() {
  document.getElementById('recheck-btn')?.addEventListener('click', runSystemChecks);
  
  if (window.electronAPI) {
    const info = await window.electronAPI.getSystemInfo();
    systemSpecs.ram = parseInt(info.totalMemory) || 8;
    
    document.getElementById('system-info-display').innerHTML = `
      <div class="system-info-item"><span class="label">Platform</span><span class="value">${info.platform}</span></div>
      <div class="system-info-item"><span class="label">Architecture</span><span class="value">${info.arch}</span></div>
      <div class="system-info-item"><span class="label">CPU</span><span class="value">${info.cpuModel}</span></div>
      <div class="system-info-item"><span class="label">RAM</span><span class="value">${info.totalMemory}</span></div>
    `;
  }
}

async function runSystemChecks() {
  const checks = ['python', 'pip', 'git', 'nvidia', 'cuda'];
  checks.forEach(c => setCheckStatus(c, 'pending', 'Checking...'));
  
  if (!window.electronAPI) {
    setTimeout(() => {
      setCheckStatus('python', 'success', 'Python 3.11.5');
      setCheckStatus('pip', 'success', 'pip 23.3');
      setCheckStatus('git', 'success', 'git 2.42.0');
      setCheckStatus('nvidia', 'success', 'RTX 3080 (10GB)');
      setCheckStatus('cuda', 'success', 'CUDA 12.1');
      systemSpecs = { ram: 32, vram: 10, hasGpu: true };
    }, 500);
    return;
  }
  
  const python = await window.electronAPI.checkPython();
  setCheckStatus('python', python.installed ? 'success' : 'error', python.version || 'Not installed');
  if (!python.installed) showInstallBtn('python');
  
  const pip = await window.electronAPI.checkPip();
  setCheckStatus('pip', pip.installed ? 'success' : 'error', pip.version || 'Not installed');
  
  const git = await window.electronAPI.checkGit();
  setCheckStatus('git', git.installed ? 'success' : 'error', git.version || 'Not installed');
  if (!git.installed) showInstallBtn('git');
  
  const nvidia = await window.electronAPI.checkNvidiaGpu();
  if (nvidia.hasGpu && nvidia.gpuInfo?.[0]) {
    const gpu = nvidia.gpuInfo[0];
    const vramNum = parseInt(gpu.vram) || 0;
    systemSpecs.vram = vramNum;
    systemSpecs.hasGpu = true;
    setCheckStatus('nvidia', 'success', `${gpu.name} (${gpu.vram})`);
    
    const cuda = await window.electronAPI.checkCuda();
    setCheckStatus('cuda', cuda.installed ? 'success' : 'warning', cuda.version || 'Not installed');
    if (!cuda.installed) showInstallBtn('cuda');
  } else {
    systemSpecs.hasGpu = false;
    systemSpecs.vram = 0;
    setCheckStatus('nvidia', 'warning', 'No NVIDIA GPU (CPU mode)');
    setCheckStatus('cuda', 'warning', 'Skipped (no GPU)');
  }
}

function setCheckStatus(id, status, message) {
  const item = document.getElementById(`check-${id}`);
  if (!item) return;
  
  const statusEl = item.querySelector('.check-status');
  const resultEl = item.querySelector('.check-result');
  
  statusEl.className = `check-status ${status}`;
  statusEl.innerHTML = status === 'pending' ? '<div class="spinner"></div>' :
    status === 'success' ? '✓' : status === 'error' ? '✗' : '⚠';
  
  resultEl.textContent = message;
}

function showInstallBtn(id) {
  const btn = document.querySelector(`#check-${id} .install-btn`);
  if (btn) {
    btn.style.display = 'inline-flex';
    btn.onclick = () => window.electronAPI?.openExternal(btn.dataset.url);
  }
}

// ============================================
// AI Grid
// ============================================
function initAIGrid() {
  renderAIGrid(AI_MODELS);
}

function renderAIGrid(models) {
  const grid = document.getElementById('ai-grid');
  grid.innerHTML = models.map(m => `
    <div class="ai-card" data-id="${m.id}">
      <div class="ai-card-header">
        <div class="ai-card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            ${m.category === 'text' ? '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' :
              m.category === 'image' ? '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>' :
              m.category === 'audio' ? '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/>' :
              '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>'}
          </svg>
        </div>
        <div class="ai-card-title">
          <h4>${m.name}</h4>
          <span class="ai-card-category">${m.category}</span>
        </div>
      </div>
      <p class="ai-card-description">${m.description}</p>
      <div class="ai-card-requirements">
        ${m.requirements.map(r => `<span class="requirement-tag ${r.toLowerCase().includes('gpu') ? 'gpu' : ''}">${r}</span>`).join('')}
      </div>
    </div>
  `).join('');
  
  grid.querySelectorAll('.ai-card').forEach(card => {
    card.addEventListener('click', () => {
      grid.querySelectorAll('.ai-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedAI = AI_MODELS.find(m => m.id === card.dataset.id);
      selectedOllamaModel = null;
      document.getElementById('start-install-btn').disabled = false;
    });
  });
}

function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      renderAIGrid(filter === 'all' ? AI_MODELS : AI_MODELS.filter(m => m.category === filter));
    });
  });
}

// ============================================
// Ollama Model Selector
// ============================================
function getRecommendedModels() {
  const { ram, vram, hasGpu } = systemSpecs;
  
  return OLLAMA_MODELS.map(model => {
    let score = 0;
    let canRun = true;
    let runMode = 'cpu';
    let warning = null;
    
    // Check if can run on GPU
    if (hasGpu && vram >= model.vram) {
      score += 50;
      runMode = 'gpu';
    } else if (ram >= model.ram) {
      runMode = 'cpu';
      score += 20;
    } else {
      canRun = false;
      warning = `Needs ${model.ram}GB RAM`;
    }
    
    // Bonus for recommended/popular tags
    if (model.tags.includes('recommended')) score += 30;
    if (model.tags.includes('popular')) score += 20;
    if (model.tags.includes('fast')) score += 10;
    
    // Penalty for large models on limited hardware
    if (model.size > 10 && vram < 12) score -= 20;
    if (model.size > 20) score -= 30;
    
    // Bonus for right-sized models
    if (hasGpu) {
      if (model.vram <= vram && model.vram >= vram * 0.5) score += 25;
    } else {
      if (model.ram <= ram && model.ram >= ram * 0.5) score += 25;
    }
    
    return { ...model, score, canRun, runMode, warning };
  }).sort((a, b) => b.score - a.score);
}

function renderModelSelector(container) {
  const recommended = getRecommendedModels();
  const canRunModels = recommended.filter(m => m.canRun);
  const topRecommended = canRunModels.slice(0, 3);
  
  container.innerHTML = `
    <div class="model-selector">
      ${recentModels.length > 0 ? `
        <div class="model-section">
          <h4 class="model-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Recent Models
          </h4>
          <div class="model-list">
            ${recentModels.map(m => {
              const fullModel = OLLAMA_MODELS.find(om => om.id === m.id) || m;
              return renderModelCard(fullModel, 'recent');
            }).join('')}
          </div>
        </div>
      ` : ''}
      
      <div class="model-section">
        <h4 class="model-section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Recommended for Your System
          <span class="system-badge">${systemSpecs.hasGpu ? `${systemSpecs.vram}GB VRAM` : `${systemSpecs.ram}GB RAM`}</span>
        </h4>
        <div class="model-list">
          ${topRecommended.map(m => renderModelCard(m, 'recommended')).join('')}
        </div>
      </div>
      
      <div class="model-section">
        <h4 class="model-section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="4" y1="21" x2="4" y2="14"/>
            <line x1="4" y1="10" x2="4" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12" y2="3"/>
            <line x1="20" y1="21" x2="20" y2="16"/>
            <line x1="20" y1="12" x2="20" y2="3"/>
          </svg>
          All Models
        </h4>
        <div class="model-filter-row">
          <input type="text" class="model-search" id="model-search" placeholder="Search models...">
          <select class="model-filter-select" id="model-category-filter">
            <option value="all">All Categories</option>
            <option value="fast">Fast & Lightweight</option>
            <option value="coding">Coding</option>
            <option value="vision">Vision</option>
            <option value="large">Large & Powerful</option>
          </select>
        </div>
        <div class="model-list all-models" id="all-models-list">
          ${canRunModels.map(m => renderModelCard(m, 'all')).join('')}
        </div>
        ${recommended.filter(m => !m.canRun).length > 0 ? `
          <details class="cant-run-section">
            <summary>Models that may not run well (${recommended.filter(m => !m.canRun).length})</summary>
            <div class="model-list dimmed">
              ${recommended.filter(m => !m.canRun).map(m => renderModelCard(m, 'cantrun')).join('')}
            </div>
          </details>
        ` : ''}
      </div>
    </div>
  `;
  
  // Event listeners
  container.querySelectorAll('.model-card').forEach(card => {
    card.addEventListener('click', () => {
      container.querySelectorAll('.model-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedOllamaModel = OLLAMA_MODELS.find(m => m.id === card.dataset.id);
      updatePullButton();
    });
  });
  
  // Search
  document.getElementById('model-search')?.addEventListener('input', (e) => {
    filterModels(e.target.value, document.getElementById('model-category-filter')?.value || 'all');
  });
  
  // Category filter
  document.getElementById('model-category-filter')?.addEventListener('change', (e) => {
    filterModels(document.getElementById('model-search')?.value || '', e.target.value);
  });
}

function renderModelCard(model, section) {
  const sizeGB = model.size?.toFixed(1) || '?';
  const isSelected = selectedOllamaModel?.id === model.id;
  
  return `
    <div class="model-card ${isSelected ? 'selected' : ''} ${!model.canRun ? 'disabled' : ''}" data-id="${model.id}">
      <div class="model-card-header">
        <div class="model-card-name">${model.name}</div>
        <div class="model-card-size">${sizeGB} GB</div>
      </div>
      <div class="model-card-desc">${model.description || ''}</div>
      <div class="model-card-footer">
        <div class="model-tags">
          ${model.runMode === 'gpu' ? '<span class="model-tag gpu">GPU</span>' : '<span class="model-tag cpu">CPU</span>'}
          ${(model.tags || []).slice(0, 2).map(t => `<span class="model-tag">${t}</span>`).join('')}
        </div>
        ${model.warning ? `<div class="model-warning">${model.warning}</div>` : ''}
        ${section === 'recommended' ? '<span class="recommended-badge">★ Best for you</span>' : ''}
      </div>
    </div>
  `;
}

function filterModels(search, category) {
  const list = document.getElementById('all-models-list');
  if (!list) return;
  
  let models = getRecommendedModels().filter(m => m.canRun);
  
  // Search filter
  if (search) {
    const s = search.toLowerCase();
    models = models.filter(m => 
      m.name.toLowerCase().includes(s) || 
      m.id.toLowerCase().includes(s) ||
      m.description?.toLowerCase().includes(s) ||
      m.tags?.some(t => t.toLowerCase().includes(s))
    );
  }
  
  // Category filter
  if (category && category !== 'all') {
    models = models.filter(m => m.tags?.includes(category));
  }
  
  list.innerHTML = models.map(m => renderModelCard(m, 'all')).join('') || 
    '<div class="no-models">No models match your search</div>';
  
  // Re-attach click listeners
  list.querySelectorAll('.model-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.model-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedOllamaModel = OLLAMA_MODELS.find(m => m.id === card.dataset.id);
      updatePullButton();
    });
  });
}

function updatePullButton() {
  const btn = document.getElementById('pull-model-btn');
  if (!btn) return;
  
  if (selectedOllamaModel) {
    btn.disabled = false;
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Pull ${selectedOllamaModel.name} (${selectedOllamaModel.size}GB)
    `;
  } else {
    btn.disabled = true;
    btn.innerHTML = 'Select a model first';
  }
}

// ============================================
// Terminal
// ============================================
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const content = document.getElementById('terminal-content');
  const clearBtn = document.getElementById('clear-btn');
  const killBtn = document.getElementById('kill-btn');
  
  input?.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter' && input.value.trim() && !isRunning) {
      const cmd = input.value.trim();
      input.value = '';
      clearErrorHelpers(); // Clear previous error helpers
      await runCommand(cmd);
    }
  });
  
  clearBtn?.addEventListener('click', () => { 
    content.innerHTML = ''; 
    clearErrorHelpers();
  });
  
  killBtn?.addEventListener('click', async () => {
    if (window.electronAPI) {
      await window.electronAPI.killProcess();
      appendToTerminal('\n^C Process terminated\n', 'error');
      setRunningState(false);
    }
  });
  
  if (window.electronAPI) {
    window.electronAPI.onCommandOutput((data) => {
      switch (data.type) {
        case 'start':
          appendToTerminal(data.data, 'command');
          setRunningState(true);
          clearErrorHelpers(); // Clear on new command
          break;
        case 'stdout':
          appendToTerminal(data.data);
          detectErrors(data.data); // Check for errors
          break;
        case 'stderr':
          const isError = /error|failed|exception|traceback/i.test(data.data);
          appendToTerminal(data.data, isError ? 'error' : 'info');
          detectErrors(data.data); // Check for errors
          break;
        case 'error':
          appendToTerminal(data.data, 'error');
          detectErrors(data.data);
          setRunningState(false);
          break;
        case 'end':
          appendToTerminal(data.data, data.code === 0 ? 'info' : 'error');
          setRunningState(false);
          break;
      }
    });
  }
}

function appendToTerminal(text, type = '') {
  const content = document.getElementById('terminal-content');
  if (!content) return;
  
  const span = document.createElement('span');
  if (type) span.className = type;
  span.textContent = text;
  content.appendChild(span);
  content.scrollTop = content.scrollHeight;
}

function setRunningState(running) {
  isRunning = running;
  const killBtn = document.getElementById('kill-btn');
  const input = document.getElementById('terminal-input');
  
  if (killBtn) killBtn.style.display = running ? 'inline-flex' : 'none';
  if (input) input.disabled = running;
  
  document.querySelectorAll('.step-action-btn[data-action="run"]').forEach(btn => {
    btn.disabled = running;
    btn.innerHTML = running ? '<span class="spinner" style="width:12px;height:12px;border-width:2px;"></span> Running...' : '▶ Run';
  });
  
  const pullBtn = document.getElementById('pull-model-btn');
  if (pullBtn && !running && selectedOllamaModel) {
    pullBtn.disabled = false;
  }
}

async function runCommand(cmd) {
  if (!window.electronAPI) {
    appendToTerminal(`$ ${cmd}\n`, 'command');
    appendToTerminal('Demo mode - command not executed\n', 'info');
    return { success: true };
  }
  return await window.electronAPI.runCommand(cmd);
}

// ============================================
// Installation
// ============================================
function initInstallation() {
  document.getElementById('start-install-btn')?.addEventListener('click', () => {
    if (selectedAI) goToStep('installation');
  });
}

function setupInstallation() {
  const container = document.getElementById('install-steps');
  const subtitle = document.getElementById('install-subtitle');
  
  document.querySelector('.success-banner')?.remove();
  
  subtitle.textContent = `Installing ${selectedAI.name}`;
  document.getElementById('install-progress-fill').style.width = '0%';
  document.getElementById('terminal-content').innerHTML = '';
  document.getElementById('install-another-btn').style.display = 'none';
  selectedOllamaModel = null;
  
  container.innerHTML = selectedAI.steps.map((step, i) => {
    if (step.action === 'model-select') {
      return `
        <div class="install-step ${i === 0 ? 'active' : ''}" data-index="${i}">
          <div class="install-step-header" data-toggle="true">
            <span class="step-number">${i + 1}</span>
            <div class="step-title">
              <h4>${step.title}</h4>
              <p>${step.description}</p>
            </div>
          </div>
          <div class="install-step-content">
            <div id="model-selector-container"></div>
            <div class="model-action-row">
              <button class="btn btn-primary" id="pull-model-btn" disabled>Select a model first</button>
            </div>
          </div>
        </div>
      `;
    }
    
    return `
      <div class="install-step ${i === 0 ? 'active' : ''}" data-index="${i}">
        <div class="install-step-header" data-toggle="true">
          <span class="step-number">${i + 1}</span>
          <div class="step-title">
            <h4>${step.title}</h4>
            <p>${step.description}</p>
          </div>
          ${step.action === 'run' ? `<button class="step-action-btn primary" data-action="run" data-command="${encodeURIComponent(step.command)}" ${step.dynamic ? 'data-dynamic="true"' : ''}>▶ Run</button>` :
            step.action === 'download' ? `<button class="step-action-btn" data-action="download" data-url="${step.url}">↓ Download</button>` :
            `<button class="step-action-btn" data-action="done">✓ Done</button>`}
        </div>
        <div class="install-step-content">
          ${step.command ? `<div class="code-block"><code>${step.command}</code><button class="copy-btn" data-copy="${encodeURIComponent(step.command)}">Copy</button></div>` : ''}
          ${step.url ? `<p style="margin-top:8px;font-size:12px;color:var(--text-secondary);">URL: <a href="#" class="link" data-url="${step.url}">${step.url}</a></p>` : ''}
        </div>
      </div>
    `;
  }).join('');
  
  // Render model selector if Ollama
  if (selectedAI.id === 'ollama') {
    const selectorContainer = document.getElementById('model-selector-container');
    if (selectorContainer) {
      renderModelSelector(selectorContainer);
    }
    
    // Pull model button
    document.getElementById('pull-model-btn')?.addEventListener('click', async () => {
      if (!selectedOllamaModel || isRunning) return;
      
      // Add to recent
      await addToRecentModels({ id: selectedOllamaModel.id, name: selectedOllamaModel.name, size: selectedOllamaModel.size });
      
      // Run pull command
      const cmd = `ollama pull ${selectedOllamaModel.id}`;
      const result = await runCommand(cmd);
      
      if (result?.success) {
        const index = parseInt(document.querySelector('.install-step.active')?.dataset.index);
        if (!isNaN(index)) completeStep(index);
      }
    });
  }
  
  // Event listeners
  container.querySelectorAll('.install-step-header[data-toggle]').forEach(header => {
    header.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        header.closest('.install-step').classList.toggle('active');
      }
    });
  });
  
  container.querySelectorAll('.step-action-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (isRunning) return;
      
      const step = btn.closest('.install-step');
      const index = parseInt(step.dataset.index);
      
      if (btn.dataset.action === 'run') {
        let cmd = decodeURIComponent(btn.dataset.command);
        
        // Replace {model} placeholder with selected model
        if (btn.dataset.dynamic === 'true' && selectedOllamaModel) {
          cmd = cmd.replace('{model}', selectedOllamaModel.id);
        }
        
        const result = await runCommand(cmd);
        if (result?.success) completeStep(index);
      } else if (btn.dataset.action === 'download') {
        window.electronAPI?.openExternal(btn.dataset.url);
      } else {
        completeStep(index);
      }
    });
  });
  
  container.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      let text = decodeURIComponent(btn.dataset.copy);
      if (text.includes('{model}') && selectedOllamaModel) {
        text = text.replace('{model}', selectedOllamaModel.id);
      }
      navigator.clipboard.writeText(text);
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 1500);
    });
  });
  
  container.querySelectorAll('.link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.electronAPI?.openExternal(link.dataset.url);
    });
  });
}

function completeStep(index) {
  const steps = document.querySelectorAll('.install-step');
  const step = steps[index];
  
  step.classList.remove('active');
  step.classList.add('completed');
  step.querySelector('.step-number').textContent = '✓';
  
  if (index + 1 < steps.length) {
    steps[index + 1].classList.add('active');
  }
  
  const progress = ((index + 1) / steps.length) * 100;
  document.getElementById('install-progress-fill').style.width = `${progress}%`;
  
  if (index + 1 === steps.length) {
    showCompletion();
  }
}

function showCompletion() {
  const container = document.getElementById('install-steps');
  container.insertAdjacentHTML('beforebegin', `
    <div class="success-banner">
      <div class="success-banner-icon">✓</div>
      <div>
        <h3>${selectedAI.name} Setup Complete!</h3>
        <p>All installation steps have been completed.</p>
      </div>
    </div>
  `);
  
  document.getElementById('install-another-btn').style.display = 'inline-flex';
}