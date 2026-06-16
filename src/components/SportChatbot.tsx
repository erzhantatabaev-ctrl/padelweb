import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Trash2, ArrowUpRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const FIRST_SUGGESTIONS = [
  "How do is score in Padel matches?",
  "What are the rates of the Showcourt?",
  "Tell me about Bullpadel Vertex racket specs",
  "Where are Veloce domes located?"
];

export default function SportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-init',
        role: 'assistant',
        content: "Hola! I'm Coach Veloce, your pro-tier AI assistant. Ask me anything about court reserves, match rules, or high-octane racket gear!"
      }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isThinking]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: text.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      // API call to the server proxy endpoint
      // Ensure we pass the entire past message history so Gemini knows the conversation context!
      const recentHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: recentHistory })
      });

      if (!response.ok) {
        throw new Error('Server proxy connection failed.');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `msg-assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "Sorry, I had trouble formulating ideas. Can you try asking again?"
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          role: 'assistant',
          content: "⚠️ I couldn't reach Veloce HQ servers. Please make sure the backend service is running, and your GEMINI_API_KEY is configured in AI Studio Secrets."
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm("Reset instructions and start a fresh practice session with Coach Veloce?")) {
      setMessages([
        {
          id: 'msg-init-reset',
          role: 'assistant',
          content: "Thread reset! Ready for your drills. What can I clarify for you regarding court bookings or tactics?"
        }
      ]);
    }
  };

  return (
    <div id="veloce-chatbot-root" className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Action Button (FAB) */}
      <motion.button
        id="chatbot-toggle-fab"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative h-14 w-14 rounded-full flex items-center justify-center cursor-pointer shadow-xl transition-colors duration-300 ${
          isOpen 
            ? 'bg-zinc-900 border border-zinc-800 text-lime-400' 
            : 'bg-lime-400 text-zinc-950 hover:bg-lime-300'
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : (
          <div className="relative">
            <MessageSquare className="h-6 w-6 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-zinc-950 animate-ping" />
          </div>
        )}
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window-panel"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-[400px] h-[480px] sm:h-[555px] bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-black/80"
          >
            {/* Window Header */}
            <div className="p-4 bg-zinc-900 border-b border-zinc-950 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8.5 w-8.5 rounded-full bg-lime-400/15 border border-lime-400/30 flex items-center justify-center">
                  <Bot className="h-4.5 w-4.5 text-lime-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                    Coach Veloce AI
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest leading-none mt-0.5">Tactical Assistant</p>
                </div>
              </div>
              
              <button
                onClick={handleClearHistory}
                title="Reset active thread context"
                className="text-zinc-500 hover:text-rose-400 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Message Feed Canvas */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/40">
              {messages.map((msg) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-2.5 ${isAssistant ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isAssistant 
                        ? 'bg-zinc-900 border border-zinc-800 text-lime-400' 
                        : 'bg-lime-400/10 border border-lime-400/20 text-lime-300'
                    }`}>
                      {isAssistant ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                    </div>

                    <div className="space-y-1 max-w-[78%]">
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isAssistant
                          ? 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-900'
                          : 'bg-lime-400 text-zinc-950 font-semibold rounded-tr-none'
                      }`}>
                        {msg.content}
                      </div>
                      <span className="block text-[8.5px] text-zinc-500 font-mono uppercase px-1">
                        {isAssistant ? 'CONCIERGE' : 'PLAYER'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {isThinking && (
                <div className="flex items-start gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-zinc-900 border border-zinc-800 text-lime-400 flex items-center justify-center">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="p-3 bg-zinc-900 text-zinc-400 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5 border border-zinc-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-bounce delay-100" />
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-bounce delay-200" />
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider ml-1 text-zinc-500">Coach Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggestion Prompts */}
            {messages.length === 1 && (
              <div className="p-3.5 bg-zinc-900/60 border-t border-zinc-900/40">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                  <HelpCircle className="h-3.5 w-3.5 text-lime-400" />
                  <span>Interactive Drill Prompts:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {FIRST_SUGGESTIONS.map((s, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(s)}
                      className="text-[10px] bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 px-2 py-1 rounded-md flex items-center gap-1.5 text-left transition duration-200"
                    >
                      <span>{s}</span>
                      <ArrowUpRight className="h-3 w-3 text-lime-400 opacity-60 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Control Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3.5 bg-zinc-900 border-t border-zinc-950 flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Coach Veloce anything..."
                className="flex-1 bg-zinc-950 border border-zinc-850 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isThinking}
                className={`h-9.5 w-9.5 rounded-xl flex items-center justify-center transition shrink-0 ${
                  inputValue.trim() && !isThinking
                    ? 'bg-lime-400 text-zinc-950 hover:bg-lime-300 cursor-pointer'
                    : 'bg-zinc-900 text-zinc-650 border border-zinc-855 cursor-not-allowed'
                }`}
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
