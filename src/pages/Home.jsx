import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingFlow from '../components/BookingFlow';

const FEED_IMAGES = [
  { id: 'img-1', src: '/feed/web_pic_1.jpeg', actionLabel: 'Book Single Appointment', actionType: 'single' },
  { id: 'img-4', src: '/feed/web_pic_4.jpeg', actionLabel: 'Subscribe', actionType: 'subscribe' },
  { id: 'img-2', src: '/feed/web_pic_2.jpeg' },
  { id: 'img-3', src: '/feed/web_pic_3.jpeg' },
  { id: 'img-5', src: '/feed/web_pic_5.jpeg' },
  { id: 'img-6', src: '/feed/web_pic_6.jpeg' },
];

export default function Home() {
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const handleAction = (type) => {
    if (type === 'single') {
      const msg = "Hi, Kayla! 💜 I'm interested in your services and would love to book a single appointment to try it out before committing to a subscription. Do you have any availability?";
      window.open("https://wa.me/27683595032?text=" + encodeURIComponent(msg), "_blank");
    } else if (type === 'subscribe') {
      setShowSubscribeModal(true);
    }
  };

  // Ultra-transparent Apple visionOS style glass
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.03)', // Almost completely transparent
    backdropFilter: 'blur(25px)', 
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.3)', // Soft reflective edge
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#FAF6F0', overflowX: 'hidden' }}>
      
      {/* Liquid Glass Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...glassStyle,
        border: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <img 
          src="/logo_horizontal.png" 
          alt="Set Studio" 
          style={{ height: '70px', objectFit: 'contain', transform: 'scale(1.2)' }}
        />
      </div>

      {/* Feed Container */}
      <div style={{ paddingTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
          {FEED_IMAGES.map((img, index) => (
            <div key={img.id} style={{ position: 'relative', width: '100%' }}>
              <img 
                src={img.src} 
                alt={'Gallery ' + index}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              
              {/* Action Island */}
              {img.actionLabel && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction(img.actionType)}
                    style={{
                      pointerEvents: 'auto',
                      ...glassStyle,
                      padding: '16px 36px',
                      borderRadius: '30px',
                      cursor: 'pointer',
                      color: 'var(--color-slate-plum)',
                      fontWeight: '800',
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      whiteSpace: 'nowrap',
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    {img.actionLabel}
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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
