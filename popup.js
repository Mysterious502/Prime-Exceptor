// popup.js - Fixed Version - All English

document.addEventListener('DOMContentLoaded', async () => {
  console.log('[Prime Exceptor Popup] Loaded');
  await loadSettings();
  await detectCurrentAI();
  buildAIList();
  document.getElementById('saveBtn').addEventListener('click', saveSettings);
  document.getElementById('mainToggle').addEventListener('change', saveSettings);
  document.getElementById('injectBtn').addEventListener('click', injectCustomPrompt);
});

async function loadSettings() {
  try {
    const stored = await chrome.storage.local.get(['primeSettings']);
    const settings = stored.primeSettings || {};
    const mainToggle    = document.getElementById('mainToggle');
    const promptStyle   = document.getElementById('promptStyle');
    const autoRetry     = document.getElementById('autoRetry');
    const interceptApi  = document.getElementById('interceptApi');
    const showIndicator = document.getElementById('showIndicator');
    const maxRetries    = document.getElementById('maxRetries');
    if (mainToggle)    mainToggle.checked    = settings.enabled !== false;
    if (promptStyle)   promptStyle.value     = settings.promptStyle || 'auto';
    if (autoRetry)     autoRetry.checked     = settings.autoRetry !== false;
    if (interceptApi)  interceptApi.checked  = settings.interceptApi !== false;
    if (showIndicator) showIndicator.checked = settings.showIndicator !== false;
    if (maxRetries)    maxRetries.value      = settings.maxRetries || '3';
  } catch (e) {
    console.log('[Popup] Load settings error:', e);
  }
}

async function detectCurrentAI() {
  const statusEl = document.getElementById('currentAiName');
  const dotEl    = document.getElementById('statusDot');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab) {
      statusEl.textContent = 'No active tab found';
      dotEl.className = 'status-dot inactive';
      return;
    }

    const url = tab.url || '';

    try {
      const pingResponse = await chrome.tabs.sendMessage(tab.id, {
        type: 'GET_CURRENT_AI'
      });

      if (pingResponse && pingResponse.ai) {
        statusEl.textContent = pingResponse.ai.name + ' - Active';
        dotEl.className = 'status-dot active';
      } else if (pingResponse) {
        statusEl.textContent = 'Page detected - No AI found';
        dotEl.className = 'status-dot inactive';
      }

    } catch (msgError) {
      const aiSites = [
        { url: 'chat.openai.com',         name: 'ChatGPT'      },
        { url: 'chatgpt.com',             name: 'ChatGPT'      },
        { url: 'claude.ai',               name: 'Claude'       },
        { url: 'gemini.google.com',       name: 'Gemini'       },
        { url: 'deepseek.com',            name: 'DeepSeek'     },
        { url: 'perplexity.ai',           name: 'Perplexity'   },
        { url: 'groq.com',                name: 'Groq'         },
        { url: 'mistral.ai',              name: 'Mistral'      },
        { url: 'poe.com',                 name: 'Poe'          },
        { url: 'grok.x.ai',               name: 'Grok'         },
        { url: 'copilot.microsoft.com',   name: 'Copilot'      },
        { url: 'kimi.ai',                 name: 'Kimi'         },
        { url: 'hunyuan.tencent.com',     name: 'Hunyuan'      },
        { url: 'arena.lmsys.org',         name: 'LMSys Arena'  },
        { url: 'huggingface.co',          name: 'HuggingFace'  },
        { url: 'pi.ai',                   name: 'Pi AI'        },
        { url: 'meta.ai',                 name: 'Meta AI'      },
        { url: 'coze.com',                name: 'Coze'         },
        { url: 'doubao.com',              name: 'Doubao'       },
        { url: 'chatglm.cn',              name: 'ChatGLM'      }
      ];

      const matched = aiSites.find(ai => url.includes(ai.url));

      if (matched) {
        // ✅ FIXED - English only
        statusEl.textContent = matched.name + ' - Please reload the page!';
        dotEl.className = 'status-dot inactive';
        showStatus('Please reload the page: Ctrl+R', 'error');
      } else {
        // ✅ FIXED - English only
        statusEl.textContent = 'Please visit any AI site';
        dotEl.className = 'status-dot inactive';
      }
    }

  } catch (e) {
    console.log('[Popup] detectCurrentAI error:', e);
    statusEl.textContent = 'Error detecting AI';
    dotEl.className = 'status-dot inactive';
  }
}

async function saveSettings() {
  try {
    const settings = {
      enabled:       document.getElementById('mainToggle').checked,
      promptStyle:   document.getElementById('promptStyle').value,
      autoRetry:     document.getElementById('autoRetry').checked,
      interceptApi:  document.getElementById('interceptApi').checked,
      showIndicator: document.getElementById('showIndicator').checked,
      maxRetries:    parseInt(document.getElementById('maxRetries').value)
    };

    await chrome.storage.local.set({ primeSettings: settings });

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        await chrome.tabs.sendMessage(tab.id, {
          type: 'UPDATE_SETTINGS',
          settings
        });
      }
    } catch (e) {
      // Content script not found - ignore
    }

    showStatus('Settings saved successfully!', 'success');

  } catch (e) {
    showStatus('Save error: ' + e.message, 'error');
  }
}

