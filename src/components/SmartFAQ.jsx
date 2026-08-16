import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MapPin, CalendarHeart } from 'lucide-react';

export default function SmartFAQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hi bestie! 💋 Ask me anything about Set Studio.' }
  ]);

  // Auto-open logic (only once until they close it)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const hasClosedFAQ = localStorage.getItem('setStudioFAQClosed');
    if (!hasClosedFAQ) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCloseFAQ = () => {
    setIsOpen(false);
    localStorage.setItem('setStudioFAQClosed', 'true');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setChatInput('');
    
    // Map our chat messages to Gemini's history format
    // Skip the first message if we want, but it's fine to include
    const apiHistory = chatMessages.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
      
    // Add a temporary loading message
    setChatMessages(prev => [...prev, { type: 'bot', text: 'Thinking... ✨', isLoading: true }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: apiHistory })
      });
      
      const data = await response.json();
      
      setChatMessages(prev => {
        const newMsgs = [...prev];
        // Replace the "Thinking..." message with the actual response
        newMsgs[newMsgs.length - 1] = { type: 'bot', text: data.text || "Sorry, I had a little glitch! 💋" };
        return newMsgs;
      });
    } catch (err) {
      setChatMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { type: 'bot', text: "Sorry, I couldn't connect. Please try again! 💅" };
        return newMsgs;
      });
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: isMobile ? '45px' : '30px',
          left: isMobile ? '50%' : 'auto',
          right: isMobile ? 'auto' : '30px',
          x: isMobile ? '-50%' : 0,
          width: isMobile ? '120px' : '70px',
          height: isMobile ? '36px' : '70px',
          borderRadius: isMobile ? '18px' : '50%',
          padding: isMobile ? '0' : '10px',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(92, 84, 112, 0.6)', // Slate Plum frosted glass
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}
      >
        {isMobile ? (
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: '#fff' }}>Set Studio</span>
        ) : (
          <img src="/faq_icon.png" alt="FAQ" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        )}
      </motion.button>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: '120px',
              right: '30px',
              width: '90%',
              maxWidth: '400px',
              maxHeight: '70vh',
              borderRadius: '24px',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              background: 'rgba(92, 84, 112, 0.75)', // Darker Slate Plum frosted glass
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff'
            }}
          >
            {/* Header */}
            <div style={{ height: '50px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
              <img src="/logo_horizontal.png" alt="Set Studio Logo" style={{ height: '110px', objectFit: 'contain' }} />
              <button onClick={handleCloseFAQ} style={{ position: 'absolute', right: '15px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center' }}>
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              {/* Important Callouts */}
              <div style={{ background: 'rgba(185, 180, 199, 0.2)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(185, 180, 199, 0.4)' }}>
                <h4 style={{ display: 'flex', marginBottom: '8px', color: 'var(--color-dusty-lilac)' }}>
                  SUBSCRIPTION BASED
                </h4>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>This is a subscription studio. You pay monthly to secure your permanent slots so you never have to stress about booking again!</p>
              </div>

              <div style={{ background: 'rgba(230, 229, 232, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(230, 229, 232, 0.2)' }}>
                <h4 style={{ display: 'flex', marginBottom: '8px', color: 'var(--color-dusty-lilac)' }}>
                  100% MOBILE
                </h4>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>Don't worry about traffic! The full, premium salon experience is brought directly to the comfort of your home. 🛋️✨</p>
              </div>

              {/* Chat Interface */}
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {chatMessages.map((msg, idx) => (
                  <div key={idx} style={{
                    alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.type === 'user' ? 'var(--color-dusty-lilac)' : 'rgba(255,255,255,0.1)',
                    color: msg.type === 'user' ? 'var(--color-slate-plum)' : '#fff',
                    padding: '10px 15px',
                    borderRadius: '16px',
                    borderBottomRightRadius: msg.type === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.type === 'bot' ? '4px' : '16px',
                    maxWidth: '85%',
                    fontSize: '0.9rem'
                  }}>
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} style={{ padding: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me another question..." 
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  padding: '10px 15px',
                  color: '#fff',
                  outline: 'none',
                  fontFamily: 'inherit'
                }} 
              />
              <button type="submit" style={{
                background: 'var(--color-dusty-lilac)',
                color: 'var(--color-slate-plum)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
