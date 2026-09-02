const fs = require('fs');
let code = fs.readFileSync('src/components/BookingFlow.jsx', 'utf8');

// The steps are currently: 0 (location), 1 (package), 2 (upgrades), 3 (date), 4 (details)
// We want to swap 1 (package) and 2 (upgrades)

// 1. Extract package step
const packageRegex = /\{\s*id: 'package'[\s\S]*?(?=\{\s*id: 'upgrades')/;
const packageMatch = code.match(packageRegex);

// 2. Extract upgrades step
const upgradesRegex = /\{\s*id: 'upgrades'[\s\S]*?(?=\{\s*id: 'date')/;
const upgradesMatch = code.match(upgradesRegex);

if (packageMatch && upgradesMatch) {
  let packageStr = packageMatch[0];
  let upgradesStr = upgradesMatch[0];
  
  // Replace the whole block of both with them swapped
  const combinedRegex = /\{\s*id: 'package'[\s\S]*?(?=\{\s*id: 'date')/;
  code = code.replace(combinedRegex, upgradesStr + packageStr);
}

// Fix back button background
code = code.replace(/background: 'rgba\\(0,0,0,0\\.05\\)'/g, "background: 'rgba(255,255,255,0.1)'");

fs.writeFileSync('src/components/BookingFlow.jsx', code);
