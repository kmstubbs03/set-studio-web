import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// SVG Icons
const Instagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Facebook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Youtube = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const TikTok = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

export default function Socials() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram />, url: 'https://www.instagram.com/setstudio.sa?igsh=NmU3a2trYnZ5YWJl&utm_source=qr' },
    { name: 'Facebook', icon: <Facebook />, url: 'https://www.facebook.com/share/19JKaHyTZU/?mibextid=wwXIfr' },
    { name: 'TikTok', icon: <TikTok />, url: 'https://www.tiktok.com/@thesetstudioza?_r=1&_t=ZS-98sLEAZ7DHA' },
    { name: 'YouTube', icon: <Youtube />, url: '#' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        position: 'fixed',
        left: isMobile ? '15px' : '30px',
        bottom: isMobile ? '45px' : '30px', // Matches SmartFAQ bottom
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column', // always vertical
        gap: '12px',
        background: 'rgba(92, 84, 112, 0.4)', // Slate Plum glass
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        padding: isMobile ? '12px 8px' : '15px 10px',
        borderRadius: '30px',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
      }}
    >
      {socialLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, color: '#fff' }}
          whileTap={{ scale: 0.9 }}
          style={{
            color: 'var(--color-dusty-lilac)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.2)',
            textDecoration: 'none'
          }}
          aria-label={social.name}
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  );
}
