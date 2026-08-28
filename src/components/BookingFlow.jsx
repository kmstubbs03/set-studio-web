import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import Confetti from 'react-confetti';
import CustomCalendar from './CustomCalendar';

const PRICING = {
  'nails': {
    'Kraaifontein, Durbanville & Surrounds': 1000,
    'Table View, Blouberg & Surrounds': 1300,
    'Southern Suburbs & Surrounds': 1500,
    'CBD, Atlantic Seaboard & Surrounds': 1800,
    'Other Area (Custom Travel Quote)': 1000
  },
  'lashes': {
    'Kraaifontein, Durbanville & Surrounds': 800,
    'Table View, Blouberg & Surrounds': 1000,
    'Southern Suburbs & Surrounds': 1200,
    'CBD, Atlantic Seaboard & Surrounds': 1400,
    'Other Area (Custom Travel Quote)': 800
  },
  'the-set': {
    'Kraaifontein, Durbanville & Surrounds': 1500,
    'Table View, Blouberg & Surrounds': 2000,
    'Southern Suburbs & Surrounds': 2400,
    'CBD, Atlantic Seaboard & Surrounds': 2900,
    'Other Area (Custom Travel Quote)': 1500
  }
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
  's-m': { name: 'Short/Medium (s-m)', price: 0 },
  'ml-l': { name: 'Medium-Long/Long (ml-l)', price: 50 },
  'xl-xxl': { name: 'X-Long/XX-Long (xl-xxl)', price: 70 },
  'duck': { name: 'Duck ends/flare tips', price: 90 }
};

const ART_UPGRADES = {
  'tier1': { name: 'Tier 1 Art', price: 'Included' },
  'tier2': { name: 'Tier 2 Art', price: '+ R150 - R220' },
  'tier3': { name: 'Tier 3 Art', price: '+ R260 - R400' },
  'tier4': { name: 'Tier 4 Art', price: '+ R450 - R750+' }
};

const LASH_PACKAGES = {
  'classic': { id: 'classic', name: 'The Classic Set', description: '1:1 ratio for a natural, mascara-look.', price: 0 },
  'hybrid': { id: 'hybrid', name: 'The Hybrid Set', description: 'A textured mix of classic and volume fans.', price: 150 },
  'volume': { id: 'volume', name: 'The Volume Set', description: 'Full, dramatic volume fans for maximum density.', price: 300 }
};
const LASH_STYLES = ['Open Eye', 'Wispy', 'Fox Eye', 'Anime', 'Classic Set'];
const LASH_CURLS = ['C-Curl (Natural)', 'CC-Curl (Lifted)', 'D-Curl (Dramatic)'];
const LASH_LENGTHS = ['Short (8-11mm)', 'Medium (12-15mm)', 'Long (16-20mm)'];

const AREAS = Object.keys(PRICING['nails']);

