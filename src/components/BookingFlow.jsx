import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import Confetti from 'react-confetti';
import CustomCalendar from './CustomCalendar';

const PRICING = {
  'Kraaifontein, Durbanville & Surrounds': 600,
  'Table View, Blouberg & Surrounds': 800,
  'Southern Suburbs & Surrounds': 900,
  'CBD, Atlantic Seaboard & Surrounds': 1000,
  'Other Area (Custom Travel Quote)': 600
};

const SUBSCRIPTION_PACKAGES = {
  'basic': {
    id: 'basic',
    name: 'The Basic Set',
    description: 'Includes Tier 1 Art & up to Medium Length',
    price: 0
  },
  'extra': {
    id: 'extra',
    name: 'The Extra Set',
    description: 'Includes up to Tier 3 Art & up to Long Length',
    price: 350
  },
  'ultimate': {
    id: 'ultimate',
    name: 'The Ultimate Set',
    description: 'Includes up to Tier 4 Art & Any Length (XXL)',
    price: 550
  }
};

const LENGTH_UPGRADES = {
  'Short': { price: 0, name: 'Short' },
  'Medium': { price: 0, name: 'Medium' },
  'Long': { price: 100, name: 'Long' },
  'XL': { price: 150, name: 'XL' },
  'XXL': { price: 200, name: 'XXL' }
};

const ART_UPGRADES = {
  'Tier 1': { price: 0, name: 'Tier 1' },
  'Tier 2': { price: 100, name: 'Tier 2' },
  'Tier 3': { price: 200, name: 'Tier 3' },
  'Tier 4': { price: 300, name: 'Tier 4' }
};

const AREAS = Object.keys(PRICING);

