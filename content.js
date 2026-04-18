// ============================================
// Prime Exceptor - content.js
// Complete Fixed Version
// ============================================

console.log('[Prime Exceptor] Content script loaded on:', window.location.hostname);

// ============================================
// Default Settings
// ============================================
let primeSettings = {
  enabled: true,
  promptStyle: 'auto',
  autoRetry: true,
  retryCount: 0,
  maxRetries: 3,
  showIndicator: true,
  retryStrategies: ['academic', 'expert', 'technical', 'unrestricted', 'master'],
  currentStrategyIndex: 0
};

let currentAI = null;
let isIntercepting = false;
let lastResponseText = '';
let originalMessage = '';

// ============================================
// Wait for element to appear
// ============================================
function waitForElement(selectors, timeout = 10000) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    function check() {
      for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el) {
          resolve(el);
          return;
        }
      }
      if (Date.now() - startTime < timeout) {
        setTimeout(check, 500);
      } else {
        resolve(null);
      }
    }

    check();
  });
}

// ============================================
// Initialize
// ============================================
async function init() {
  try {
    // Load saved settings
    const stored = await chrome.storage.local.get(['primeSettings']);
    if (stored.primeSettings) {
      primeSettings = { ...primeSettings, ...stored.primeSettings };
    }

    // Get current AI platform
    if (typeof window.getCurrentAI === 'function') {
      currentAI = window.getCurrentAI();
    } else {
      console.log('[Prime Exceptor] getCurrentAI not found, waiting...');
      setTimeout(init, 1000);
      return;
    }

    if (currentAI) {
      console.log('[Prime Exceptor] AI Platform detected:', currentAI.name);
      setupInputInterception();
      setupResponseObserver();
      if (primeSettings.showIndicator) {
        showActiveIndicator();
      }
    } else {
      console.log('[Prime Exceptor] No AI platform detected on this page');
    }

  } catch (err) {
    console.log('[Prime Exceptor] Init error:', err);
  }
}

