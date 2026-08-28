import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import CoverFlowGallery from '../components/CoverFlowGallery';
import BookingFlow from '../components/BookingFlow';

const NAIL_IMAGES = [
  '/gallery/nails/nail1.jpg',
  '/gallery/nails/nail2.jpg',
  '/gallery/nails/nail3.jpg',
  '/gallery/nails/nail4.jpg',
  '/gallery/nails/nail5.jpg',
  '/gallery/nails/nail6.jpg',
  '/gallery/nails/nail7.jpg'
];

const LASH_IMAGES = [
  '/gallery/lashes/lash1.jpg',
  '/gallery/lashes/lash2.jpg',
  '/gallery/lashes/lash3.jpg',
  '/gallery/lashes/lash4.jpg',
  '/gallery/lashes/lash5.jpg'
];

const SET_IMAGES = [];
const maxLen = Math.max(NAIL_IMAGES.length, LASH_IMAGES.length);
for (let i = 0; i < maxLen; i++) {
  if (NAIL_IMAGES[i]) SET_IMAGES.push(NAIL_IMAGES[i]);
  if (LASH_IMAGES[i]) SET_IMAGES.push(LASH_IMAGES[i]);
}

const WORLDS = {
  'nails': {
    title: 'Polygel Nails Subscription',
    subtitle: 'Premium Polygel Extensions & Overlays',
    bg: '/leopard_print_light.jpg',
    color: '#5C5470',
    description: 'Immerse yourself in flawless, sculpted beauty. From minimalist overlays to extravagant extensions.',
    features: [
      '2x fresh polygel sets or fills per month',
      'Tier 1 nail art included',
      'Any fixes included',
      'Travel fees included (varies depending on area)'
    ],
    gallery: NAIL_IMAGES
  },
  'lashes': {
    title: 'Lash Cluster Subscription',
    subtitle: 'Premium Lash Clusters',
    bg: '/leopard_stars.jpg',
    color: '#FAF6F0',
    description: 'Wake up ready. Perfect, lightweight lash clusters tailored to your exact eye shape.',
    features: [
      '2x fresh lash sets per month',
      'Any fixes included',
      'Travel fees included (varies depending on area)'
    ],
    gallery: LASH_IMAGES
  }
};


export default function World() {
  const { id } = useParams();
  const navigate = useNavigate();
  const world = WORLDS[id];
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!world) return <div>World not found.</div>;

  return (
    <motion.div
      layoutId={`world-container-${id}`}
      style={{
        height: '100vh',
        height: '100dvh', // better for mobile browsers
        width: '100vw',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Expanding Background Image */}
      <motion.div 
        layoutId={`world-bg-${id}`}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${world.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}
      />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={() => navigate('/')}
        className="glass-panel"
        style={{
          alignSelf: 'flex-start',
          padding: '6px 12px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--color-slate-plum)',
          fontWeight: 'bold',
          marginTop: isMobile ? '20px' : '30px',
          marginLeft: isMobile ? '15px' : '30px',
          zIndex: 10,
          fontSize: '0.8rem'
        }}
      >
        <ArrowLeft size={16} /> Home
      </motion.button>

      {/* Scrollable Container for Content and Gallery */}
      <div style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: isMobile ? '10px' : '15px',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '10px',
        paddingTop: isMobile ? '20px' : '40px',
        paddingBottom: isMobile ? '60px' : '80px'
      }}>
        {/* Content Area */}
        <motion.div
          layoutId={`world-content-${id}`}
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '600px',
            padding: isMobile ? '12px' : '20px',
            borderRadius: '24px',
            textAlign: 'center',
            color: 'var(--color-slate-plum)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexShrink: 0
          }}
        >
        <h1 style={{ fontSize: isMobile ? '1.4rem' : '1.8rem', marginBottom: '4px' }}>{world.title}</h1>
        <p style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', opacity: 0.95, marginBottom: isMobile ? '12px' : '20px', fontWeight: 'bold' }}>{world.subtitle}</p>
        
        <div style={{
          background: 'rgba(255,255,255,0.6)',
          borderRadius: '16px',
          padding: isMobile ? '14px' : '24px',
          width: '100%',
          marginBottom: isMobile ? '15px' : '30px',
          textAlign: 'left'
        }}>
          <h3 style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', marginBottom: isMobile ? '12px' : '18px', textAlign: 'center' }}>What's Included</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '14px' }}>
            {world.features.map((feature, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: isMobile ? '0.95rem' : '1.1rem', fontWeight: '500', lineHeight: '1.4' }}>
                <Check size={18} style={{ color: 'var(--color-slate-plum)', flexShrink: 0, marginTop: '2px' }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsBookingOpen(true)}
            style={{
              background: 'var(--color-dusty-lilac)',
              color: 'var(--color-slate-plum)',
              padding: isMobile ? '10px 20px' : '14px 28px',
              borderRadius: '30px',
              fontSize: isMobile ? '0.9rem' : '1rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto',
              boxShadow: '0 4px 15px rgba(185, 180, 199, 0.4)'
            }}
          >
          Secure Your Subscription <Sparkles size={18} />
        </motion.button>
      </motion.div>

        {/* 3D Cover Flow Gallery - Now flowing naturally below the content */}
        <div style={{ 
          width: '100%',
          display: 'flex', 
          justifyContent: 'center',
          flexShrink: 0,
          zIndex: 20,
          position: 'relative'
        }}>
          <CoverFlowGallery images={world.gallery} />
        </div>
      </div>

      {isBookingOpen && (
        <BookingFlow 
          worldId={id} 
          worldTitle={world.title} 
          onClose={() => setIsBookingOpen(false)} 
        />
      )}
    </motion.div>
  );
}