export default function BookingFlow({ onClose }) {
  const [step, setStep] = useState(0);
  const [selectedArea, setSelectedArea] = useState(AREAS[0]);
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [selectedProduct, setSelectedProduct] = useState('Acrylic');
  const [selectedLength, setSelectedLength] = useState('Short');
  const [selectedArt, setSelectedArt] = useState('Tier 1');
  const [showLengthModal, setShowLengthModal] = useState(false);
  const [showArtModal, setShowArtModal] = useState(false);
  
  // User Details
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  
  // Calendar states
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const [termsAccepted, setTermsAccepted] = useState(false);
  
  let currentPrice = PRICING[selectedArea] + SUBSCRIPTION_PACKAGES[selectedPackage].price;

  const generateSteps = () => {
    return [
      {
        id: 'location',
        title: 'Location & Pricing',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', width: '100%' }}>
            <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Select your area to see the monthly subscription cost.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Your Area</label>
              <select 
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'inherit',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              >
                {AREAS.map(area => (
                  <option key={area} value={area} style={{ background: '#2D2838', color: 'white' }}>{area}</option>
                ))}
              </select>
            </div>
            
            <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Base Subscription</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>R {currentPrice.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '5px' }}>Includes 1x visit per month & travel fees</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Home Address</label>
              <input type="text" placeholder="e.g. 123 Main St, Complex Name, Unit 4" style={inputStyle} value={address} onChange={e => setAddress(e.target.value)} />
            </div>
          </div>
        )
      },
      {
        id: 'upgrades',
        title: 'Appointment Preferences',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', width: '100%' }}>
            <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>
              Let me know what length and art you're looking for! 
              Note: The basic subscription covers Tier 1 Art and up to Medium Length. Upgrades are settled on the day of your appointment, unless covered by a higher package.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                Product Preference
              </label>
              <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} style={inputStyle}>
                <option value="Acrylic" style={{ background: '#2D2838', color: 'white' }}>Acrylic</option>
                <option value="Polygel" style={{ background: '#2D2838', color: 'white' }}>Polygel</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                Preferred Length{' '}
                <span 
                  onClick={() => setShowLengthModal(true)}
                  style={{ color: 'var(--color-dusty-lilac)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
                >
                  (see reference photo)
                </span>
              </label>
              <select value={selectedLength} onChange={(e) => setSelectedLength(e.target.value)} style={inputStyle}>
                {Object.entries(LENGTH_UPGRADES).map(([key, val]) => (
                  <option key={key} value={key} style={{ background: '#2D2838', color: 'white' }}>{val.name} ({val.price === 0 ? 'Included' : '+R'+val.price})</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                Preferred Art Tier{' '}
                <span 
                  onClick={() => setShowArtModal(true)}
                  style={{ color: 'var(--color-dusty-lilac)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
                >
                  (see reference photo)
                </span>
              </label>
              <select value={selectedArt} onChange={(e) => setSelectedArt(e.target.value)} style={inputStyle}>
                {Object.entries(ART_UPGRADES).map(([key, val]) => (
                  <option key={key} value={key} style={{ background: '#2D2838', color: 'white' }}>{val.name} ({val.price === 0 ? 'Included' : '+R'+val.price})</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '5px', background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px' }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-dusty-lilac)' }}>Reference Photos Required!</strong>
              <p style={{ fontSize: '0.75rem', opacity: 0.9, margin: 0, lineHeight: '1.4' }}>
                You will need to send a reference photo of your desired set via WhatsApp so I can prep accordingly!
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'package',
        title: 'Choose Package',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', width: '100%' }}>
            <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>Select your monthly subscription tier.</p>
            {Object.values(SUBSCRIPTION_PACKAGES).map(pkg => (
              <div key={pkg.id} onClick={() => setSelectedPackage(pkg.id)} style={radioContainerStyle(selectedPackage === pkg.id)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{pkg.name}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{pkg.description}</span>
                </div>
                <div style={{ fontWeight: 'bold' }}>{pkg.price === 0 ? 'Base' : '+R' + pkg.price}</div>
              </div>
            ))}
          </div>
        )
      },
      {
        id: 'date',
        title: 'Choose Your Day',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', width: '100%' }}>
            <p style={{ opacity: 0.8, fontSize: '0.85rem', lineHeight: '1.4' }}>
              Select your preferred day of the month for your monthly subscription appointment.
            </p>
            <CustomCalendar 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              selectedTimes={selectedTimes}
              setSelectedTimes={setSelectedTimes}
              maxSelectableDates={1}
            />
          </div>
        )
      },
      {
        id: 'details',
        title: 'Your Details',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Full Name</label>
              <input type="text" placeholder="e.g. Kayla Stubbs" style={inputStyle} value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>WhatsApp Number</label>
              <input type="tel" placeholder="e.g. 082 123 4567" style={inputStyle} value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px', cursor: 'pointer' }}>
              <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} style={{ marginTop: '4px' }} />
              <span style={{ fontSize: '0.8rem', opacity: 0.9, lineHeight: '1.4' }}>
                I agree to the T&Cs. Note: 1st month subscription is payable upfront to secure your spot. Thereafter, you will be billed on the 1st of every month via debit order. Travel fee is included in the base price.
              </span>
            </label>
          </div>
        )
      }
    ];
  };

  const steps = generateSteps();

  const handleNext = () => {
    if (step === 0 && !address) return alert("Please provide your home address.");
    if (step === 3 && !selectedDate) return alert("Please select a date.");
    if (step === 4) {
      if (!fullName || !whatsapp) return alert("Please fill in your details.");
      if (!termsAccepted) return alert("You must accept the terms & conditions.");
      
      let message = `*NEW SUBSCRIPTION BOOKING!*\n\n`;
      message += `*Name:* ${fullName}\n`;
      message += `*WhatsApp:* ${whatsapp}\n`;
      message += `*Address:* ${address}\n`;
      message += `*Area:* ${selectedArea}\n`;
      message += `*Package:* ${SUBSCRIPTION_PACKAGES[selectedPackage].name}\n`;
      message += `*Total Monthly Rate:* R${currentPrice}\n\n`;
      
      message += `*NAIL PREFERENCES:*\n`;
      message += `- Product: ${selectedProduct}\n`;
      message += `- Length: ${selectedLength}\n`;
      message += `- Art Tier: ${selectedArt}\n\n`;

      message += `*Preferred Date:* ${selectedDate.toDateString()}\n`;
      message += `*Preferred Times:* ${selectedTimes.length > 0 ? selectedTimes.join(', ') : 'Any time'}\n\n`;

      message += `I agree to the T&Cs and the monthly debit order structure. I will send my reference photo shortly!`;
      
      window.open("https://wa.me/27683595032?text=" + encodeURIComponent(message), "_blank");
      onClose();
      return;
    }
    setStep(s => Math.min(steps.length - 1, s + 1));
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
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '20px'
        }}
      >
        {/* Dark Frosted Glass Overlay */}
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
          key={step}
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
            width: '100%',
            color: 'white',
            zIndex: 105,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', color: 'var(--color-dusty-lilac)' }}>
            Step {step + 1} of {steps.length}
          </div>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: 'var(--color-dusty-lilac)' }}>
            {steps[step].title}
          </h2>

          <div style={{ width: '100%', minHeight: '300px' }}>
            {steps[step].content}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <button 
              onClick={() => setStep(s => Math.max(0, s - 1))}
              style={{ ...navBtnStyle, opacity: step === 0 ? 0 : 1, pointerEvents: step === 0 ? 'none' : 'auto' }}
            >
              <ChevronLeft size={18} /> Back
            </button>
            <button 
              onClick={handleNext}
              style={{ ...navBtnStyle, background: 'var(--color-dusty-lilac)', color: 'white' }}
            >
              {step === steps.length - 1 ? 'Subscribe Now' : 'Next'} <ChevronRight size={18} />
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
              <img src="/tier1.jpg" alt="Tier 1" style={{ width: '100%', borderRadius: '12px' }} />
              <img src="/tier2.jpg" alt="Tier 2" style={{ width: '100%', borderRadius: '12px' }} />
              <img src="/tier3.jpg" alt="Tier 3" style={{ width: '100%', borderRadius: '12px' }} />
              <img src="/tier4.jpg" alt="Tier 4" style={{ width: '100%', borderRadius: '12px' }} />
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  borderRadius: '8px',
  border: '1px solid rgba(0,0,0,0.1)',
  background: 'rgba(255,255,255,0.5)',
  color: 'inherit',
  fontSize: '1rem',
  outline: 'none',
  fontFamily: 'inherit'
};

const radioContainerStyle = (selected) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  borderRadius: '12px',
  border: selected ? '2px solid var(--color-dusty-lilac)' : '2px solid rgba(0,0,0,0.1)',
  background: selected ? 'rgba(255,255,255,0.5)' : 'transparent',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
});

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
