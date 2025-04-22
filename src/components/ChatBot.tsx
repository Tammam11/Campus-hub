import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, HelpCircle, Paperclip, Check, FileText, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: {
    name: string;
    type: string;
    size: number;
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState([
    "How do I register for courses?",
    "Where can I find my schedule?",
    "What are the library hours?",
    "How to contact my professor?"
  ]);
  const [showAttachmentNotice, setShowAttachmentNotice] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('ksiu-chat-messages');
    const savedTerms = localStorage.getItem('ksiu-chat-terms');
    
    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedTerms) setHasAcceptedTerms(JSON.parse(savedTerms));
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ksiu-chat-messages', JSON.stringify(messages));
    }
    localStorage.setItem('ksiu-chat-terms', JSON.stringify(hasAcceptedTerms));
  }, [messages, hasAcceptedTerms]);

  // Auto-scroll and focus management
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (hasAcceptedTerms && isOpen) {
      const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
      inputElement?.focus();
    }
  }, [messages, isOpen, hasAcceptedTerms]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !showAttachmentNotice) return;

    if (showAttachmentNotice) {
      // Handle attachment submission
      const adminMessage: Message = {
        id: Date.now().toString(),
        text: "Your attachment has been forwarded to admin for review. We'll get back to you soon.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, adminMessage]);
      setShowAttachmentNotice(false);
      setInput('');
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Update status to delivered
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 500);

    // Simulate bot typing and response
    setIsBotTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now().toString(),
        text: getBotResponse(input),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsBotTyping(false);

      // Update user message status to read
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      );
    }, 1500 + Math.random() * 1000);
  };

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    if (input.includes('register') || input.includes('course')) {
      return "Course registration can be done through the student portal. The registration period is from August 1-15. Need more specific help?";
    } else if (input.includes('schedule')) {
      return "Your class schedule is available on the KSIU portal under 'My Academics'. Would you like me to direct you there?";
    } else if (input.includes('library')) {
      return "The university library is open Sunday-Thursday from 8AM to 8PM, and Saturdays 10AM to 4PM. It's closed on Fridays.";
    } else {
      return "Thank you for your message. I've noted your question and will provide a detailed response shortly. In the meantime, is there anything else I can help with?";
    }
  };

  const acceptTerms = () => {
    setHasAcceptedTerms(true);
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: "Welcome to KSIU Virtual Assistant! I can help with course info, schedules, campus services, and more. What would you like to know?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMessage]);
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
    inputElement?.focus();
  };

  const handleAttachmentClick = () => {
    if (!hasAcceptedTerms) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show attachment notice
    setShowAttachmentNotice(true);
    setInput(`Attachment: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const cancelAttachment = () => {
    setShowAttachmentNotice(false);
    setInput('');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {showTooltip && !isOpen && (
          <div 
            className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-3 text-sm w-48 animate-bounce"
            role="tooltip"
            aria-label="Chat assistant tooltip"
          >
            <div className="relative">
              <div className="text-gray-800">Need help? Ask me anything!</div>
              <div className="absolute -bottom-2 right-4 w-3 h-3 bg-white transform rotate-45"></div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            setIsOpen(true);
            setShowTooltip(false);
          }}
          aria-label="Open chat window"
          className={`bg-[#003366] text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-all z-50 ${
            isOpen ? 'hidden' : 'flex'
          } animate-[wave_2s_ease-in-out_infinite]`}
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        aria-hidden="true"
      />

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed md:bottom-6 md:right-6 md:w-96 w-full bottom-0 right-0 bg-white rounded-t-xl md:rounded-xl shadow-xl z-50 flex flex-col"
          style={{ height: 'calc(100vh - 100px)', maxHeight: '600px' }}
          aria-modal="true"
          role="dialog"
          aria-label="KSIU Virtual Assistant chat window"
        >
          {/* Header with University Branding */}
          <div className="flex items-center justify-between bg-[#003366] text-white p-4 rounded-t-xl">
            <div className="flex items-center space-x-2">
              <img 
                src="https://www.ksiu.edu.sa/images/logo.png" 
                alt="KSIU Logo" 
                className="h-8 w-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div>
                <h3 className="font-bold text-lg">KSIU Virtual Assistant</h3>
                <p className="text-xs opacity-80">{isBotTyping ? 'Typing...' : 'Online'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-800 p-1 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {!hasAcceptedTerms ? (
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <h2 className="text-xl font-bold text-[#003366] mb-2">Welcome to KSIU Assistant</h2>
                    <p className="text-gray-600">Your virtual campus guide</p>
                  </div>
                  
                  <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 text-sm text-gray-700">
                    <h4 className="font-bold text-lg mb-3 text-red-700">Before You Continue</h4>
                    <ul className="space-y-3 list-disc pl-5">
                      <li>All conversations are recorded for quality purposes</li>
                      <li>Be respectful - inappropriate messages will be flagged</li>
                      <li>For official matters, always verify with administration</li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded-lg border">
                      <div className="flex items-start">
                        <Check className="w-4 h-4 mt-1 mr-2 text-green-600 flex-shrink-0" />
                        <p className="text-sm">By continuing, you agree to our terms of service and privacy policy</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={acceptTerms}
                  className="w-full bg-[#003366] hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
                >
                  Accept & Start Chatting
                </button>
              </div>
            ) : (
              <>
                {messages.length === 1 && (
                  <div className="text-center pb-4">
                    <p className="text-sm text-gray-500">Today {new Date().toLocaleDateString()}</p>
                    <div className="mt-2 bg-blue-50 text-blue-800 text-sm p-3 rounded-lg inline-block">
                      How can I help you today?
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[85%] space-y-1 ${message.isBot ? 'pl-2' : 'pr-2'}`}>
                      <div
                        className={`p-3 rounded-2xl shadow-sm ${
                          message.isBot
                            ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                            : 'bg-[#003366] text-white rounded-tr-none'
                        }`}
                      >
                        {message.text}
                        {message.attachment && (
                          <div className="mt-2 flex items-center bg-black bg-opacity-10 p-2 rounded-lg">
                            <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                            <div className="truncate flex-1">
                              <div className="font-medium truncate">{message.attachment.name}</div>
                              <div className="text-xs opacity-75">{message.attachment.type} • {(message.attachment.size / 1024).toFixed(1)} KB</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={`text-xs flex items-center space-x-1 ${
                        message.isBot ? 'text-gray-500' : 'text-gray-400 justify-end'
                      }`}>
                        {message.isBot && <Bot className="w-3 h-3" />}
                        <span>{message.timestamp}</span>
                        {!message.isBot && (
                          <>
                            <span>•</span>
                            {message.status === 'read' ? (
                              <span className="text-blue-500 flex items-center">
                                <Check className="w-3 h-3" />
                                <Check className="w-3 h-3 -ml-1" />
                              </span>
                            ) : message.status === 'delivered' ? (
                              <Check className="w-3 h-3 text-gray-400" />
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isBotTyping && (
                  <div className="flex justify-start pl-2">
                    <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {messages.length > 1 && quickReplies.length > 0 && !showAttachmentNotice && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} aria-hidden="true" />
              </>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-xl">
            {showAttachmentNotice && (
              <div className="mb-2 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-3 flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">File will be sent to admin for review</p>
                  <p className="text-xs">The administration team will review your attachment and respond accordingly.</p>
                </div>
                <button
                  type="button"
                  onClick={cancelAttachment}
                  className="ml-auto text-yellow-600 hover:text-yellow-800"
                  aria-label="Cancel attachment"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <div className="flex space-x-2">
              <button 
                type="button" 
                onClick={handleAttachmentClick}
                className={`p-2 rounded-lg transition-colors ${
                  hasAcceptedTerms
                    ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Attach file"
                disabled={!hasAcceptedTerms}
              >
                <Paperclip className="w-5 h-5" />
              </button>
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={hasAcceptedTerms ? "Type your message here..." : "Please accept terms to chat"}
                className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                  hasAcceptedTerms 
                    ? 'border border-gray-300 focus:ring-blue-500 bg-white' 
                    : 'border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!hasAcceptedTerms}
                aria-label="Type your message"
              />
              
              <button
                type="submit"
                className={`p-2 rounded-lg transition-colors ${
                  hasAcceptedTerms && (input.trim() || showAttachmentNotice)
                    ? 'bg-[#003366] text-white hover:bg-blue-800 shadow-md'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!hasAcceptedTerms || (!input.trim() && !showAttachmentNotice)}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