export default function BookingFlow({ worldId, worldTitle, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedArea, setSelectedArea] = useState('Kraaifontein, Durbanville & Surrounds');
  
  // Package/Upgrade selections
  const [selectedPackage, setSelectedPackage] = useState('basic'); // for nails
  const [selectedProduct, setSelectedProduct] = useState('Acrylic'); // for nails
  const [selectedLength, setSelectedLength] = useState('s-m'); // for nails
  const [selectedArt, setSelectedArt] = useState('tier1'); // for nails

  // Lash selections
  const [selectedLashPackage, setSelectedLashPackage] = useState('classic');
  const [selectedLashStyle, setSelectedLashStyle] = useState('Open Eye');
  const [selectedLashCurl, setSelectedLashCurl] = useState('C-Curl (Natural)');
  const [selectedLashLength, setSelectedLashLength] = useState('Medium (12-15mm)');

  const [showLengthModal, setShowLengthModal] = useState(false);
  const [showArtModal, setShowArtModal] = useState(false);
  const [showLashStyleModal, setShowLashStyleModal] = useState(false);
  const [showLashCurlModal, setShowLashCurlModal] = useState(false);
  const [showLashLengthModal, setShowLashLengthModal] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  
  // User Details
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [preferences, setPreferences] = useState('');
  
  // Calendar states
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [bookingNote, setBookingNote] = useState('');

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [policiesAccepted, setPoliciesAccepted] = useState(false);
  
  let currentPrice = PRICING[worldId] ? PRICING[worldId][selectedArea] : 0;
  if (worldId === 'nails') {
    currentPrice += SUBSCRIPTION_PACKAGES[selectedPackage].price;
  }
  if (worldId === 'lashes') {
    currentPrice += LASH_PACKAGES[selectedLashPackage].price;
  }

  // Determine steps dynamically
  const generateSteps = () => {
    let baseSteps = [
      {
        id: 'location',
        title: 'Location & Pricing',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', width: '100%' }}>
            <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Select your area to see the {worldId === 'lashes' ? 'base' : 'monthly subscription'} cost.</p>
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
                  <option key={area} value={area} style={{ color: 'black' }}>{area}</option>
                ))}
              </select>
            </div>
            
            {worldId === 'the-set' && (
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px', borderRadius: '12px', fontSize: '0.85rem', lineHeight: '1.5' }}>
                <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--color-slate-plum)' }}>What's Included in The Set?</strong>
                <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><strong>2x mobile visits</strong> per month to your selected area</li>
                  <li><strong>Each visit includes:</strong>
                    <ul style={{ paddingLeft: '20px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px', listStyleType: 'circle' }}>
                      <li>Fresh Base Nail set (Tier 1 Art & up to Medium Length)</li>
                      <li>Fresh Base Lash set (Classic 1:1 Density)</li>
                    </ul>
                  </li>
                  <li>All travel fees included</li>
                </ul>
                <div style={{ opacity: 0.8, marginTop: '10px', fontStyle: 'italic' }}>
                  *You can upgrade your nail length, art tier, and lash density in the next steps!
                </div>
              </div>
            )}

            <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Base {worldId === 'lashes' ? 'Service' : 'Subscription'}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>R {currentPrice.toLocaleString()}</div>
              {(worldId === 'nails') && <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '5px' }}>Includes 2x visits & travel fees</div>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Home Address</label>
              <input type="text" placeholder="e.g. 123 Main St, Complex Name, Unit 4" style={inputStyle} value={address} onChange={e => setAddress(e.target.value)} />
            </div>
          </div>
        )
      }
    ];

    if (worldId === 'nails') {
      baseSteps.push({
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
                <option value="Acrylic" style={{color: 'black'}}>Acrylic</option>
                <option value="Polygel" style={{color: 'black'}}>Polygel</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                Preferred Length{' '}
                <span 
                  onClick={() => setShowLengthModal(true)}
                  style={{ 
                    color: 'var(--color-slate-plum)',
                    cursor: 'pointer', 
                    textDecoration: 'underline', 
                    fontWeight: 'bold',
                  }}
                >
                  (see reference photo)
                </span>
              </label>
              <select value={selectedLength} onChange={(e) => setSelectedLength(e.target.value)} style={inputStyle}>
                {Object.entries(LENGTH_UPGRADES).map(([key, val]) => (
                  <option key={key} value={key} style={{color: 'black'}}>{val.name} ({val.price === 0 ? 'Included' : `+R${val.price}`})</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                Preferred Art Tier{' '}
                <span 
                  onClick={() => setShowArtModal(true)}
                  style={{ 
                    color: 'var(--color-slate-plum)',
                    cursor: 'pointer', 
                    textDecoration: 'underline', 
                    fontWeight: 'bold',
                  }}
                >
                  (see reference photo)
                </span>
              </label>
              <select value={selectedArt} onChange={(e) => setSelectedArt(e.target.value)} style={inputStyle}>
                {Object.entries(ART_UPGRADES).map(([key, val]) => (
                  <option key={key} value={key} style={{color: 'black'}}>{val.name} ({val.price})</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '5px', background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px' }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-slate-plum)' }}>Reference Photos Required! 📸</strong>
              <p style={{ fontSize: '0.75rem', opacity: 0.9, margin: 0, lineHeight: '1.4' }}>
                Since Tier 2+ prices vary, please remember to attach <strong>1-5 reference photos</strong> of the nail art you want in the final WhatsApp message (Step 7) so Kayla can give you an exact quote unless covered by a higher subscription
              </p>
            </div>
          </div>
        )
      });
    }

    if (worldId === 'nails') {
      baseSteps.push({
        id: 'package',
        title: 'Choose Your Nail Package',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', width: '100%' }}>
            <p style={{ opacity: 0.8, fontSize: '0.85rem', marginBottom: '5px' }}>
              Select a higher tier to cover your art and length costs upfront for the month!
            </p>
            {Object.values(SUBSCRIPTION_PACKAGES).map(pkg => (
              <motion.label 
                key={pkg.id} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  ...radioContainerStyle(selectedPackage === pkg.id),
                  cursor: 'pointer',
                  boxShadow: selectedPackage === pkg.id ? '0 0 15px rgba(185, 180, 199, 0.4)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input type="radio" checked={selectedPackage === pkg.id} onChange={() => setSelectedPackage(pkg.id)} style={{ accentColor: 'var(--color-slate-plum)', marginTop: '4px' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{pkg.name}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{pkg.description}</div>
                  </div>
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '1rem', whiteSpace: 'nowrap' }}>
                  {pkg.price === 0 ? 'Included' : `+R ${pkg.price}/mo`}
                </div>
              </motion.label>
            ))}
          </div>
        )
      });
    }

    if (worldId === 'lashes') {
      baseSteps.push({
        id: 'lash-package',
        title: 'Choose Your Density',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', width: '100%' }}>
            <p style={{ opacity: 0.8, fontSize: '0.85rem', marginBottom: '5px' }}>
              Select the fullness of your lash set. This sets your base price.
            </p>
            {Object.values(LASH_PACKAGES).map(pkg => (
              <motion.label 
                key={pkg.id} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  ...radioContainerStyle(selectedLashPackage === pkg.id),
                  cursor: 'pointer',
                  boxShadow: selectedLashPackage === pkg.id ? '0 0 15px rgba(185, 180, 199, 0.4)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input type="radio" checked={selectedLashPackage === pkg.id} onChange={() => setSelectedLashPackage(pkg.id)} style={{ accentColor: 'var(--color-slate-plum)', marginTop: '4px' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{pkg.name}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{pkg.description}</div>
                  </div>
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '1rem', whiteSpace: 'nowrap' }}>
                  {pkg.price === 0 ? 'Included' : `+R ${pkg.price}/mo`}
                </div>
              </motion.label>
            ))}
            
            <a 
              href={`https://wa.me/27683595032?text=${encodeURIComponent("Hi Kayla! 💜 I'm on your website looking to book lashes, but I'm not sure which density or style would suit my eye shape best. Could you give me some advice?")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: '10px',
                color: 'var(--color-slate-plum)',
                fontSize: '0.85rem',
                textDecoration: 'underline',
                fontWeight: 'bold',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'block'
              }}
            >
              Not sure what to pick? Click here to ask me for advice! 💋
            </a>

          </div>
        )
      });
      
      baseSteps.push({
        id: 'lash-customization',
        title: 'Customize Your Look',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', width: '100%' }}>
            <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>
              Design your perfect set! All customizations are included in your package price.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                Style / Mapping{' '}
                <span onClick={() => setShowLashStyleModal(true)} style={{ color: 'var(--color-slate-plum)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>(see reference)</span>
              </label>
              <select value={selectedLashStyle} onChange={(e) => setSelectedLashStyle(e.target.value)} style={inputStyle}>
                {LASH_STYLES.map(style => <option key={style} value={style} style={{color: 'black'}}>{style}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                Curl Type{' '}
                <span onClick={() => setShowLashCurlModal(true)} style={{ color: 'var(--color-slate-plum)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>(see reference)</span>
              </label>
              <select value={selectedLashCurl} onChange={(e) => setSelectedLashCurl(e.target.value)} style={inputStyle}>
                {LASH_CURLS.map(curl => <option key={curl} value={curl} style={{color: 'black'}}>{curl}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                Length{' '}
                <span onClick={() => setShowLashLengthModal(true)} style={{ color: 'var(--color-slate-plum)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>(see reference)</span>
              </label>
              <select value={selectedLashLength} onChange={(e) => setSelectedLashLength(e.target.value)} style={inputStyle}>
                {LASH_LENGTHS.map(len => <option key={len} value={len} style={{color: 'black'}}>{len}</option>)}
              </select>
            </div>
          </div>
        )
      });
    }

    baseSteps = baseSteps.concat([
      {
        id: 'details',
        title: 'Your Details',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', width: '100%' }}>
            <input type="text" placeholder="Full Name" style={inputStyle} value={fullName} onChange={e => setFullName(e.target.value)} />
            <input type="tel" placeholder="WhatsApp Number" style={inputStyle} value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            
            <CustomCalendar 
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTimes={selectedTimes}
              setSelectedTimes={setSelectedTimes}
              bookingNote={bookingNote}
              setBookingNote={setBookingNote}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Special Preferences (Optional)</label>
              <textarea 
                placeholder="Any sensitivities, pet allergies, or specific preferences we should know about before coming to your home?"
                rows={3}
                style={{...inputStyle, resize: 'none', fontFamily: 'inherit' }}
                value={preferences} onChange={e => setPreferences(e.target.value)}
              />
            </div>
          </div>
        )
      },
      {
        id: 'terms',
        title: 'Review & Terms',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', width: '100%' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px', borderRadius: '12px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>Area: {selectedArea}</div>
              
              {(worldId === 'nails') && (
                <>
                  <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>Nail Package: {SUBSCRIPTION_PACKAGES[selectedPackage].name}</div>
                  <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>Nail Length: {LENGTH_UPGRADES[selectedLength].name} | Art: {ART_UPGRADES[selectedArt].name}</div>
                </>
              )}
              
              {(worldId === 'lashes') && (
                <>
                  <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>Lash Density: {LASH_PACKAGES[selectedLashPackage].name}</div>
                  <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>Lash Customization: {selectedLashStyle} | {selectedLashCurl} | {selectedLashLength}</div>
                </>
              )}
              
              {selectedDate && (
                <div style={{ opacity: 0.8, fontSize: '0.9rem', color: 'var(--color-dusty-lilac)', fontWeight: 'bold', marginTop: '5px' }}>
                  Date: {selectedDate.toLocaleDateString('en-GB')}
                  {selectedTimes.length > 0 && ` | Times: ${selectedTimes.join(', ')}`}
                </div>
              )}
              {bookingNote && (
                 <div style={{ opacity: 0.8, fontSize: '0.9rem', fontStyle: 'italic', marginTop: '2px' }}>
                   Note: {bookingNote}
                 </div>
              )}
              
              <div style={{ opacity: 0.8, fontSize: '0.9rem', marginTop: '10px' }}>Total {worldId === 'nails' ? 'Monthly' : 'Base'}: R {currentPrice.toLocaleString()}</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px', padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={termsAccepted} 
                  onChange={(e) => setTermsAccepted(e.target.checked)} 
                  style={{ accentColor: 'var(--color-slate-plum)', marginTop: '3px', cursor: 'pointer' }} 
                />
                <span style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                  I acknowledge that Set Studio is a mobile service, and by continuing I am subscribing to a monthly recurring appointment (or base service) as selected above.
                </span>
              </label>

              <div style={{ marginTop: '10px', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: 'var(--color-dusty-lilac)' }}>Salon Policies</h4>
                <div style={{ maxHeight: '150px', overflowY: 'auto', fontSize: '0.75rem', lineHeight: '1.5', paddingRight: '10px', opacity: 0.9 }}>
                  <strong>1. Cancellation, Lateness & Rescheduling:</strong> 48-hour notice of cancellation is required, otherwise 40% of the total price is forfeited. A 15-minute grace period applies for late arrivals; if you aren't ready, the appointment may be cancelled. Subscriptions can be paused or cancelled via WhatsApp.<br/><br/>
                  <strong>2. "Use it or Lose it" Subscription Policy:</strong> Subscription visits do not roll over to the next month. If you skip a visit and cannot reschedule it within the same billing cycle, that visit is forfeited.<br/><br/>
                  <strong>3. Sick & Health Policy:</strong> If you are feeling unwell, have flu-like symptoms, or have an eye/nail infection, you must reschedule. We reserve the right to refuse service upon arrival if there are health or safety risks.<br/><br/>
                  <strong>4. 48-Hour Fix Guarantee & Aftercare:</strong> If a nail chips or a lash falls out within the first 48 hours due to application issues, it is fixed completely free of charge. After 48 hours, standard fix-up rates apply (though subscriptions cover general fills/fix-ups).<br/><br/>
                  <strong>5. Safe Working Environment Policy:</strong> Pets and children are completely welcome! Clients just need to ensure the workspace is well-lit, clean, and distraction-free. The environment is smoke and drink friendly as long as it doesn't affect the quality of work.<br/><br/>
                  <strong>6. Booking & Deposits Policy:</strong> Clients can choose to pay the full price when booking or a 40% deposit with the rest due on the day. Payments can be made via EFT, cash, or PayShap.<br/><br/>
                  <strong>7. Foreign Fills & Preparation Policy:</strong> We do not remove other salons' work. Nails must be completely bare for the first appointment. Lashes must be clean, and completely oil and makeup-free.<br/><br/>
                  <strong>8. Home Setup Policy:</strong> The client simply needs to provide a table and 2 chairs for the appointment.
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={policiesAccepted} 
                  onChange={(e) => setPoliciesAccepted(e.target.checked)} 
                  style={{ accentColor: 'var(--color-slate-plum)', marginTop: '3px', cursor: 'pointer' }} 
                />
                <span style={{ fontSize: '0.85rem', lineHeight: '1.4', fontWeight: 'bold' }}>
                  I have read and agree to all Set Studio policies listed above.
                </span>
              </label>
            </div>
          </div>
        )
      }
    ]);
    return baseSteps;
  };

  const steps = generateSteps();

  const isNextDisabled = () => {
    const currentStep = steps[activeIndex];
    if (!currentStep) return false;
    
    if (currentStep.id === 'location') {
      if (!address.trim()) return true;
    }
    
    if (currentStep.id === 'details') {
      if (!fullName.trim() || !whatsapp.trim() || !selectedDate || selectedTimes.length === 0) {
        return true;
      }
    }
    
    if (currentStep.id === 'terms' && (!termsAccepted || !policiesAccepted)) {
      return true;
    }
    
    return false;
  };

  const nextStep = () => {
    if (!isNextDisabled()) {
      setActiveIndex(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }
  };

  const prevStep = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        const currentStep = steps[activeIndex];
        let disabled = false;
        if (currentStep && currentStep.id === 'location') {
           if (!address.trim()) disabled = true;
        }
        if (currentStep && currentStep.id === 'details') {
           if (!fullName.trim() || !whatsapp.trim() || !selectedDate || selectedTimes.length === 0) disabled = true;
        }
        if (currentStep && currentStep.id === 'terms' && !termsAccepted) disabled = true;

        if (!disabled) {
           if (activeIndex === steps.length - 1) sendWhatsApp();
           else nextStep(); 
        } 
      }
      if (e.key === 'ArrowLeft') prevStep();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, activeIndex, steps, termsAccepted, fullName, whatsapp, address, selectedDate, selectedTimes, bookingNote]);

  const sendWhatsApp = () => {
    const phone = "27750656459";
    
    const dateStr = selectedDate ? selectedDate.toLocaleDateString('en-GB') : 'TBD';
    const timeStr = selectedTimes.join(', ') || 'TBD';

    const emojiHeart = String.fromCharCode(0xD83D, 0xDC9C);
    const emojiFairy = String.fromCharCode(0xD83E, 0xDDDA);
    const emojiCheetah = String.fromCharCode(0xD83D, 0xDC06);
    const emojiKiss = String.fromCharCode(0xD83D, 0xDC8B);
    const emojiMoney = String.fromCharCode(0xD83D, 0xDCB0);
    const emojiNails = String.fromCharCode(0xD83D, 0xDC85);

    let message = `Hey, Kayla ${emojiHeart} I'd love to book a subscription with you!\n\n`;
    message += `${emojiFairy} My Service Details:\n`;
    message += `- Service: ${worldTitle}\n`;
    message += `- Area: ${selectedArea}\n`;
    
    if (worldId === 'nails') {
       message += `- Nail Package: ${SUBSCRIPTION_PACKAGES[selectedPackage].name}\n`;
       message += `- Nail Product: ${selectedProduct}\n`;
       message += `- Nail Length: ${LENGTH_UPGRADES[selectedLength].name}\n`;
       message += `- Nail Art: ${ART_UPGRADES[selectedArt].name}\n`;
    }

    if (worldId === 'lashes') {
       message += `- Lash Density: ${LASH_PACKAGES[selectedLashPackage].name}\n`;
       message += `- Lash Style: ${selectedLashStyle}\n`;
       message += `- Lash Curl: ${selectedLashCurl}\n`;
       message += `- Lash Length: ${selectedLashLength}\n`;
    }
    
    message += `\n${emojiCheetah} My Availability:\n`;
    message += `- Preferred Date: ${dateStr}\n`;
    message += `- Preferred Times: ${timeStr}\n`;
    if (bookingNote) {
       message += `- Note: ${bookingNote}\n`;
    }
    
    message += `\n${emojiKiss} My Info:\n`;
    message += `- Name: ${fullName}\n`;
    message += `- Address: ${address}\n`;
    message += `- WhatsApp: ${whatsapp}\n`;
    if (preferences) {
       message += `- Preferences/Allergies: ${preferences}\n`;
    }
    
    message += `\n${emojiMoney} Estimated Total: R${currentPrice.toLocaleString()}\n`;
    message += `Please let me know if these times work for you and how I can pay to secure my spot! ${emojiNails}`;
    
    const text = message;
    
    const pkgDetails = worldId === 'nails' 
      ? SUBSCRIPTION_PACKAGES[selectedPackage].name 
      : LASH_PACKAGES[selectedLashPackage].name;

    const formData = {
      fullName,
      whatsapp,
      address,
      packageDetails: `${worldTitle} - ${pkgDetails}`,
      date: `${dateStr} (${timeStr})`
    };

    fetch('https://script.google.com/macros/s/AKfycbxG1JD2KbEeMHPxF2rsW9j4EiXzGUkHXHEhQntl6dAlPXably_iy5CkIaqyVsE7OQs/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(formData)
    }).catch(err => console.error('Error saving to sheet:', err));
    
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`, '_blank');
    
    setIsSuccess(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url(/leopard_stars.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          perspective: '1000px'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 101 }} />
        
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'none', border: 'none', color: 'white', cursor: 'pointer',
            padding: '10px', zIndex: 110,
            opacity: 0.8
          }}
        >
          <X size={32} />
        </button>

        {isSuccess ? (
          <>
            <Confetti 
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={300}
              gravity={0.2}
              colors={['#B9B4C7', '#5C5470', '#E6E5E8', '#FAF6F0']}
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-panel"
              style={{
                width: '90%', maxWidth: '400px', padding: '40px 20px',
                textAlign: 'center', borderRadius: '24px',
                color: 'var(--color-slate-plum)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
                zIndex: 105,
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)'
              }}
            >
            <CheckCircle2 size={64} style={{ color: 'var(--color-slate-plum)' }} />
            <h2 style={{ fontSize: '2rem', margin: 0 }}>Booking Secured!</h2>
            <p style={{ opacity: 0.8, lineHeight: '1.5' }}>
              I've received your booking request! 
              I'll be in touch shortly via WhatsApp to confirm your exact slot and arrange payment.
            </p>
            <button 
              onClick={onClose}
              style={{
                background: 'var(--color-dusty-lilac)', color: 'var(--color-slate-plum)',
                padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', border: 'none',
                marginTop: '10px', cursor: 'pointer'
              }}
            >
              Back Home
            </button>
            </motion.div>
          </>
        ) : (
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transformStyle: 'preserve-3d', zIndex: 105 }}>
            {steps.map((step, index) => {
              const offset = index - activeIndex;
              const isCenter = offset === 0;
              
              if (Math.abs(offset) > 2) return null;

              return (
                <motion.div
                  key={step.id}
                  animate={{
                    x: offset * 120 + '%',
                    z: isCenter ? 0 : -200,
                    rotateY: offset * -25,
                    opacity: isCenter ? 1 : (Math.abs(offset) === 1 ? 0.4 : 0),
                    scale: isCenter ? 1 : 0.8
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  style={{
                    position: 'absolute',
                    width: '90%',
                    maxWidth: '500px',
                    height: 'auto',
                    minHeight: '400px',
                    maxHeight: '85vh',
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    borderRadius: '30px',
                    padding: '40px 30px 60px 30px', // Extra bottom padding for sticky footer
                    color: 'var(--color-slate-plum)',
                    display: 'flex',
                    flexDirection: 'column',
                    pointerEvents: isCenter ? 'auto' : 'none',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ textAlign: 'center', flexShrink: 0, marginBottom: '20px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', opacity: 0.5, marginBottom: '5px', letterSpacing: '1px' }}>
                      STEP {index + 1} OF {steps.length}
                    </div>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{step.title}</h2>
                  </div>
                  
                  <div style={{ 
                    overflowY: 'auto', 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    paddingRight: '5px',
                    marginBottom: '15px',
                    flex: 1,
                    minHeight: 0
                  }}>
                    {step.content}
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    width: '100%', 
                    marginTop: 'auto',
                    flexShrink: 0
                  }}>
                    {index > 0 ? (
                      <button onClick={prevStep} style={navBtnStyle}>
                        <ChevronLeft size={20} /> Take me back 🔙
                      </button>
                    ) : (
                      <div />
                    )}
                    
                    {index < steps.length - 1 ? (
                      <button 
                        onClick={nextStep} 
                        disabled={isNextDisabled()}
                        style={{
                          ...navBtnStyle, 
                          background: 'var(--color-dusty-lilac)', 
                          color: 'var(--color-slate-plum)',
                          opacity: isNextDisabled() ? 0.5 : 1,
                          cursor: isNextDisabled() ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Ooh, next step! ✨ <ChevronRight size={20} />
                      </button>
                    ) : (
                      <button 
                        onClick={sendWhatsApp} 
                        disabled={isNextDisabled()}
                        style={{
                          ...navBtnStyle, 
                          background: 'var(--color-dusty-lilac)', 
                          color: 'var(--color-slate-plum)',
                          opacity: isNextDisabled() ? 0.5 : 1,
                          cursor: isNextDisabled() ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Secure my spot! 💅 <ChevronRight size={20} />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Live Summary Sticky Footer */}
            <AnimatePresence>
              {activeIndex < steps.length - 1 && (
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    background: 'var(--color-dusty-lilac)',
                    color: 'var(--color-slate-plum)',
                    padding: '12px 24px',
                    borderRadius: '24px',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                    zIndex: 110,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span>Running Total:</span>
                  <span>R {currentPrice.toLocaleString()}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showLengthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.85)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => setShowLengthModal(false)}
          >
            <button style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setShowLengthModal(false)}>
              <X size={32} />
            </button>
            <img src="/magnet.jpg" alt="Magnet Lengths" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px' }} />
          </motion.div>
        )}

        {showArtModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.85)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '60px 20px 20px',
              overflowY: 'auto',
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => setShowArtModal(false)}
          >
            <button style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setShowArtModal(false)}>
              <X size={32} />
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px', width: '100%' }} onClick={e => e.stopPropagation()}>
              <img src="/tier1.jpg" alt="Tier 1" style={{ width: '100%', borderRadius: '12px' }} />
              <img src="/tier2.jpg" alt="Tier 2" style={{ width: '100%', borderRadius: '12px' }} />
              <img src="/tier3.jpg" alt="Tier 3" style={{ width: '100%', borderRadius: '12px' }} />
              <img src="/tier4.jpg" alt="Tier 4" style={{ width: '100%', borderRadius: '12px' }} />
            </div>
          </motion.div>
        )}

        {showLashStyleModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px 20px', overflowY: 'auto', backdropFilter: 'blur(5px)' }}
            onClick={() => setShowLashStyleModal(false)}
          >
            <button style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setShowLashStyleModal(false)}><X size={32} /></button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px', width: '100%' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-dusty-lilac)', fontSize: '0.9rem', fontWeight: 'bold' }}>Open Eye</span>
                <img src="/Open-eye refrence.jpeg" alt="Open Eye" style={{ width: '100%', borderRadius: '12px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-dusty-lilac)', fontSize: '0.9rem', fontWeight: 'bold' }}>Wispy</span>
                <img src="/Whispy refrence.jpeg" alt="Wispy" style={{ width: '100%', borderRadius: '12px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-dusty-lilac)', fontSize: '0.9rem', fontWeight: 'bold' }}>Fox Eye</span>
                <img src="/foxeye refrence.jpeg" alt="Fox Eye" style={{ width: '100%', borderRadius: '12px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-dusty-lilac)', fontSize: '0.9rem', fontWeight: 'bold' }}>Anime</span>
                <img src="/anime refrence.jpeg" alt="Anime" style={{ width: '100%', borderRadius: '12px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-dusty-lilac)', fontSize: '0.9rem', fontWeight: 'bold' }}>Classic Set</span>
                <img src="/classic refrence.jpeg" alt="Classic" style={{ width: '100%', borderRadius: '12px' }} />
              </div>
            </div>
          </motion.div>
        )}
        
        {showLashCurlModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }}
            onClick={() => setShowLashCurlModal(false)}
          >
            <button style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setShowLashCurlModal(false)}><X size={32} /></button>
            <img src="/Lash curl refrence.jpeg" alt="Lash Curls" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px' }} />
          </motion.div>
        )}

        {showLashLengthModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }}
            onClick={() => setShowLashLengthModal(false)}
          >
            <button style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setShowLashLengthModal(false)}><X size={32} /></button>
            <img src="/Lash length refrence.jpeg" alt="Lash Lengths" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px' }} />
          </motion.div>
        )}
      </AnimatePresence>
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
  border: selected ? '2px solid var(--color-slate-plum)' : '2px solid rgba(0,0,0,0.1)',
  background: selected ? 'rgba(255,255,255,0.5)' : 'transparent',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
});

const navBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  background: 'rgba(0,0,0,0.05)',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '20px',
  color: 'var(--color-slate-plum)',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '0.9rem'
};
