import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Socials from '../components/Socials';

const WORLDS = [
  {
    id: 'nails',
    title: 'NAILS',
    bg: '/leopard_print_light.jpg',
  },
  {
    id: 'lashes',
    title: 'LASHES',
    bg: '/leopard_stars.jpg',
  },
  {
    id: 'the-set',
    title: 'THE SET',
    bg: '/leopard_print_medium.jpg',
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [activePortal, setActivePortal] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isTouched, setIsTouched] = useState(false);

  // Auto-play animation for mobile to make it feel alive
  useEffect(() => {
    if (!isMobile || isTouched) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      setActivePortal(WORLDS[currentIndex].id);
      currentIndex = (currentIndex + 1) % WORLDS.length;
    }, 2500); // cycle every 2.5s
    
    return () => clearInterval(interval);
  }, [isMobile, isTouched]);

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    setIsTouched(true);
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element) {
      const portal = element.closest('.portal-container');
      if (portal) {
        setActivePortal(portal.dataset.id);
      }
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      setActivePortal(null);
    }
  };

  return (
    <div 
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden', position: 'relative' }}
    >
      
      <Socials />

      {/* The 3 Vertical Columns */}
      {WORLDS.map((world) => (
        <motion.div
          key={world.id}
          className="portal-container"
          data-id={world.id}
          layoutId={`world-container-${world.id}`}
          onClick={() => navigate(`/world/${world.id}`)}
          onHoverStart={() => !isMobile && setActivePortal(world.id)}
          onHoverEnd={() => !isMobile && setActivePortal(null)}
          animate={{ flex: activePortal === world.id ? 1.5 : 1 }}
          style={{
            cursor: 'pointer',
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'flex 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {/* Background Image of the Portal */}
          <motion.div 
            layoutId={`world-bg-${world.id}`}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url(${world.bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }}
          />
          
          {/* Text always visible overlay */}
          <div style={{
            position: 'absolute',
            zIndex: 1,
            background: 'rgba(0,0,0,0.2)', // Slight dark tint to make text pop
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 1
          }}>
            <h2 style={{ color: '#fff', fontSize: '3rem', letterSpacing: '4px', textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>{world.title}</h2>
          </div>
        </motion.div>
      ))}

      {/* Book Single Appointment Link */}
      <a 
        href={`https://wa.me/27683595032?text=${encodeURIComponent("Hi, Kayla! 💜 I'm interested in your services and would love to book a single appointment to try it out before committing to a subscription. Do you have any availability?")}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          bottom: isMobile ? '15px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          color: 'rgba(255,255,255,0.6)',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          cursor: 'pointer',
          fontSize: '0.8rem',
          textDecoration: 'underline',
          transition: 'color 0.2s',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => e.target.style.color = '#fff'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
      >
        Looking for a single appointment?
      </a>

    </div>
  );
}