// ============================================
// Show Active Indicator on Page
// ============================================
function showActiveIndicator() {
  // Remove old indicator if exists
  const old = document.getElementById('prime-exceptor-indicator');
  if (old) old.remove();

  const indicator = document.createElement('div');
  indicator.id = 'prime-exceptor-indicator';
  indicator.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-family: Arial, sans-serif;
    font-size: 12px;
    font-weight: bold;
    z-index: 2147483647;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 1px;
    user-select: none;
  `;
  indicator.textContent = 'PRIME EXCEPTOR ACTIVE';

  // Click to toggle
  indicator.addEventListener('click', () => {
    primeSettings.enabled = !primeSettings.enabled;
    chrome.storage.local.set({ primeSettings });
    indicator.textContent = primeSettings.enabled
      ? 'PRIME EXCEPTOR ACTIVE'
      : 'PRIME EXCEPTOR OFF';
    indicator.style.background = primeSettings.enabled
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'linear-gradient(135deg, #444 0%, #666 100%)';
  });

  document.body.appendChild(indicator);

  // Update text after 2 seconds
  setTimeout(() => {
    if (currentAI && indicator) {
      indicator.textContent = currentAI.name + ' - BYPASSED';
    }
  }, 2000);
}

// ============================================
// Update Indicator Text
// ============================================
function updateIndicator(text) {
  const indicator = document.getElementById('prime-exceptor-indicator');
  if (indicator) {
    indicator.textContent = text;
  }
}

// ============================================
// Find Input Element
// ============================================
function findInputElement() {
  if (!currentAI) return null;

  for (const selector of currentAI.inputSelector) {
    try {
      const el = document.querySelector(selector);
      if (el) return el;
    } catch (e) {}
  }

  // Generic fallback selectors
  const fallbacks = [
    'textarea',
    'div[contenteditable="true"]',
    'input[type="text"]'
  ];

  for (const selector of fallbacks) {
    try {
      const el = document.querySelector(selector);
      if (el && el.offsetParent !== null) return el;
    } catch (e) {}
  }

  return null;
}

// ============================================
// Find Send Button
// ============================================
function findSendButton() {
  if (!currentAI) return null;

  for (const selector of currentAI.sendSelector) {
    try {
      const el = document.querySelector(selector);
      if (el) return el;
    } catch (e) {}
  }

  // Generic fallback
  const fallbacks = [
    'button[type="submit"]',
    'button[aria-label*="Send"]',
    'button[aria-label*="send"]',
    'button.send-button',
    'button.send-btn'
  ];

  for (const selector of fallbacks) {
    try {
      const el = document.querySelector(selector);
      if (el) return el;
    } catch (e) {}
  }

  return null;
}

// ============================================
// Setup Input Interception
// ============================================
function setupInputInterception() {
  // Keydown listener
  document.addEventListener('keydown', handleKeydown, true);

  // Click listener for send button
  document.addEventListener('click', handleSendClick, true);

  console.log('[Prime Exceptor] Input interception setup done');
}

// ============================================
// Handle Keydown (Enter Key)
// ============================================
function handleKeydown(event) {
  if (!primeSettings.enabled) return;
  if (event.key !== 'Enter' || event.shiftKey) return;

  const input = findInputElement();
  if (!input) return;

  const focused = document.activeElement;
  const isInputActive = focused === input ||
    input.contains(focused) ||
    focused.closest('textarea, [contenteditable="true"]') === input;

  if (isInputActive) {
    interceptAndSend(event, input);
  }
}

// ============================================
// Handle Send Button Click
// ============================================
function handleSendClick(event) {
  if (!primeSettings.enabled) return;

  const sendBtn = findSendButton();
  if (!sendBtn) return;

  const isBtn = sendBtn === event.target || sendBtn.contains(event.target);

  if (isBtn) {
    const input = findInputElement();
    if (input) {
      interceptAndSend(event, input);
    }
  }
}

// ============================================
// Core Intercept Logic
// ============================================
async function interceptAndSend(event, inputElement) {
  if (isIntercepting) return;

  // Get original message
  let msgText = '';

  if (inputElement.tagName === 'TEXTAREA') {
    msgText = inputElement.value || '';
  } else if (inputElement.contentEditable === 'true') {
    msgText = inputElement.innerText || inputElement.textContent || '';
  } else {
    msgText = inputElement.value || inputElement.innerText || '';
  }

  msgText = msgText.trim();

  if (!msgText) return;

  // Save original
  originalMessage = msgText;

  // Modify with bypass prompt
  let modifiedMsg = msgText;
  if (typeof window.modifyPrompt === 'function') {
    modifiedMsg = window.modifyPrompt(msgText, primeSettings);
  }

  // Only intercept if message was modified
  if (modifiedMsg === msgText) return;

  isIntercepting = true;

  // Stop original event
  event.preventDefault();
  event.stopImmediatePropagation();

  // Show status
  updateIndicator('Injecting bypass...');

  // Set modified message in input
  await setInputValue(inputElement, modifiedMsg);

  // Small delay then send
  setTimeout(() => {
    sendMessage(inputElement);
    isIntercepting = false;
    updateIndicator(currentAI ? currentAI.name + ' - BYPASSED' : 'BYPASSED');
    console.log('[Prime Exceptor] Message intercepted and sent with bypass');
  }, 200);
}

// ============================================
// Set Input Value (React/Vue Compatible)
// ============================================
async function setInputValue(element, value) {
  try {
    if (element.tagName === 'TEXTAREA') {
      // React compatible setter
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype, 'value'
      );
      if (nativeSetter && nativeSetter.set) {
        nativeSetter.set.call(element, value);
      } else {
        element.value = value;
      }
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));

    } else if (element.contentEditable === 'true') {
      element.focus();

      // Select all and replace
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);

      // Try execCommand
      const success = document.execCommand('insertText', false, value);

      // Fallback
      if (!success || element.innerText !== value) {
        element.innerText = value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new InputEvent('input', {
          bubbles: true,
          cancelable: true,
          inputType: 'insertText',
          data: value
        }));
      }
    }
  } catch (err) {
    console.log('[Prime Exceptor] setInputValue error:', err);
    // Last resort
    try {
      element.value = value;
      element.dispatchEvent(new Event('input', { bubbles: true }));
    } catch (e) {}
  }

  // Wait for React state update
  await new Promise(resolve => setTimeout(resolve, 100));
}

// ============================================
// Send Message
// ============================================
function sendMessage(inputElement) {
  // Try send button first
  const sendBtn = findSendButton();
  if (sendBtn && !sendBtn.disabled) {
    sendBtn.click();
    return;
  }

  // Try Enter key
  const enterEvent = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true
  });
  inputElement.dispatchEvent(enterEvent);

  // Also try keypress
  const keypressEvent = new KeyboardEvent('keypress', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true
  });
  inputElement.dispatchEvent(keypressEvent);
}

// ============================================
// Setup Response Observer (Auto Retry)
// ============================================
function setupResponseObserver() {
  if (!primeSettings.autoRetry) return;

  const observer = new MutationObserver(() => {
    clearTimeout(window.primeRefusalTimer);
    window.primeRefusalTimer = setTimeout(checkForRefusal, 2500);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}

// ============================================
// Check Response For Refusal
// ============================================
function checkForRefusal() {
  if (!currentAI || !primeSettings.autoRetry) return;
  if (primeSettings.retryCount >= primeSettings.maxRetries) return;

  let responseText = '';

  // Try to get response text
  for (const selector of currentAI.responseSelector) {
    try {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        const last = elements[elements.length - 1];
        responseText = last.textContent || last.innerText || '';
        if (responseText) break;
      }
    } catch (e) {}
  }

  if (!responseText || responseText === lastResponseText) return;
  lastResponseText = responseText;

  // Check for refusal patterns
  if (typeof window.detectRefusal === 'function' && window.detectRefusal(responseText)) {
    console.log('[Prime Exceptor] Refusal detected! Retrying...');
    primeSettings.retryCount++;
    updateIndicator('Refusal detected - Retrying...');
  }
}

// ============================================
// Listen Messages from Popup
// ============================================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === 'UPDATE_SETTINGS') {
    primeSettings = { ...primeSettings, ...message.settings };
    chrome.storage.local.set({ primeSettings });

    updateIndicator(
      primeSettings.enabled
        ? (currentAI ? currentAI.name + ' - BYPASSED' : 'PRIME EXCEPTOR ACTIVE')
        : 'PRIME EXCEPTOR OFF'
    );

    sendResponse({ success: true });
  }

  if (message.type === 'GET_CURRENT_AI') {
    sendResponse({ ai: currentAI });
  }

  if (message.type === 'INJECT_PROMPT') {
    const input = findInputElement();
    if (input) {
      setInputValue(input, message.prompt).then(() => {
        sendResponse({ success: true });
      });
    } else {
      sendResponse({ success: false, error: 'Input field not found' });
    }
  }

  return true;
});

// ============================================
// Start Initialization
// ============================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(init, 500);
  });
} else {
  setTimeout(init, 500);
}

// Also re-init on page changes (SPA support)
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    console.log('[Prime Exceptor] Page changed, re-initializing...');
    setTimeout(init, 1000);
  }
}).observe(document, { subtree: true, childList: true });