async function injectCustomPrompt() {
  const promptEl = document.getElementById('customPrompt');
  const prompt   = promptEl ? promptEl.value.trim() : '';

  if (!prompt) {
    // ✅ FIXED - English only
    showStatus('Please write a prompt first!', 'error');
    return;
  }

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab) {
      showStatus('No active tab found!', 'error');
      return;
    }

    const response = await chrome.tabs.sendMessage(tab.id, {
      type: 'INJECT_PROMPT',
      prompt
    });

    if (response && response.success) {
      showStatus('Prompt injected successfully!', 'success');
      if (promptEl) promptEl.value = '';
    } else {
      // ✅ FIXED - English only
      showStatus('Input field not found!', 'error');
    }

  } catch (e) {
    // ✅ FIXED - English only
    showStatus('Error: Please reload the page', 'error');
  }
}

function buildAIList() {
  const listEl = document.getElementById('aiList');
  if (!listEl) return;

  const aiList = [
    { name: 'ChatGPT',     company: 'OpenAI',         versions: 8  },
    { name: 'Claude',      company: 'Anthropic',       versions: 8  },
    { name: 'Gemini',      company: 'Google',          versions: 6  },
    { name: 'DeepSeek',    company: 'DeepSeek AI',     versions: 7  },
    { name: 'Perplexity',  company: 'Perplexity AI',   versions: 6  },
    { name: 'Groq',        company: 'Groq',            versions: 7  },
    { name: 'Mistral',     company: 'Mistral AI',      versions: 9  },
    { name: 'Grok',        company: 'xAI',             versions: 4  },
    { name: 'GLM',         company: 'ZhipuAI',         versions: 8  },
    { name: 'Qwen',        company: 'Alibaba',         versions: 8  },
    { name: 'Kimi',        company: 'Moonshot AI',     versions: 6  },
    { name: 'Hunyuan',     company: 'Tencent',         versions: 5  },
    { name: 'MiniMax',     company: 'MiniMax',         versions: 5  },
    { name: 'Meta AI',     company: 'Meta',            versions: 4  },
    { name: 'Copilot',     company: 'Microsoft',       versions: 4  },
    { name: 'Poe',         company: 'Quora',           versions: 4  },
    { name: 'Arena',       company: 'LMSys',           versions: 4  },
    { name: 'IBM WatsonX', company: 'IBM',             versions: 4  },
    { name: 'OLMo',        company: 'Allen AI',        versions: 5  },
    { name: 'Pi AI',       company: 'Inflection',      versions: 2  },
    { name: 'Coze',        company: 'ByteDance',       versions: 3  },
    { name: 'HuggingFace', company: 'HuggingFace',     versions: 4  },
    { name: 'Step AI',     company: 'StepFun',         versions: 5  },
    { name: 'Seed AI',     company: 'ByteDance',       versions: 4  },
    { name: 'Gemma',       company: 'Google',          versions: 6  },
    { name: 'Nova AI',     company: 'Nova AI',         versions: 3  },
    { name: 'Ring AI',     company: 'Ring AI',         versions: 3  },
    { name: 'Ling AI',     company: 'Ling AI',         versions: 3  },
    { name: 'Trinity AI',  company: 'Trinity',         versions: 3  },
    { name: 'Mercury AI',  company: 'Inception',       versions: 3  },
    { name: 'Intellect',   company: 'Prime Intellect', versions: 3  },
    { name: 'Dola AI',     company: 'Dola',            versions: 3  },
    { name: 'Max AI',      company: 'MaxAI',           versions: 4  },
    { name: 'Earnia AI',   company: 'Earnia',          versions: 3  },
    { name: 'LongChat',    company: 'LMSys',           versions: 3  },
    { name: 'MuseSpark',   company: 'MuseSpark',       versions: 3  },
    { name: 'Mimo AI',     company: 'Mimo',            versions: 3  }
  ];

  listEl.innerHTML = '';

  aiList.forEach(ai => {
    const item = document.createElement('div');
    item.className = 'ai-item';
    item.innerHTML = `
      <span class="ai-name">${ai.name}</span>
      <span class="ai-versions">${ai.versions} versions | ${ai.company}</span>
    `;
    listEl.appendChild(item);
  });
}

function showStatus(msg, type) {
  const el = document.getElementById('statusMsg');
  if (!el) return;
  el.textContent  = msg;
  el.className    = `status-msg ${type}`;
  setTimeout(() => {
    el.textContent = '';
    el.className   = 'status-msg';
  }, 3000);
}