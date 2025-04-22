import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm KSIU-AI, your virtual assistant. How can I help you today?",
      isBot: true
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput('');
  };

  return (
    <>
      {/* Chat Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-[#003366] text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors z-50 ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-96 bg-white md:rounded-xl shadow-xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#003366] text-white p-3 md:p-4 md:rounded-t-xl">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
              <h3 className="font-bold text-sm md:text-base">KSIU-AI</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-800 p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm md:text-base ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-[#003366] text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
