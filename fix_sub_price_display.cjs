const fs = require('fs');
let code = fs.readFileSync('src/components/BookingFlow.jsx', 'utf8');

// Step 1: Replace Base Subscription display
const oldStep1 = `<div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Base Subscription</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>R {currentPrice.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '5px' }}>Includes 1x visit per month & travel fees</div>
            </div>`;
const newStep1 = `<div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Base Area Fee (Travel Included)</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>R{PRICING[selectedArea]}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '5px' }}>Includes 1x visit per month. Package selected next.</div>
            </div>`;
code = code.replace(oldStep1, newStep1);

// Step 2: Add running total to package step
const oldStep2 = `</div>
                <div style={{ fontWeight: 'bold' }}>{pkg.price === 0 ? 'Base' : '+R' + pkg.price}</div>
              </div>
            ))}
          </div>
        )
      },`;
const newStep2 = `</div>
                <div style={{ fontWeight: 'bold' }}>{pkg.price === 0 ? 'Base' : '+R' + pkg.price}</div>
              </div>
            ))}
            
            <div style={{ marginTop: '5px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '4px' }}>Monthly Debit Order (Area + Package)</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>R{currentPrice}</div>
            </div>
          </div>
        )
      },`;
code = code.replace(oldStep2, newStep2);

// Step 4: Add Monthly Debit Order block to Details step
const oldDetails = `<div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Full Name</label>`;
const newDetails = `<div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', width: '100%' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Monthly Debit Order</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '2px' }}>Area + Package</div>
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>R{currentPrice}</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Full Name</label>`;
code = code.replace(oldDetails, newDetails);

fs.writeFileSync('src/components/BookingFlow.jsx', code);
