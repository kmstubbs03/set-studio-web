import React from 'react';
import useBookingStore from '../../store/useBookingStore';

const SUBSCRIPTION_PACKAGES = {
  'basic': {
    id: 'basic',
    name: 'The Basic Set',
    description: 'Includes Tier 1 Art & up to Medium Length',
    price: 0
  },
  'standard': {
    id: 'standard',
    name: 'The Standard Set',
    description: 'Includes up to Tier 2 Art & up to Medium Long Length',
    price: 150
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

export default function PackageStep({ currentPrice }) {
  const { selectedPackage, setField } = useBookingStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', width: '100%' }}>
      <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>Select your monthly subscription tier.</p>
      {Object.values(SUBSCRIPTION_PACKAGES).map(pkg => (
        <div key={pkg.id} onClick={() => setField('selectedPackage', pkg.id)} style={radioContainerStyle(selectedPackage === pkg.id)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{pkg.name}</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{pkg.description}</span>
          </div>
          <div style={{ fontWeight: 'bold' }}>{pkg.price === 0 ? 'Base' : '+R' + pkg.price}</div>
        </div>
      ))}
      
      <div style={{ marginTop: '5px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '4px' }}>Monthly Total</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>R{currentPrice}</div>
      </div>
    </div>
  );
}

export { SUBSCRIPTION_PACKAGES };
