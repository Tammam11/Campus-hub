import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, HelpCircle } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm KSIU-AI, your virtual assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Show tooltip after 2 seconds
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 2000);

    // Hide tooltip after 5 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev: any) => [...prev, { 
      text: input, 
      isBot: false,
      timestamp: currentTime
    }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev: any) => [...prev, {
        text: "Thank you for your message. I'll help you with that shortly.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Icon with Tooltip */}
      <div className="fixed bottom-6 right-6 z-50">
        {showTooltip && !isOpen && (
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-3 text-sm w-48 transform transition-transform animate-bounce">
            <div className="relative">
              <div className="text-gray-800">Hi! May I help you with anything?</div>
              <div className="absolute -bottom-2 right-4 w-3 h-3 bg-white transform rotate-45"></div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            setIsOpen(true);
            setShowTooltip(false);
          }}
          className={`bg-[#003366] text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-all z-50 ${
            isOpen ? 'hidden' : 'flex'
          } animate-[wave_1s_ease-in-out_infinite]`}
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed md:bottom-6 md:right-6 md:w-96 w-full bottom-0 right-0 bg-white rounded-t-xl md:rounded-xl shadow-xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#003366] text-white p-4 rounded-t-xl">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6" />
              <h3 className="font-bold">KSIU-AI</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-800 p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[calc(100vh-200px)] md:h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message: { isBot: any; text: any; timestamp: any; }, index: any) => (
              <div
                key={index}
                className={`flex items-end space-x-2 ${message.isBot ? 'justify-start' : 'justify-end flex-row-reverse'}`}
              >
                <div className={`flex-shrink-0 ${message.isBot ? 'bg-gray-200' : 'bg-[#003366]'} rounded-full p-2`}>
                  {message.isBot ? (
                    <Bot className="w-4 h-4 text-gray-600" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="space-y-1">
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-[#003366] text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                  <div className={`text-xs ${message.isBot ? 'text-left' : 'text-right'} text-gray-500`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e: { target: { value: any; }; }) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-[#003366] text-white p-2 rounded-lg hover:bg-blue-800 transition-colors"
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
