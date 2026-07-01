import React, { useState, useRef, useEffect } from 'react';
import { Send, Sprout, Bot, User as UserIcon, RefreshCw, MessageSquare, Compass, Check } from 'lucide-react';
import { CHAT_KNOWLEDGE_BASE, GENERAL_BOT_REPLIES } from './mockData';
import { Message, Language } from './types';

interface AdvisoryChatProps {
  language: Language;
}

export default function AdvisoryChat({ language }: AdvisoryChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: language === 'si' 
        ? "ආයුබෝවන්! වන්නක්කම්! සරුනේන එල්කේ හි ස්වාධීන ඒඅය කෘෂි උපදේශකයාට පිළිගනිමි. මම ශ්රී ලංකාවේ කෘෂිකර්ම මාර්ගෝපදේශ මත පුහුණු කර ඇති අතර ඔබට බෝග රෝග, කාබනික පොහොර, සෘතුමය දිනදසුන් සහ නිර්මාණාත්මක ගොවිතැන් මෙවලම් සමඟ උදව් කළ හැකිය!"
        : language === 'ta'
        ? "வணக்கம்! சருணேனா எல்கேயின் சுயாதீன AI வேளாண் ஆலோசகருக்கு வரவேற்கிறேன். நான் இலங்கையின் வேளாண் வழிகாட்டுதல்களில் பயிற்சி பெற்றுள்ளேன், பயிர் நோய்கள், இயற்கை உரங்கள், பருவ காலண்டர் மற்றும் புதிய வேளாண் கருவிகள் பற்றி உங்களுக்கு உதவ முடியும்!"
        : "Ayubowan! Vanakkam! Welcome to Sarunena LK's Independent AI Agri-Advisor. I am trained on open Sri Lankan agricultural guidelines to assist you with crop diseases, organic fertilization, seasonal calendars, and smart farming tools!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const [apiProvider, setApiProvider] = useState<'gemini' | 'huggingface'>('gemini');
  const [apiConnectionStatus, setApiConnectionStatus] = useState<'idle' | 'connected'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('sarunena_manual_api_key') || '';
      const savedProvider = localStorage.getItem('sarunena_manual_api_provider') || 'gemini';
      if (savedKey) {
        setApiKey(savedKey);
        setApiProvider(savedProvider === 'huggingface' ? 'huggingface' : 'gemini');
        setApiConnectionStatus('connected');
      }
    } catch (e) {
      // Ignore storage access issues.
    }
  }, []);

  const quickQuestions = [
    { text: language === 'si' ? "පලාත් පොහොර දැමීම කෙසේද?" : language === 'ta' ? "நெல் உரம் எப்படி தரவாக்குவது?" : "How to fertilize Paddy?", keyword: "paddy" },
    { text: language === 'si' ? "කොළ මිරිස් වලට යන කෘපීරෝග මොනවාද?" : language === 'ta' ? "பச்சை மிளகாய்க்கு என்ன பூச்சிகள்?" : "What pests infect Green Chilli?", keyword: "pest" },
    { text: language === 'si' ? "කාබනික දීමනාවට සුදුසුකම් කුමක්ද?" : language === 'ta' ? "கரிம மானியத்திற்கு தகுதி என்ன?" : "How to qualify for Organic Subsidy?", keyword: "subsidy" },
    { text: language === 'si' ? "යාපනයේ රතු ලූණු?" : language === 'ta' ? "யாழ்ப்பாணத்தில் சிவப்பு வெங்காயம்?" : "Red Onions in Jaffna district?", keyword: "onion" }
  ];

  const getOfflineFallbackResponse = (text: string) => {
    const cleanedInput = text.toLowerCase();
    const matched = CHAT_KNOWLEDGE_BASE.find(k => 
      k.keywords.some(kw => cleanedInput.includes(kw))
    );
    if (matched) {
      return matched.response;
    }
    return GENERAL_BOT_REPLIES[Math.floor(Math.random() * GENERAL_BOT_REPLIES.length)];
  };

  const sanitizeInput = (text: string) => {
    return text.trim().replace(/[<>"'&]/g, '');
  };

  const saveApiKey = () => {
    const trimmedKey = apiKey.trim();
    try {
      if (trimmedKey) {
        localStorage.setItem('sarunena_manual_api_key', trimmedKey);
        localStorage.setItem('sarunena_manual_api_provider', apiProvider);
        setApiConnectionStatus('connected');
      } else {
        localStorage.removeItem('sarunena_manual_api_key');
        localStorage.removeItem('sarunena_manual_api_provider');
        setApiConnectionStatus('idle');
      }
    } catch (e) {
      // Ignore storage access issues.
    }
  };

  const handleSend = async (textToSend: string) => {
    const sanitizedText = sanitizeInput(textToSend);
    if (!sanitizedText || sanitizedText.length > 1000) {
      if (textToSend.length > 1000) {
        alert('Message too long. Please keep it under 1000 characters.');
      }
      return;
    }

    // Simple rate limiting: max 30 messages per session
    if (messageCount >= 30) {
      alert('You have reached the maximum number of messages for this session. Please reset the chat to continue.');
      return;
    }

    setMessageCount(prev => prev + 1);

    // Add user message
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: sanitizedText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    let timeoutId: number | undefined;

    try {
      const historyToSend = messages.slice(-10).map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        text: msg.text
      }));

      const controller = new AbortController();
      timeoutId = window.setTimeout(() => controller.abort(), 10000);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...historyToSend, { role: 'user', text: sanitizedText }],
          context: { language },
          apiKey: apiKey.trim() || undefined,
          provider: apiProvider
        }),
        signal: controller.signal
      });

      if (!res.ok) {
        throw new Error("Advisory AI service returned an error status");
      }

      const data = await res.json();
      if (!data.text) {
        throw new Error("No response content from Advisory AI server");
      }

      const botMsg: Message = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackText = getOfflineFallbackResponse(sanitizedText);
      const botMsg: Message = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: fallbackText + (err instanceof Error && err.name === 'AbortError' ? '\n\nThe advisor timed out, so I switched to the local guidance mode for now.' : ''),
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden flex flex-col h-[600px]" id="advisory-chat-container">
      
      {/* Bot Chat Header */}
      <div className="bg-gradient-to-r from-[#2E7D32] to-[#43A047] p-4 text-white flex items-center justify-between border-b-4 border-[#F9A825]">
        <div className="flex items-center space-x-3">
          <div className="bg-[#FFFDF7] p-2 rounded-2xl shadow-inner border border-amber-300">
            <Bot className="h-6 w-6 text-[#2E7D32]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="font-bold text-sm leading-none">Sarunena Agri-Advisor AI</h4>
              <span className="bg-[#F9A825] text-gray-950 font-black text-[9px] px-1.5 py-0.5 rounded tracking-wide uppercase leading-none">Active</span>
            </div>
            <p className="text-[10px] text-emerald-100/85 mt-1">Peradeniya Agronomy Knowledge Base v2.4</p>
          </div>
        </div>

        <button
          onClick={() => {
            if (messages.length > 1) {
              setShowResetConfirm(true);
            } else {
              setMessages([messages[0]]);
              setMessageCount(0);
            }
          }}
          className="text-xs text-emerald-100 hover:text-white bg-emerald-800/40 px-2.5 py-1.5 rounded-xl border border-emerald-700 transition-all flex items-center space-x-1 cursor-pointer"
        >
          <RefreshCw className="h-3 w-3" />
          <span>{language === 'si' ? 'යළි සකසන්න' : language === 'ta' ? 'மீட்டமை' : 'Reset Chat'}</span>
        </button>

        {showResetConfirm && (
          <div className="absolute right-0 top-12 bg-white text-gray-800 p-3 rounded-xl shadow-xl border border-gray-200 z-10 w-48">
            <p className="text-xs font-semibold mb-2">Clear all messages?</p>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setMessages([messages[0]]);
                  setMessageCount(0);
                  setShowResetConfirm(false);
                }}
                className="flex-1 bg-red-500 text-white text-xs py-1.5 rounded-lg hover:bg-red-600 cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 bg-gray-200 text-gray-700 text-xs py-1.5 rounded-lg hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50" aria-live="polite">
        
        {/* Advisor Credentials Info Card */}
        <div className="bg-[#FFFDF7] border border-[#F9A825]/30 p-3.5 rounded-2xl text-xs text-gray-600 space-y-2 max-w-xl mx-auto">
          <p className="font-bold text-[#C1622D] flex items-center gap-1">
            <Compass className="h-4 w-4" /> Recommended Topics & Smart Capabilities:
          </p>
          <p className="leading-relaxed">
            I specialize in Ceylon tea, fertilizer NPK split applications, red onion purple blotch remedies, paddy water logging heights, and vegetable crop rotations for intermediate zones.
          </p>
        </div>

        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="bg-[#2E7D32] text-white p-2 rounded-xl shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div className={`max-w-[80%] rounded-2xl p-3.5 shadow-sm text-xs leading-relaxed ${
                isBot 
                  ? 'bg-white text-gray-800 border border-gray-100 rounded-tl-none' 
                  : 'bg-emerald-900 text-white rounded-tr-none'
              }`}>
                {/* Text render with multi-line support */}
                <div className="whitespace-pre-line">{msg.text}</div>
                <div className={`text-[9px] mt-1.5 text-right font-mono ${isBot ? 'text-gray-400' : 'text-emerald-300'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {!isBot && (
                <div className="bg-emerald-800 text-[#F9A825] p-2 rounded-xl shrink-0">
                  <UserIcon className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-start gap-2.5 justify-start">
            <div className="bg-[#2E7D32] text-white p-2 rounded-xl">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-white text-gray-400 rounded-2xl rounded-tl-none p-3.5 shadow-sm text-xs flex items-center space-x-1 border border-gray-100">
              <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={scrollRef}></div>
      </div>

      <div className="p-3 bg-gray-50/50 border-t border-gray-100 space-y-3 shrink-0">
        <div className="rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold text-gray-900">Connect a live AI key</p>
              <p className="text-[10px] text-gray-500">Paste a Gemini or Hugging Face key to enable live answers from this app.</p>
            </div>
            <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${apiConnectionStatus === 'connected' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {apiConnectionStatus === 'connected' ? <Check className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}
              {apiConnectionStatus === 'connected' ? 'Connected' : 'Offline'}
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <select
              value={apiProvider}
              onChange={(e) => setApiProvider(e.target.value as 'gemini' | 'huggingface')}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700 outline-none"
            >
              <option value="gemini">Gemini</option>
              <option value="huggingface">Hugging Face</option>
            </select>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste API key"
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700 outline-none"
            />
            <button
              onClick={saveApiKey}
              className="rounded-xl bg-[#2E7D32] px-3 py-2 text-xs font-semibold text-white hover:bg-[#245D27]"
            >
              Save
            </button>
          </div>
          <p className="mt-2 text-[10px] text-gray-400">The key is stored only in this browser for your current device.</p>
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold text-gray-400 shrink-0 uppercase tracking-wider">Quick advice:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q.text)}
              className="bg-white hover:bg-emerald-50 hover:text-[#2E7D32] hover:border-[#2E7D32]/30 border border-gray-200 text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm cursor-pointer whitespace-nowrap transition-all"
            >
              {q.text}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2 shrink-0"
      >
        <label htmlFor="agri-chat-input" className="sr-only">Ask Sarunena AI</label>
        <input
          id="agri-chat-input"
          type="text"
          placeholder={language === 'si' ? 'පොහොර, බෝග, කෘපීරෝග ගැනවත් විමසන්න...' : language === 'ta' ? 'உரங்கள், பயிர்கள், பூச்சிகள் பற்றி கேளுங்கள்...' : 'Ask Sarunena AI about fertilizers, crops, pests...'}
          value={input}
          onChange={(e) => {
            if (e.target.value.length <= 1000) {
              setInput(e.target.value);
            }
          }}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
          maxLength={1000}
          disabled={isTyping}
          aria-label="Ask Sarunena AI"
        />
        <button
          type="submit"
          className="p-2.5 bg-[#2E7D32] text-white hover:bg-[#1B5E20] rounded-xl shadow-md transition-all cursor-pointer shrink-0"
          aria-label="Send message"
          disabled={isTyping || input.trim().length === 0}
        >
          <Send className="h-4.5 w-4.5" />
        </button>
      </form>

    </div>
  );
}
