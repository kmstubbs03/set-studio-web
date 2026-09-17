import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingFlow from '../components/BookingFlow';
import SingleBookingFlow from '../components/SingleBookingFlow';

const FEED_IMAGES = [
  { id: 'img-11', src: '/feed/web_pic_11.jpeg' },
  { id: 'img-1', src: '/feed/web_pic_1.jpeg' },
  { id: 'img-2', src: '/feed/web_pic_2.jpeg' },
  { id: 'img-12', src: '/feed/web_pic_12.jpeg' },
  { id: 'img-9', src: '/feed/web_pic_9.jpeg' },
  { id: 'img-4', src: '/feed/web_pic_4.jpeg' },
  { id: 'img-3', src: '/feed/web_pic_3.jpeg' },
  { id: 'img-5', src: '/feed/web_pic_5.jpeg' },
  { id: 'img-6', src: '/feed/web_pic_6.jpeg' },
  { id: 'img-7', src: '/feed/web_pic_7.jpeg' },
  { id: 'img-8', src: '/feed/web_pic_8.jpeg' },
  { id: 'img-10', src: '/feed/web_pic_10.jpeg' }
];

export default function Home({ setIsFAQOpen }) {
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showSingleModal, setShowSingleModal] = useState(false);

  const handleAction = (type) => {
    if (type === 'single') {
      setShowSingleModal(true);
    } else if (type === 'subscribe') {
      setShowSubscribeModal(true);
    }
  };

  // Ultra-transparent Apple visionOS style glass
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.03)', // Almost completely transparent
    backdropFilter: 'blur(8px)', 
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.3)', // Soft reflective edge
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#FAF6F0', overflowX: 'hidden' }}>
      
      {/* Top Header Logo (Chatbot Trigger) */}
      <div 
        onClick={() => setIsFAQOpen(true)}
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '60px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          ...glassStyle,
          border: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <img 
            src="/logo_horizontal.png" 
            alt="Set Studio" 
            style={{ height: '70px', objectFit: 'contain', transform: 'scale(1.2)' }}
          />
        </div>
      </div>

      {/* Feed Container */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="feed-container">
          {FEED_IMAGES.map((img, index) => (
            <div key={img.id} style={{ position: 'relative', width: '100%' }}>
              <img 
                src={img.src} 
                alt={'Gallery ' + index}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '300px' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Action Bar */}
      <div className="fixed-action-bar">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAction('subscribe')}
          className="glass-btn"
        >
          Subscribe
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAction('single')}
          className="glass-btn"
        >
          Book Single Appt
        </motion.div>
      </div>

      {/* Single Booking Portal Overlay */}
      {showSingleModal && (
        <SingleBookingFlow 
          onClose={() => setShowSingleModal(false)} 
        />
      )}

      {/* Subscription Portal Overlay */}
      {showSubscribeModal && (
        <BookingFlow 
          worldId="nails" 
          worldTitle="Nails Subscription" 
          onClose={() => setShowSubscribeModal(false)} 
        />
      )}

    </div>
  );
}
