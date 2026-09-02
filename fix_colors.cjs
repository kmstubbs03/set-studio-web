const fs = require('fs');
let code = fs.readFileSync('src/components/CustomCalendar.jsx', 'utf8');
code = code.replace(/var\(--color-slate-plum\)/g, 'var(--color-dusty-lilac)');
fs.writeFileSync('src/components/CustomCalendar.jsx', code);
