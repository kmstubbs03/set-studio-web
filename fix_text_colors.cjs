const fs = require('fs');
let code = fs.readFileSync('src/components/BookingFlow.jsx', 'utf8');
code = code.replace(/var\(--color-slate-plum\)/g, 'var(--color-dusty-lilac)');
fs.writeFileSync('src/components/BookingFlow.jsx', code);
