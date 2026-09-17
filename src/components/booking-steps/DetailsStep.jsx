import React from 'react';
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

export default function DetailsStep({ isSubscription = false, priceDisplay }) {
  const { fullName, whatsapp, termsAccepted, setField } = useBookingStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Full Name</label>
        <input 
          type="text" 
          placeholder="e.g. Kayla Stubbs" 
          style={inputStyle} 
          value={fullName} 
          onChange={e => setField('fullName', e.target.value)} 
        />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>WhatsApp Number</label>
        <input 
          type="tel" 
          placeholder="e.g. 082 123 4567" 
          style={inputStyle} 
          value={whatsapp} 
          onChange={e => setField('whatsapp', e.target.value)} 
        />
      </div>

      <div style={{ marginTop: '5px', background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{isSubscription ? 'Monthly Total' : 'Estimated Total'}</div>
          <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '2px' }}>
            {isSubscription ? 'Travel Included' : 'Area + Length + Art'}
          </div>
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>{priceDisplay}</div>
      </div>

      {!isSubscription && (
        <div style={{ marginTop: '10px', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', fontSize: '0.75rem', lineHeight: '1.5', opacity: 0.8, maxHeight: '120px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.1)' }}>
          <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--color-dusty-lilac)' }}>Terms & Conditions</strong>
          <ul style={{ margin: 0, paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>A non-refundable deposit is required to secure your booking.</li>
            <li>The quoted price is an estimate. The final price will be confirmed via WhatsApp once reference pictures are reviewed.</li>
            <li>Please ensure a table and two chairs are available for the appointment.</li>
            <li>Soak-offs are included in the price but must be requested when booking your appointment.</li>
            <li>Cancellations or rescheduling must be done at least 24 hours prior to the appointment.</li>
          </ul>
        </div>
      )}

      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px', cursor: 'pointer' }}>
        <input 
          type="checkbox" 
          checked={termsAccepted} 
          onChange={e => setField('termsAccepted', e.target.checked)} 
          style={{ marginTop: '4px' }} 
        />
        <span style={{ fontSize: '0.8rem', opacity: 0.9, lineHeight: '1.4' }}>
          {isSubscription 
            ? "I agree to the T&Cs. Note: 1st month subscription is payable upfront to secure your spot. Thereafter, you will be billed on the 1st of every month. Travel fee is included in the base price."
            : "I have read and agree to the Terms & Conditions above."
          }
        </span>
      </label>
    </div>
  );
}
