import React from 'react';
import useBookingStore from '../../store/useBookingStore';

export const LENGTH_UPGRADES = {
  'Short': { price: 0, name: 'Short' },
  'Medium': { price: 25, name: 'Medium' },
  'Medium Long': { price: 50, name: 'Medium Long' },
  'Long': { price: 100, name: 'Long' },
  'XL': { price: 150, name: 'XL' },
  'XXL': { price: 200, name: 'XXL' }
};

export const ART_UPGRADES = {
  'No Art': { price: 0, min: 0, max: 0, name: 'No Art' },
  'Tier 1': { price: 0, min: 50, max: 100, name: 'Tier 1' },
  'Tier 2': { price: 100, min: 100, max: 200, name: 'Tier 2' },
  'Tier 3': { price: 200, min: 200, max: 300, name: 'Tier 3' },
  'Tier 4': { price: 300, min: 300, max: 400, name: 'Tier 4' }
};

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

export default function PreferencesStep({ 
  isSubscription = false, 
  onShowLengthModal, 
  onShowArtModal,
  priceDisplay 
}) {
  const { 
    selectedProduct, selectedLength, selectedArt, needsSoakOff,
    referencePhotoUrl, isUploadingPhoto, photoUploadError,
    setField
  } = useBookingStore();

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setField('isUploadingPhoto', true);
    setField('photoUploadError', '');

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result.split(',')[1];
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image })
        });
        
        const data = await res.json();
        if (data.success) {
          setField('referencePhotoUrl', data.url);
        } else {
          setField('photoUploadError', data.error || 'Failed to upload photo');
        }
        setField('isUploadingPhoto', false);
      };
      reader.onerror = () => {
        setField('photoUploadError', 'Failed to read file');
        setField('isUploadingPhoto', false);
      };
    } catch (err) {
      setField('photoUploadError', 'Something went wrong');
      setField('isUploadingPhoto', false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', width: '100%' }}>
      <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>
        Let me know what length and art you're looking for! 
        {isSubscription 
          ? " Note: The basic subscription covers Tier 1 Art and up to Medium Length. Upgrades are settled on the day of your appointment, unless covered by a higher package."
          : " The final price will be confirmed once you send your reference photo on WhatsApp."}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
          Product Preference
        </label>
        <select value={selectedProduct} onChange={(e) => setField('selectedProduct', e.target.value)} style={inputStyle}>
          <option value="Acrylic" style={{ background: '#2D2838', color: 'white' }}>Acrylic</option>
          <option value="Polygel" style={{ background: '#2D2838', color: 'white' }}>Polygel</option>
          <option value="I don't mind" style={{ background: '#2D2838', color: 'white' }}>I don't mind</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
          Preferred Length{' '}
          <span 
            onClick={onShowLengthModal}
            style={{ color: 'var(--color-dusty-lilac)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
          >
            (see reference photo)
          </span>
        </label>
        <select value={selectedLength} onChange={(e) => setField('selectedLength', e.target.value)} style={inputStyle}>
          {Object.entries(LENGTH_UPGRADES).map(([key, val]) => (
            <option key={key} value={key} style={{ background: '#2D2838', color: 'white' }}>{val.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
          Preferred Art Tier{' '}
          <span 
            onClick={onShowArtModal}
            style={{ color: 'var(--color-dusty-lilac)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
          >
            (see reference photo)
          </span>
        </label>
        <select value={selectedArt} onChange={(e) => setField('selectedArt', e.target.value)} style={inputStyle}>
          {Object.entries(ART_UPGRADES).map(([key, val]) => (
            <option key={key} value={key} style={{ background: '#2D2838', color: 'white' }}>{val.name}</option>
          ))}
        </select>
      </div>

      {!isSubscription && (
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px', cursor: 'pointer' }}>
          <input type="checkbox" checked={needsSoakOff} onChange={e => setField('needsSoakOff', e.target.checked)} style={{ marginTop: '4px' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
            I need a soak-off before my new set.
            <div style={{ fontSize: '0.75rem', fontWeight: 'normal', opacity: 0.8, marginTop: '2px' }}>Soak-offs are included in the price but must be booked in advance.</div>
          </span>
        </label>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '5px', background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px' }}>
        <strong style={{ fontSize: '0.85rem', color: 'var(--color-dusty-lilac)' }}>Upload Reference Photo</strong>
        <p style={{ fontSize: '0.75rem', opacity: 0.9, margin: 0, lineHeight: '1.4' }}>
          Please upload a photo of the set you want so I can prepare your price and supplies!
        </p>
        
        <label style={{ 
          ...inputStyle, 
          padding: '12px', 
          fontSize: '0.9rem', 
          cursor: 'pointer', 
          textAlign: 'center', 
          background: 'var(--color-dusty-lilac)', 
          color: 'white', 
          border: 'none',
          fontWeight: 'bold',
          marginTop: '8px'
        }}>
          {isUploadingPhoto ? 'Uploading photo...' : (referencePhotoUrl ? 'Change Photo' : '📸 Choose from Gallery')}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handlePhotoUpload} 
            disabled={isUploadingPhoto}
            style={{ display: 'none' }} 
          />
        </label>
        
        <p style={{ fontSize: '0.65rem', opacity: 0.7, margin: '4px 0 0 0', textAlign: 'center' }}>
          *If your photo gallery doesn't open, open this link directly in Safari or Chrome.*
        </p>

        {photoUploadError && <span style={{ fontSize: '0.8rem', color: '#ff8888', textAlign: 'center' }}>{photoUploadError}</span>}
        {referencePhotoUrl && !isUploadingPhoto && (
          <span style={{ fontSize: '0.8rem', color: '#88ff88', textAlign: 'center' }}>✓ Photo uploaded successfully!</span>
        )}
      </div>
      
      {!isSubscription && (
        <div style={{ marginTop: '5px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '4px' }}>Current Estimate (Area + Length + Art)</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>{priceDisplay}</div>
        </div>
      )}
    </div>
  );
}
