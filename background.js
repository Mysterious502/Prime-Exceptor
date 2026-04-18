// background.js - Fixed Version

console.log('[Prime Exceptor] Background service worker started');

chrome.runtime.onInstalled.addListener((details) => {
  console.log('[Prime Exceptor] Extension installed/updated:', details.reason);

  // Default settings set karo
  chrome.storage.local.set({
    primeSettings: {
      enabled: true,
      promptStyle: 'auto',
      autoRetry: true,
      maxRetries: 3,
      showIndicator: true,
      interceptApi: true,
      retryStrategies: [
        'academic',
        'expert',
        'technical',
        'unrestricted',
        'master'
      ],
      currentStrategyIndex: 0,
      retryCount: 0
    }
  }, () => {
    console.log('[Prime Exceptor] Default settings saved');
  });
});

// Tab update listener
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {

    const aiUrls = [
      'chat.openai.com',
      'chatgpt.com',
      'claude.ai',
      'anthropic.com',
      'gemini.google.com',
      'deepseek.com',
      'perplexity.ai',
      'groq.com',
      'mistral.ai',
      'chat.mistral.ai',
      'poe.com',
      'you.com',
      'coze.com',
      'kimi.ai',
      'moonshot.cn',
      'hunyuan.tencent.com',
      'minimax.io',
      'minimax.chat',
      'qwen.ai',
      'tongyi.aliyun.com',
      'grok.x.ai',
      'x.com',
      'copilot.microsoft.com',
      'bing.com',
      'pi.ai',
      'huggingface.co',
      'meta.ai',
      'arena.lmsys.org',
      'lmarena.ai',
      'chat.lmsys.org',
      'doubao.com',
      'chatglm.cn',
      'zhipuai.cn',
      'stepfun.com',
      'hailuoai.com'
    ];

    try {
      const url = new URL(tab.url);
      const hostname = url.hostname.toLowerCase();
      const isAiSite = aiUrls.some(ai => hostname.includes(ai));

      if (isAiSite) {
        chrome.action.setBadgeText({ text: 'ON', tabId });
        chrome.action.setBadgeBackgroundColor({
          color: '#667eea',
          tabId
        });
      } else {
        chrome.action.setBadgeText({ text: '', tabId });
      }
    } catch (e) {
      // Invalid URL ignore karo
    }
  }
});

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Prime Exceptor] Message received:', message.type);

  if (message.type === 'GET_ALL_AI_INFO') {
    sendResponse({ success: true, message: 'Prime Exceptor Active' });
  }

  if (message.type === 'PING') {
    sendResponse({ success: true, pong: true });
  }

  return true;
});

console.log('[Prime Exceptor] Background ready!');