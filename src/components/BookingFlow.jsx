import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import useBookingStore from '../store/useBookingStore';
import LocationStep from './booking-steps/LocationStep';
import PreferencesStep from './booking-steps/PreferencesStep';
import PackageStep, { SUBSCRIPTION_PACKAGES } from './booking-steps/PackageStep';
import DateStep from './booking-steps/DateStep';
import DetailsStep from './booking-steps/DetailsStep';

export default function BookingFlow({ onClose }) {
  const store = useBookingStore();
  const [showLengthModal, setShowLengthModal] = useState(false);
  const [showArtModal, setShowArtModal] = useState(false);

  // Unmount logic - reset store when closed
  useEffect(() => {
    return () => store.resetForm();
  }, []);

  const currentPrice = 250 + (store.travelFee || 0) + SUBSCRIPTION_PACKAGES[store.selectedPackage].price;

  const steps = [
    {
      id: 'location',
      title: 'Location & Travel Fee',
      content: <LocationStep isSubscription={true} />
    },
    {
      id: 'upgrades',
      title: 'Appointment Preferences',
      content: (
        <PreferencesStep 
          isSubscription={true} 
          onShowLengthModal={() => setShowLengthModal(true)} 
          onShowArtModal={() => setShowArtModal(true)} 
        />
      )
    },
    {
      id: 'package',
      title: 'Choose Package',
      content: <PackageStep currentPrice={currentPrice} />
    },
    {
      id: 'date',
      title: 'Choose Your Day',
      content: <DateStep isSubscription={true} />
    },
    {
      id: 'details',
      title: 'Your Details',
      content: <DetailsStep isSubscription={true} priceDisplay={`R${currentPrice}`} />
    }
  ];

  const handleNext = () => {
    if (store.step === 0 && (!store.address || !store.selectedArea || store.travelFee === null)) {
      return alert("Please select your area, enter your address, and wait for the travel fee to calculate.");
    }
    if (store.step === 3 && !store.selectedDate) return alert("Please select a date.");
    
    if (store.step === steps.length - 1) {
      if (!store.fullName || !store.whatsapp) return alert("Please fill in your details.");
      if (!store.termsAccepted) return alert("You must accept the terms & conditions.");
      if (store.selectedArt !== 'No Art' && !store.referencePhotoUrl) {
        return alert("Please upload a reference photo for your art tier.");
      }
      
      let message = `✨ *NEW SUBSCRIPTION BOOKING!* ✨\n\n`;
      message += `*Name:* ${store.fullName}\n`;
      message += `*WhatsApp:* ${store.whatsapp}\n`;
      message += `*Address:* ${store.address}\n`;
      message += `*Travel Fee:* R${store.travelFee}\n`;
      message += `*Package:* ${SUBSCRIPTION_PACKAGES[store.selectedPackage].name}\n`;
      message += `💋 *Monthly Total:* R${currentPrice}\n\n`;
      
      message += `💅 *NAIL PREFERENCES:*\n`;
      message += `- Product: ${store.selectedProduct}\n`;
      message += `- Length: ${store.selectedLength}\n`;
      message += `- Art Tier: ${store.selectedArt}\n\n`;

      message += `*Preferred Date:* ${store.selectedDate.toDateString()}\n`;
      message += `*Preferred Times:* ${store.selectedTimes.length > 0 ? store.selectedTimes.join(', ') : 'Any time'}\n\n`;

      if (store.referencePhotoUrl) {
        message += `*Reference Photo:* ${store.referencePhotoUrl}\n\n`;
      }

      message += `💜 I agree to the T&Cs. See my reference photo above!`;

      const formData = {
        fullName: store.fullName,
        whatsapp: store.whatsapp,
        address: store.address,
        packageDetails: SUBSCRIPTION_PACKAGES[store.selectedPackage].name,
        date: store.selectedDate ? store.selectedDate.toDateString() : 'Unspecified',
        referencePhotoUrl: store.referencePhotoUrl || ''
      };
      
      fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(err => console.error('Error submitting booking:', err));

      window.open("https://wa.me/27683595032?text=" + encodeURIComponent(message), "_blank");
      onClose();
      return;
    }
    
    store.setStep(Math.min(steps.length - 1, store.step + 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(30px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url(/leopard_print_medium.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '20px'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(20, 20, 25, 0.75)',
          backdropFilter: 'blur(25px) saturate(200%)',
          WebkitBackdropFilter: 'blur(25px) saturate(200%)',
          zIndex: 0
        }} />

        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
            width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', cursor: 'pointer', zIndex: 110
          }}
        >
          <X size={24} />
        </button>

        <motion.div
          key={store.step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '24px',
            padding: '30px',
            maxWidth: '500px',
            width: '100%', boxSizing: 'border-box',
            color: 'white',
            zIndex: 105,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: 'calc(100vh - 40px)',
            overflowY: 'auto'
          }}
        >
          <div style={{ flexShrink: 0, fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', color: 'var(--color-dusty-lilac)' }}>
            Step {store.step + 1} of {steps.length}
          </div>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: 'var(--color-dusty-lilac)' }}>
            {steps[store.step].title}
          </h2>

          <div style={{ width: '100%', boxSizing: 'border-box', minHeight: '300px', flexShrink: 0 }}>
            {steps[store.step].content}
          </div>

          <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', width: '100%', boxSizing: 'border-box', marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <button 
              onClick={() => store.setStep(Math.max(0, store.step - 1))}
              style={{ ...navBtnStyle, opacity: store.step === 0 ? 0 : 1, pointerEvents: store.step === 0 ? 'none' : 'auto' }}
            >
              <ChevronLeft size={18} /> Back
            </button>
            <button 
              onClick={handleNext}
              style={{ ...navBtnStyle, background: 'var(--color-dusty-lilac)', color: 'white' }}
            >
              {store.step === steps.length - 1 ? 'Subscribe Now' : 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {showLengthModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }}
            onClick={() => setShowLengthModal(false)}
          >
            <button style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setShowLengthModal(false)}><X size={32} /></button>
            <img src="/magnet.jpg" alt="Magnet Lengths" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px' }} />
          </motion.div>
        )}

        {showArtModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px 20px', overflowY: 'auto', backdropFilter: 'blur(5px)' }}
            onClick={() => setShowArtModal(false)}
          >
            <button style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setShowArtModal(false)}><X size={32} /></button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px', width: '100%' }} onClick={e => e.stopPropagation()}>
              <img src="/tier1.jpg" alt="Tier 1" style={{ width: '100%', boxSizing: 'border-box', borderRadius: '12px' }} />
              <img src="/tier2.jpg" alt="Tier 2" style={{ width: '100%', boxSizing: 'border-box', borderRadius: '12px' }} />
              <img src="/tier3.jpg" alt="Tier 3" style={{ width: '100%', boxSizing: 'border-box', borderRadius: '12px' }} />
              <img src="/tier4.jpg" alt="Tier 4" style={{ width: '100%', boxSizing: 'border-box', borderRadius: '12px' }} />
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

const navBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  background: 'rgba(255,255,255,0.1)',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '20px',
  color: 'var(--color-dusty-lilac)',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '0.9rem'
};
