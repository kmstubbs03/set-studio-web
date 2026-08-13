import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CoverFlowGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use dummy items to match the count of the provided images, or a default 5
  const items = images.length > 0 ? images : [1, 2, 3, 4, 5];

  // Optional: Handle keyboard arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setActiveIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex(prev => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDragEnd = (e, { offset }) => {
    const swipeDistance = Math.abs(offset.x) > Math.abs(offset.y) ? offset.x : offset.y;
    if (swipeDistance < -30) {
      setActiveIndex(prev => prev + 1);
    } else if (swipeDistance > 30) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const cardWidth = isMobile ? 140 : 180;
  const cardHeight = isMobile ? 200 : 240;
  const containerHeight = isMobile ? '220px' : '240px';

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: containerHeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      perspective: '1000px',
    }}>
      {items.map((item, index) => {
        // Endless loop math
        const numItems = items.length;
        let offset = (index - (activeIndex % numItems)) % numItems;
        if (offset > Math.floor(numItems / 2)) offset -= numItems;
        if (offset < -Math.floor(numItems / 2)) offset += numItems;
        
        // Handle negative activeIndex modulo properly
        if (activeIndex < 0) {
            offset = (index - ((activeIndex % numItems) + numItems) % numItems) % numItems;
            if (offset > Math.floor(numItems / 2)) offset -= numItems;
            if (offset < -Math.floor(numItems / 2)) offset += numItems;
        }

        const isActive = offset === 0;
        const isLeft = offset < 0;
        const absOffset = Math.abs(offset);

        // Calculate 3D transforms
        const spacing = isMobile ? 90 : 140; // Much wider spacing to prevent heavy overlap
        const centerShift = isMobile ? 70 : 110; // More space for the center card
        const translateX = isActive ? 0 : (offset * spacing) + (isLeft ? -centerShift : centerShift);
        
        const translateZ = isActive ? 100 : -absOffset * 20;
        const rotateY = isActive ? 0 : isLeft ? 30 : -30; // Softer rotation
        const scale = isActive ? 1.1 : 0.9;
        const zIndex = isActive ? 10 : 10 - absOffset;
        // Fade out cards the further they are from the center
        const opacity = isActive ? 1 : Math.max(0, 0.8 - (absOffset * 0.3));

        return (
          <motion.div
            key={index}
            onClick={() => setActiveIndex(index)}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            animate={{
              x: translateX,
              z: translateZ,
              rotateY: rotateY,
              scale: scale,
              opacity: opacity
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            style={{
              position: 'absolute',
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: isActive ? '0 10px 25px rgba(0,0,0,0.3)' : '0 5px 15px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              zIndex: zIndex,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'var(--color-slate-plum)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transformStyle: 'preserve-3d',
              touchAction: 'none' // Prevent scrolling when swiping on the card
            }}
          >
            {item && typeof item === 'string' && item.length > 0 ? (
              <img 
                src={item} 
                alt={`Gallery ${index}`} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '15px' // slightly smaller than container to fit inside border
                }}
                draggable="false"
              />
            ) : (
              <>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.3)',
                  marginBottom: '10px'
                }} />
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>Image {index + 1}</span>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
