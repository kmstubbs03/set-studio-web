const fs = require('fs');
let code = fs.readFileSync('src/components/SingleBookingFlow.jsx', 'utf8');

const tAndCs = `
            <div style={{ marginTop: '10px', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', fontSize: '0.75rem', lineHeight: '1.5', opacity: 0.8, maxHeight: '120px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.1)' }}>
              <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--color-dusty-lilac)' }}>Terms & Conditions</strong>
              <ul style={{ margin: 0, paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>A non-refundable deposit is required to secure your booking.</li>
                <li>The quoted price is an estimate. The final price will be confirmed via WhatsApp once reference pictures are reviewed.</li>
                <li>Please ensure a clean, well-lit table with two chairs is available for the appointment.</li>
                <li>Nails must be completely bare prior to the appointment unless a soak-off was requested in advance.</li>
                <li>Cancellations or rescheduling must be done at least 24 hours prior to the appointment.</li>
              </ul>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px', cursor: 'pointer' }}>
              <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} style={{ marginTop: '4px' }} />
              <span style={{ fontSize: '0.8rem', opacity: 0.9, lineHeight: '1.4' }}>
                I have read and agree to the Terms & Conditions above.
              </span>
            </label>
`;

// Replace the old T&C checkbox area with the new one
code = code.replace(/<label style=\{\{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px', cursor: 'pointer' \}\}>[\s\S]*?<\/label>/, tAndCs.trim());

fs.writeFileSync('src/components/SingleBookingFlow.jsx', code);
