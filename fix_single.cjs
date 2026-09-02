const fs = require('fs');
let code = fs.readFileSync('src/components/SingleBookingFlow.jsx', 'utf8');

// 1. Fix handleNext step indices
code = code.replace(/if \(step === 3 && !selectedDate\)/, 'if (step === 2 && !selectedDate)');
code = code.replace(/if \(step === 4\) \{/, 'if (step === 3) {');

// 2. Change 'Subscribe Now' to 'Book Now'
code = code.replace(/\{step === steps\.length - 1 \? 'Subscribe Now' : 'Next'\}/, '{step === steps.length - 1 ? \'Book Now\' : \'Next\'}');

// 3. Add Estimated Total breakdown to the final step
const priceBreakdown = `
            <div style={{ marginTop: '5px', background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Estimated Total</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '2px' }}>Area + Length + Art</div>
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>R {currentPrice.toLocaleString()}</div>
            </div>
`;
code = code.replace(/<label style=\{\{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px', cursor: 'pointer' \}\}>/, priceBreakdown + '\n            <label style={{ display: \'flex\', alignItems: \'flex-start\', gap: \'10px\', marginTop: \'10px\', cursor: \'pointer\' }}>');

fs.writeFileSync('src/components/SingleBookingFlow.jsx', code);
