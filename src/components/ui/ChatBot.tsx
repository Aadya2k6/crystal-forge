import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { X, Send, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Frosty, your hackathon assistant! ❄️ I can help you with registration, event details, or any questions about the Crystal Forge Hackathon!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponseToQuestion = async (userMessage: string) => {
    // Simple keyword-based responses for hackathon questions
    const lowerMessage = userMessage.toLowerCase();
    
    // Question 1: Registration
    if (lowerMessage.includes('register') || lowerMessage.includes('registration') || lowerMessage.includes('sign up') || lowerMessage.includes('join')) {
      return "❄️ To register for the Crystal Forge Hackathon, click on the 'Register' button in the navigation menu! Fill out the form with your team details, project idea, and contact information. Registration is free and open to all skill levels!";
    }
    
    // Question 2: Schedule/Timeline
    if (lowerMessage.includes('when') || lowerMessage.includes('schedule') || lowerMessage.includes('time') || lowerMessage.includes('date') || lowerMessage.includes('start')) {
      return "❄️ The Crystal Forge Hackathon runs over the winter break! The event kicks off with opening ceremonies, followed by 48 hours of coding, mentorship sessions, and concludes with project presentations and awards. Check the main page for the complete timeline!";
    }
    
    // Question 3: Prizes
    if (lowerMessage.includes('prize') || lowerMessage.includes('reward') || lowerMessage.includes('win') || lowerMessage.includes('award')) {
      return "🏆 Amazing prizes await! We have cash rewards up to $5,000, latest tech gadgets, mentorship opportunities with industry experts, internship offers, and special recognition awards. Different categories include Best Innovation, Best Design, and People's Choice!";
    }
    
    // Question 4: Rules and Requirements
    if (lowerMessage.includes('rule') || lowerMessage.includes('requirement') || lowerMessage.includes('allow') || lowerMessage.includes('permitted') || lowerMessage.includes('guidelines')) {
      return "📋 Hackathon Rules: Teams of 1-4 people, original code created during the event, open source libraries allowed, fair play expected, and all skill levels welcome! You can use any programming language, framework, or platform. Mentors will be available to help throughout the event!";
    }
    
    // Question 5: What is Crystal Forge
    if (lowerMessage.includes('crystal forge') || lowerMessage.includes('about') || lowerMessage.includes('what is') || lowerMessage.includes('hackathon') || lowerMessage.includes('event')) {
      return "✨ Crystal Forge is a winter-themed hackathon where innovation meets creativity! It's a 48-hour coding event bringing together developers, designers, and creators to build amazing projects. Whether you're a beginner or expert, come join us for coding, learning, networking, and building something extraordinary in a magical winter setting!";
    }
    
    // Default response for other questions
    return "❄️ Hi there! I'm Frosty, your hackathon assistant! I can help you with:\n\n• Registration process\n• Event schedule and timing\n• Prizes and awards\n• Rules and guidelines\n• About Crystal Forge Hackathon\n\nJust ask me about any of these topics! ⛄";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Get response using keyword matching
    const aiResponse = await getResponseToQuestion(userMessage.text);
    
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-end p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Chat Window */}
          <motion.div
            className="relative w-full max-w-md h-[600px] mr-16 mb-16"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <GlassCard className="h-full flex flex-col" variant="diamond">
              {/* Header with Snowman */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  {/* Snowman Avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-white rounded-full border-2 border-blue-200 relative">
                      {/* Eyes */}
                      <div className="absolute top-2 left-2 w-1 h-1 bg-black rounded-full"></div>
                      <div className="absolute top-2 right-2 w-1 h-1 bg-black rounded-full"></div>
                      {/* Carrot nose */}
                      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-l-orange-500 border-t-1 border-t-transparent border-b-1 border-b-transparent"></div>
                      {/* Smile */}
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                        <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
                        <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
                        <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
                      </div>
                    </div>
                    {/* Hat */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-black rounded-t"></div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-black"></div>
                  </div>
                  <div>
                    <h3 className="font-space text-lg font-bold text-glacier-deep">Frosty</h3>
                    <p className="text-sm text-foreground/60">Your Hackathon Assistant</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-foreground/60" />
                </motion.button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-gradient-to-r from-ice-cyan to-holo-blue text-white'
                          : 'bg-white/10 border border-white/20 text-foreground'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 border border-white/20 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-foreground/40 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/20">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Frosty anything about the hackathon..."
                    className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-ice-cyan/50 transition-colors"
                    disabled={isTyping}
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-3 rounded-xl bg-gradient-to-r from-ice-cyan to-holo-blue text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Floating Snowball Trigger Component
export const ChatBotTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Snowball */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99999,
          pointerEvents: 'auto'
        }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 bg-gradient-to-br from-white to-blue-50 rounded-full border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all"
          style={{ 
            position: 'relative',
            zIndex: 99999
          }}
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            scale: { delay: 1, type: "spring", bounce: 0.6 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Snowball texture */}
          <div className="absolute inset-1 bg-gradient-to-br from-white via-blue-50 to-white rounded-full">
            {/* Small dots for texture */}
            <div className="absolute top-2 left-3 w-1 h-1 bg-blue-200 rounded-full opacity-60"></div>
            <div className="absolute bottom-3 right-2 w-1 h-1 bg-blue-200 rounded-full opacity-60"></div>
            <div className="absolute top-4 right-4 w-0.5 h-0.5 bg-blue-300 rounded-full opacity-80"></div>
          </div>
          
          {/* Chat icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-ice-cyan drop-shadow-sm" />
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-ice-cyan/20 to-holo-blue/20 animate-pulse"></div>
        </motion.button>
        
        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap"
          style={{ position: 'absolute' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4 }}
        >
          Chat with Frosty! ⛄
          <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black/80"></div>
        </motion.div>
      </div>

      {/* ChatBot Component */}
      <ChatBot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};