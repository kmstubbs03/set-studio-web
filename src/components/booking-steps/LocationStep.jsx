import React from 'react';
import { ChevronRight } from 'lucide-react';
import useBookingStore from '../../store/useBookingStore';

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  padding: '12px 15px',
  borderRadius: '8px',
  border: '1px solid rgba(0,0,0,0.1)',
  background: 'rgba(255,255,255,0.5)',
  color: 'inherit',
  fontSize: '1rem',
  outline: 'none',
  fontFamily: 'inherit'
};

export default function LocationStep({ isSubscription = false }) {
  const { 
    selectedArea, address, travelFee, distanceLoading, distanceError, 
    setField, calculateTravelFee 
  } = useBookingStore();

  const handleAddressBlur = () => {
    calculateTravelFee();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', width: '100%' }}>
      <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>
        Enter your exact address to calculate the travel fee. (Travel is charged at R12/km for the round trip).
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Suburb / Area (Very Important!)</label>
        <input 
          type="text" 
          placeholder="e.g. Cape Town CBD" 
          style={inputStyle} 
          value={selectedArea} 
          onChange={e => { setField('selectedArea', e.target.value); setField('distanceError', ''); }}
          onKeyDown={e => { if (e.key === 'Enter') handleAddressBlur(); }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Street Address</label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
          <input 
            type="text" 
            placeholder="e.g. 15 Main Road" 
            style={{ ...inputStyle, flex: 1, margin: 0 }} 
            value={address} 
            onChange={e => { setField('address', e.target.value); setField('distanceError', ''); }}
            onKeyDown={e => { if (e.key === 'Enter') handleAddressBlur(); }}
            onBlur={handleAddressBlur}
          />
          <button 
            onClick={handleAddressBlur}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '0 15px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Calculate Travel Fee"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        {distanceLoading && <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Calculating travel fee...</div>}
        {distanceError && <div style={{ fontSize: '0.8rem', color: '#ff8888' }}>{distanceError}</div>}
      </div>
      
      <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px' }}>
        <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Base Price & Travel Fee</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{travelFee !== null ? `R${250 + travelFee}` : '—'}</div>
        <div style={{ fontSize: '0.75rem', opacity: 0.8, color: 'var(--color-dusty-lilac)', marginTop: '5px' }}>
          {travelFee !== null ? `Base: R250 | Travel: R${travelFee}` : 'Base: R250 | Travel: pending'}
        </div>
        <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '5px' }}>
          {isSubscription ? 'Package add-ons selected next.' : 'Nail art and length upgrades added in the next step.'}
        </div>
      </div>
    </div>
  );
}
