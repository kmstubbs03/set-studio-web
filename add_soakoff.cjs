const fs = require('fs');
let code = fs.readFileSync('src/components/SingleBookingFlow.jsx', 'utf8');

// Add soak-off state
code = code.replace(/const \[selectedArt, setSelectedArt\] = useState\('Tier 1'\);/, 'const [selectedArt, setSelectedArt] = useState(\'Tier 1\');\n  const [needsSoakOff, setNeedsSoakOff] = useState(false);');

// Remove subscription language from preferences text
const oldText = /<p style=\{\{ opacity: 0\.8, fontSize: '0\.85rem' \}\}>\s*Let me know what length and art you're looking for! \s*Note: The basic subscription covers Tier 1 Art and up to Medium Length\. Upgrades are settled on the day of your appointment, unless covered by a higher package\.\s*<\/p>/;
const newText = `<p style={{ opacity: 0.8, fontSize: '0.85rem' }}>
              Let me know what length and art you're looking for! The final price will be confirmed once you send your reference photo on WhatsApp.
            </p>`;
code = code.replace(oldText, newText);

// Add soak off checkbox below the art tier
const soakOffUI = `
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px', cursor: 'pointer' }}>
              <input type="checkbox" checked={needsSoakOff} onChange={e => setNeedsSoakOff(e.target.checked)} style={{ marginTop: '4px' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                I need a soak-off before my new set.
                <div style={{ fontSize: '0.75rem', fontWeight: 'normal', opacity: 0.8, marginTop: '2px' }}>Soak-offs are included in the price but must be booked in advance.</div>
              </span>
            </label>
`;
code = code.replace(/<div style=\{\{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '5px', background: 'rgba\(255,255,255,0\.1\)', padding: '12px', borderRadius: '8px' \}\}>/, soakOffUI + '\n            <div style={{ display: \'flex\', flexDirection: \'column\', gap: \'8px\', marginTop: \'5px\', background: \'rgba(255,255,255,0.1)\', padding: \'12px\', borderRadius: \'8px\' }}>');

// Add soak off preference to WhatsApp message
code = code.replace(/message \+= `- Art Tier: \$\{selectedArt\}\\n\\n`;/, 'message += `- Art Tier: ${selectedArt}\\n`;\n      message += `- Soak-off Needed: ${needsSoakOff ? \'Yes\' : \'No\'}\\n\\n`;');

fs.writeFileSync('src/components/SingleBookingFlow.jsx', code);
