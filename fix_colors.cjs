const fs = require('fs');
let code = fs.readFileSync('src/components/BookingFlow.jsx', 'utf8');

// Change modal main block background to translucent purple
code = code.replace(/background: 'rgba\\(255,255,255,0\\.15\\)'/g, "background: 'rgba(92, 84, 112, 0.4)'");

// Change input backgrounds to translucent purple instead of white
code = code.replace(/background: 'rgba\\(255,255,255,0\\.5\\)'/g, "background: 'rgba(92, 84, 112, 0.4)'");

// Change input border to be visible against dark bg
code = code.replace(/border: '1px solid rgba\\(0,0,0,0\\.1\\)'/g, "border: '1px solid rgba(255,255,255,0.2)'");

// Change active package selection border
code = code.replace(/border: selected \? '2px solid var\\(--color-slate-plum\\)' : '2px solid rgba\\(0,0,0,0\\.1\\)'/g, "border: selected ? '2px solid var(--color-dusty-lilac)' : '2px solid rgba(255,255,255,0.2)'");

// Remove the hardcoded color black on the options, make it match the dark UI
code = code.replace(/style={{ color: 'black' }}/g, "style={{ background: '#2D2838', color: 'white' }}");

fs.writeFileSync('src/components/BookingFlow.jsx', code);
