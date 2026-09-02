const fs = require('fs');

// --- Update BookingFlow.jsx ---
let bookingFlow = fs.readFileSync('src/components/BookingFlow.jsx', 'utf8');

const oldBookingArt = `const ART_UPGRADES = {
  'Tier 1': { price: 0, name: 'Tier 1' },
  'Tier 2': { price: 100, name: 'Tier 2' },
  'Tier 3': { price: 200, name: 'Tier 3' },
  'Tier 4': { price: 300, name: 'Tier 4' }
};`;
const newBookingArt = `const ART_UPGRADES = {
  'No Art': { price: 0, name: 'No Art' },
  'Tier 1': { price: 0, name: 'Tier 1' },
  'Tier 2': { price: 100, name: 'Tier 2' },
  'Tier 3': { price: 200, name: 'Tier 3' },
  'Tier 4': { price: 300, name: 'Tier 4' }
};`;
bookingFlow = bookingFlow.replace(oldBookingArt, newBookingArt);
bookingFlow = bookingFlow.replace(`const [selectedArt, setSelectedArt] = useState('Tier 1');`, `const [selectedArt, setSelectedArt] = useState('No Art');`);

fs.writeFileSync('src/components/BookingFlow.jsx', bookingFlow);


// --- Update SingleBookingFlow.jsx ---
let singleBookingFlow = fs.readFileSync('src/components/SingleBookingFlow.jsx', 'utf8');

const oldSingleArt = `const ART_UPGRADES = {
  'Tier 1': { min: 50, max: 100, name: 'Tier 1' },
  'Tier 2': { min: 100, max: 200, name: 'Tier 2' },
  'Tier 3': { min: 200, max: 300, name: 'Tier 3' },
  'Tier 4': { min: 300, max: 400, name: 'Tier 4' }
};`;
const newSingleArt = `const ART_UPGRADES = {
  'No Art': { min: 0, max: 0, name: 'No Art' },
  'Tier 1': { min: 50, max: 100, name: 'Tier 1' },
  'Tier 2': { min: 100, max: 200, name: 'Tier 2' },
  'Tier 3': { min: 200, max: 300, name: 'Tier 3' },
  'Tier 4': { min: 300, max: 400, name: 'Tier 4' }
};`;
singleBookingFlow = singleBookingFlow.replace(oldSingleArt, newSingleArt);
singleBookingFlow = singleBookingFlow.replace(`const [selectedArt, setSelectedArt] = useState('Tier 1');`, `const [selectedArt, setSelectedArt] = useState('No Art');`);

fs.writeFileSync('src/components/SingleBookingFlow.jsx', singleBookingFlow);
