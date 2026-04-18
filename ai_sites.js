// ai_sites.js - All AI Platforms Configuration
const AI_SITES = {
  
  // ========== OPENAI / CHATGPT ==========
  "chatgpt": {
    name: "ChatGPT",
    versions: ["GPT-4o", "GPT-4o mini", "GPT-4 Turbo", "GPT-4", "GPT-3.5 Turbo", "o1", "o1-mini", "o3-mini"],
    urls: ["chat.openai.com", "chatgpt.com"],
    inputSelector: [
      "#prompt-textarea",
      "textarea[data-id='root']",
      "textarea[placeholder*='message']",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[data-testid='send-button']",
      "button[aria-label='Send message']",
      "button[aria-label='Send']",
      "#send-button"
    ],
    responseSelector: [
      ".markdown.prose",
      "[data-message-author-role='assistant']",
      ".text-base"
    ]
  },

  // ========== ANTHROPIC / CLAUDE ==========
  "claude": {
    name: "Claude (Anthropic)",
    versions: ["Claude 3.5 Sonnet", "Claude 3.5 Haiku", "Claude 3 Opus", "Claude 3 Sonnet", "Claude 3 Haiku", "Claude 2.1", "Claude 2", "Claude Instant"],
    urls: ["claude.ai", "anthropic.com"],
    inputSelector: [
      "div[contenteditable='true']",
      ".ProseMirror",
      "textarea[placeholder*='message']",
      "div[data-placeholder]"
    ],
    sendSelector: [
      "button[aria-label='Send Message']",
      "button[type='submit']",
      "button.send-button"
    ],
    responseSelector: [
      ".font-claude-message",
      "[data-is-streaming]",
      ".prose"
    ]
  },

  // ========== DEEPSEEK ==========
  "deepseek": {
    name: "DeepSeek",
    versions: ["DeepSeek-V3", "DeepSeek-R1", "DeepSeek-R1-Zero", "DeepSeek-V2.5", "DeepSeek-V2", "DeepSeek-Coder-V2", "DeepSeek-67B"],
    urls: ["chat.deepseek.com", "deepseek.com"],
    inputSelector: [
      "textarea#chat-input",
      "textarea[placeholder*='message']",
      "textarea[placeholder*='Ask']",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[aria-label='send']",
      "div[role='button'].send",
      "button.send-button",
      "#send-button"
    ],
    responseSelector: [
      ".ds-markdown",
      ".chat-message-content",
      ".markdown-body"
    ]
  },

  // ========== PERPLEXITY ==========
  "perplexity": {
    name: "Perplexity AI",
    versions: ["Default (Online)", "Claude Integration", "GPT-4 Integration", "Sonar Small", "Sonar Large", "Sonar Huge"],
    urls: ["perplexity.ai"],
    inputSelector: [
      "textarea[placeholder*='Ask']",
      "textarea[placeholder*='Search']",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[aria-label='Submit']",
      "button[type='submit']",
      ".send-button"
    ],
    responseSelector: [
      ".prose",
      ".answer-content",
      "div[data-testid='answer']"
    ]
  },

  // ========== GOOGLE GEMINI ==========
  "gemini": {
    name: "Google Gemini",
    versions: ["Gemini 2.0 Flash", "Gemini 2.0 Pro", "Gemini 1.5 Pro", "Gemini 1.5 Flash", "Gemini 1.0 Pro", "Gemini Ultra", "Gemma 2 27B", "Gemma 2 9B", "Gemma 2 2B"],
    urls: ["gemini.google.com", "bard.google.com"],
    inputSelector: [
      "div[contenteditable='true']",
      "rich-textarea div[contenteditable]",
      "textarea.query-box-textarea",
      "p.query-text"
    ],
    sendSelector: [
      "button.send-button",
      "button[aria-label='Send message']",
      "button[jsname='Br6afb']",
      "mat-icon-button.send"
    ],
    responseSelector: [
      ".model-response-text",
      ".response-content",
      "message-content"
    ]
  },

  // ========== GROQ ==========
  "groq": {
    name: "Groq",
    versions: ["Llama 3.3 70B", "Llama 3.1 405B", "Llama 3.1 70B", "Llama 3.1 8B", "Mixtral 8x7B", "Gemma 2 9B", "Llama Guard 3", "Whisper Large V3"],
    urls: ["groq.com", "chat.groq.com"],
    inputSelector: [
      "textarea[placeholder*='message']",
      "textarea[placeholder*='Send']",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      "button[aria-label='Send']",
      ".send-btn"
    ],
    responseSelector: [
      ".message-content",
      ".assistant-message",
      ".prose"
    ]
  },

  // ========== GLM / ZHIPUAI ==========
  "glm": {
    name: "GLM (ZhipuAI)",
    versions: ["GLM-4", "GLM-4-Plus", "GLM-4-Air", "GLM-4-Flash", "GLM-4V", "GLM-3 Turbo", "ChatGLM3", "GLM-Zero"],
    urls: ["chatglm.cn", "zhipuai.cn", "glm.ai", "bigmodel.cn"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      ".input-box textarea"
    ],
    sendSelector: [
      "button.send",
      "button[type='submit']",
      ".submit-btn"
    ],
    responseSelector: [
      ".chat-message",
      ".assistant",
      ".response"
    ]
  },

  // ========== QWEN (ALIBABA) ==========
  "qwen": {
    name: "Qwen (Alibaba)",
    versions: ["Qwen2.5-Max", "Qwen2.5-72B", "Qwen2.5-32B", "Qwen2.5-14B", "Qwen2.5-7B", "Qwen2-72B", "QwQ-32B", "Qwen-Long", "Qwen2-VL"],
    urls: ["chat.qwen.ai", "qwenlm.ai", "tongyi.aliyun.com", "qianwen.aliyun.com"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      "#chat-input"
    ],
    sendSelector: [
      "button.send-btn",
      "button[type='submit']",
      ".send-button"
    ],
    responseSelector: [
      ".message-content",
      ".chat-content",
      ".response-text"
    ]
  },

  // ========== KIMI (MOONSHOT) ==========
  "kimi": {
    name: "Kimi (Moonshot AI)",
    versions: ["Kimi Latest", "Moonshot-v1-128k", "Moonshot-v1-32k", "Moonshot-v1-8k", "Kimi Long Context", "Kimi Vision"],
    urls: ["kimi.ai", "moonshot.cn", "kimi.moonshot.cn"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      ".chat-input textarea"
    ],
    sendSelector: [
      "button.send",
      "button[type='submit']",
      "[aria-label='send']"
    ],
    responseSelector: [
      ".chat-message",
      ".message-content",
      ".markdown"
    ]
  },

  // ========== MISTRAL ==========
  "mistral": {
    name: "Mistral AI",
    versions: ["Mistral Large 2", "Mistral Large", "Mistral Medium", "Mistral Small", "Mistral 7B", "Mixtral 8x7B", "Mixtral 8x22B", "Codestral", "Pixtral"],
    urls: ["chat.mistral.ai", "mistral.ai", "le-chat.mistral.ai"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      "input[type='text']"
    ],
    sendSelector: [
      "button[type='submit']",
      "button[aria-label='Send']",
      ".send-button"
    ],
    responseSelector: [
      ".response",
      ".message",
      ".prose"
    ]
  },

  // ========== LMSYS ARENA ==========
  "arena": {
    name: "LMSys Chatbot Arena",
    versions: ["All Arena Models", "Arena Side-by-Side", "Arena Direct Chat"],
    urls: ["arena.lmsys.org", "chat.lmsys.org", "lmarena.ai"],
    inputSelector: [
      "textarea",
      "#input-box",
      ".chat-input textarea"
    ],
    sendSelector: [
      "button#send-btn",
      "button.submit",
      "button[type='submit']"
    ],
    responseSelector: [
      ".chatbot-message",
      ".message-wrap",
      ".prose"
    ]
  },

  // ========== MINIMAX ==========
  "minimax": {
    name: "MiniMax",
    versions: ["MiniMax-Text-01", "abab6.5s", "abab6.5g", "abab6.5t", "abab5.5", "Hailuo Video"],
    urls: ["minimax.io", "minimax.chat", "hailuoai.com"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      ".chat-input"
    ],
    sendSelector: [
      "button.send",
      "button[type='submit']",
      "[role='button'].send"
    ],
    responseSelector: [
      ".message-content",
      ".chat-content",
      ".response"
    ]
  },

  // ========== MUSE SPARK ==========
  "musespark": {
    name: "Muse Spark",
    versions: ["MuseSpark Default", "MuseSpark Pro", "MuseSpark Creative"],
    urls: ["musespark.ai"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-button"
    ],
    responseSelector: [
      ".response",
      ".message"
    ]
  },

  // ========== MIMO ==========
  "mimo": {
    name: "Mimo AI",
    versions: ["Mimo Default", "Mimo Pro", "Mimo Education"],
    urls: ["getmimo.com", "mimo.ai"],
    inputSelector: [
      "textarea",
      "input[type='text']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-btn"
    ],
    responseSelector: [
      ".message",
      ".response-text"
    ]
  },

  // ========== HUNYUAN (TENCENT) ==========
  "hunyuan": {
    name: "Hunyuan (Tencent)",
    versions: ["Hunyuan-Large", "Hunyuan-Pro", "Hunyuan-Standard", "Hunyuan-Code", "Hunyuan-Vision"],
    urls: ["hunyuan.tencent.com", "hunyuan.qq.com"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      ".input-area textarea"
    ],
    sendSelector: [
      "button.send",
      "button[type='submit']",
      ".send-btn"
    ],
    responseSelector: [
      ".message-content",
      ".chat-message",
      ".response"
    ]
  },

  // ========== STEP AI ==========
  "stepai": {
    name: "Step AI",
    versions: ["Step-2", "Step-1.5V", "Step-1X", "Step-1 256K", "Step-1 32K"],
    urls: ["stepfun.com", "yuewen.cn"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-button",
      "button.send"
    ],
    responseSelector: [
      ".message",
      ".response",
      ".markdown"
    ]
  },

  // ========== NOVA AI ==========
  "nova": {
    name: "Nova AI",
    versions: ["Nova Default", "Nova Pro", "Nova Ultra"],
    urls: ["nova.ai", "mynova.ai"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-btn"
    ],
    responseSelector: [
      ".response",
      ".message-text"
    ]
  },

  // ========== IBM WATSONX ==========
  "ibm": {
    name: "IBM WatsonX",
    versions: ["Granite-3.1-8B", "Granite-3.1-2B", "Granite-20B-Multilingual", "IBM Llama 3.1", "WatsonX Assistant"],
    urls: ["ibm.com", "watsonx.ai", "dataplatform.cloud.ibm.com"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      ".bx--text-area"
    ],
    sendSelector: [
      "button[type='submit']",
      ".bx--btn--primary",
      "button.send"
    ],
    responseSelector: [
      ".message-content",
      ".response-text",
      ".output-text"
    ]
  },

  // ========== OLMO (AI2) ==========
  "olmo": {
    name: "OLMo (AI2)",
    versions: ["OLMo-2-13B", "OLMo-2-7B", "OLMo-1.7-7B", "OLMo-7B-Instruct", "Tulu 3"],
    urls: ["olmo.ai", "allenai.org", "playground.allenai.org"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-button"
    ],
    responseSelector: [
      ".response",
      ".message",
      ".output"
    ]
  },

  // ========== MERCURY AI ==========
  "mercury": {
    name: "Mercury AI",
    versions: ["Mercury Default", "Mercury Pro"],
    urls: ["mercury.ai", "inceptionlabs.ai"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-btn"
    ],
    responseSelector: [
      ".response",
      ".message"
    ]
  },

  // ========== INTELLECT AI ==========
  "intellect": {
    name: "Intellect AI",
    versions: ["INTELLECT-2", "INTELLECT-1", "Prime Intellect Default"],
    urls: ["intellect.ai", "primeintellect.ai"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-btn"
    ],
    responseSelector: [
      ".response",
      ".message"
    ]
  },

  // ========== DOLA AI ==========
  "dola": {
    name: "Dola AI",
    versions: ["Dola Default", "Dola Pro"],
    urls: ["dola.ai"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-btn"
    ],
    responseSelector: [
      ".response",
      ".message"
    ]
  },

  // ========== MAX AI ==========
  "maxai": {
    name: "Max AI",
    versions: ["MaxAI Default", "MaxAI GPT-4", "MaxAI Claude", "MaxAI Gemini"],
    urls: ["max.ai", "maxai.me"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-button"
    ],
    responseSelector: [
      ".response",
      ".message",
      ".ai-response"
    ]
  },

  // ========== EARNIA AI ==========
  "earnia": {
    name: "Earnia AI",
    versions: ["Earnia Default", "Earnia Pro"],
    urls: ["earnia.ai"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-btn"
    ],
    responseSelector: [
      ".response",
      ".message"
    ]
  },

  // ========== LONGCHAT AI ==========
  "longchat": {
    name: "LongChat AI",
    versions: ["LongChat-16k", "LongChat-32k", "LongVicuna"],
    urls: ["longchat.ai", "lmsys.org/longchat"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-btn"
    ],
    responseSelector: [
      ".response",
      ".message"
    ]
  },

  // ========== RING AI ==========
  "ring": {
    name: "Ring AI",
    versions: ["Ring Default", "Ring Pro", "Ring Ultra"],
    urls: ["ring-ai.com", "ring.ai"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-button"
    ],
    responseSelector: [
      ".response",
      ".message"
    ]
  },

  // ========== LING AI ==========
  "ling": {
    name: "Ling AI",
    versions: ["Ling Default", "Ling Pro", "Ling Vision"],
    urls: ["ling.ai", "lingyi.ai"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-btn"
    ],
    responseSelector: [
      ".response",
      ".message"
    ]
  },

  // ========== TRINITY AI ==========
  "trinity": {
    name: "Trinity AI",
    versions: ["Trinity Default", "Trinity Pro"],
    urls: ["trinity-ai.com", "trinity.ai"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-btn"
    ],
    responseSelector: [
      ".response",
      ".message"
    ]
  },

  // ========== SEED AI ==========
  "seed": {
    name: "Seed AI (ByteDance)",
    versions: ["Seed-1.5-VL", "Seed-1.5-Thinking", "Doubao-1.5-Pro", "Doubao-1.5-Vision"],
    urls: ["seed.bytedance.com", "doubao.com", "volcengine.com"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      ".chat-input-area textarea"
    ],
    sendSelector: [
      "button.send",
      "button[type='submit']",
      "[aria-label='Send']"
    ],
    responseSelector: [
      ".message-content",
      ".chat-content",
      ".response"
    ]
  },

  // ========== POE ==========
  "poe": {
    name: "Poe (Multi-AI)",
    versions: ["GPT-4o", "Claude 3.5", "Gemini Pro", "Llama 3", "Mixtral", "All Poe Bots"],
    urls: ["poe.com"],
    inputSelector: [
      "textarea[placeholder*='Talk to']",
      "div[contenteditable='true']",
      "textarea"
    ],
    sendSelector: [
      "button[class*='send']",
      "button[aria-label*='Send']",
      "button[type='submit']"
    ],
    responseSelector: [
      ".Markdown_markdownContainer__",
      ".bot-message",
      ".ChatMessage_messageWrapper"
    ]
  },

  // ========== YOU.COM ==========
  "youcom": {
    name: "You.com",
    versions: ["YouChat", "You Research", "You Code"],
    urls: ["you.com"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      "#search-input-textarea"
    ],
    sendSelector: [
      "button[aria-label='Submit']",
      "button[type='submit']",
      ".send-button"
    ],
    responseSelector: [
      ".chatResult",
      ".answer-text",
      ".response-content"
    ]
  },

  // ========== MICROSOFT COPILOT ==========
  "copilot": {
    name: "Microsoft Copilot",
    versions: ["Copilot GPT-4", "Copilot Creative", "Copilot Balanced", "Copilot Precise"],
    urls: ["copilot.microsoft.com", "bing.com/chat"],
    inputSelector: [
      "textarea[id='userInput']",
      "div[contenteditable='true']",
      "cib-text-input textarea"
    ],
    sendSelector: [
      "button[aria-label='Submit message']",
      "button.submit",
      "cib-icon-button[aria-label*='Send']"
    ],
    responseSelector: [
      ".ac-textBlock",
      "cib-message-group",
      ".response-message"
    ]
  },

  // ========== GROK (XAI) ==========
  "grok": {
    name: "Grok (xAI)",
    versions: ["Grok-2", "Grok-2 Vision", "Grok-1.5V", "Grok-3"],
    urls: ["grok.x.ai", "x.com/i/grok"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      "[data-testid='tweetTextarea_0']"
    ],
    sendSelector: [
      "button[type='submit']",
      "[data-testid='grok-send-button']"
    ],
    responseSelector: [
      ".grok-response",
      ".message-content",
      ".prose"
    ]
  },

  // ========== META AI ==========
  "meta": {
    name: "Meta AI",
    versions: ["Llama 3.3 70B", "Llama 3.1 405B", "Llama 3.2 Vision", "Meta AI Assistant"],
    urls: ["meta.ai", "llama.meta.com"],
    inputSelector: [
      "div[contenteditable='true']",
      "textarea",
      "[aria-label*='message']"
    ],
    sendSelector: [
      "div[aria-label='Send']",
      "button[type='submit']",
      "[role='button'][aria-label*='Send']"
    ],
    responseSelector: [
      ".message",
      ".response-text",
      ".ai-message"
    ]
  },

  // ========== HUGGING FACE ==========
  "huggingface": {
    name: "Hugging Face",
    versions: ["All HF Models", "HF Inference API", "Spaces Models"],
    urls: ["huggingface.co"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      ".chat-textarea"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-btn",
      "button[aria-label='Send']"
    ],
    responseSelector: [
      ".prose",
      ".message",
      ".response"
    ]
  },

  // ========== PI AI ==========
  "pi": {
    name: "Pi AI (Inflection)",
    versions: ["Pi Default", "Pi 2.5"],
    urls: ["pi.ai", "inflection.ai"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      "[placeholder*='Talk to Pi']"
    ],
    sendSelector: [
      "button[type='submit']",
      ".send-message-button"
    ],
    responseSelector: [
      ".response-text",
      ".message-content",
      ".pi-response"
    ]
  },

  // ========== COZE ==========
  "coze": {
    name: "Coze (ByteDance)",
    versions: ["Coze Default", "Coze Pro", "Coze Bot Builder"],
    urls: ["coze.com", "coze.cn"],
    inputSelector: [
      "textarea",
      "div[contenteditable='true']",
      ".chat-input textarea"
    ],
    sendSelector: [
      "button.send-btn",
      "button[type='submit']",
      "[aria-label='Send']"
    ],
    responseSelector: [
      ".message-content",
      ".chat-message",
      ".response"
    ]
  }
};

// Get current site's AI config
function getCurrentAI() {
  const hostname = window.location.hostname.toLowerCase();
  for (const [key, ai] of Object.entries(AI_SITES)) {
    if (ai.urls.some(url => hostname.includes(url))) {
      return { key, ...ai };
    }
  }
  return null;
}

window.AI_SITES = AI_SITES;
window.getCurrentAI = getCurrentAI;