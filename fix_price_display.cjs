const fs = require('fs');
let code = fs.readFileSync('src/components/SingleBookingFlow.jsx', 'utf8');

// Update Step 1 (Location) to only show Base Price
const oldStep1Price = `<div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Estimated Price</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>R{currentMinPrice} - R{currentMaxPrice}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '5px' }}>Includes travel fees. Final price confirmed on WhatsApp.</div>
            </div>`;

const newStep1Price = `<div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Base Price (Travel Included)</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>R{PRICING[selectedArea]}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '5px' }}>Nail art and length upgrades will be added in the next step.</div>
            </div>`;
code = code.replace(oldStep1Price, newStep1Price);

// Add a running total to Step 2 (Appointment Preferences)
const oldStep2Bottom = `<p style={{ fontSize: '0.75rem', opacity: 0.9, margin: 0, lineHeight: '1.4' }}>
                You will need to send a reference photo of your desired set via WhatsApp so I can prep accordingly!
              </p>
            </div>
          </div>
        )
      },`;

const newStep2Bottom = `<p style={{ fontSize: '0.75rem', opacity: 0.9, margin: 0, lineHeight: '1.4' }}>
                You will need to send a reference photo of your desired set via WhatsApp so I can prep accordingly!
              </p>
            </div>
            
            <div style={{ marginTop: '5px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '4px' }}>Current Estimate (Area + Length + Art)</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>R{currentMinPrice} - R{currentMaxPrice}</div>
            </div>
          </div>
        )
      },`;
code = code.replace(oldStep2Bottom, newStep2Bottom);

fs.writeFileSync('src/components/SingleBookingFlow.jsx', code);
