const fs = require('fs');
let code = fs.readFileSync('src/components/BookingFlow.jsx', 'utf8');

code = code.replace(
  /<div style=\{\{ fontSize: '0\.8rem',/g,
  `<div style={{ flexShrink: 0, fontSize: '0.8rem',`
);

code = code.replace(
  /<h2 style=\{\{ fontSize: '2rem',/g,
  `<h2 style={{ flexShrink: 0, fontSize: '2rem',`
);

code = code.replace(
  /<div style=\{\{ width: '100%', minHeight: '300px' \}\}>/g,
  `<div style={{ width: '100%', minHeight: '300px', flexShrink: 0 }}>`
);

code = code.replace(
  /<div style=\{\{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '30px', borderTop: '1px solid rgba\(255,255,255,0\.1\)', paddingTop: '20px' \}\}>/g,
  `<div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>`
);

fs.writeFileSync('src/components/BookingFlow.jsx', code);
