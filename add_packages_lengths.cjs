const fs = require('fs');

// 1. Update BookingFlow.jsx
let bookingFlow = fs.readFileSync('src/components/BookingFlow.jsx', 'utf8');

const oldLengthsBooking = `const LENGTH_UPGRADES = {
  'Short': { price: 0, name: 'Short' },
  'Medium': { price: 0, name: 'Medium' },
  'Long': { price: 100, name: 'Long' },
  'XL': { price: 150, name: 'XL' },
  'XXL': { price: 200, name: 'XXL' }
};`;
const newLengthsBooking = `const LENGTH_UPGRADES = {
  'Short': { price: 0, name: 'Short' },
  'Medium': { price: 0, name: 'Medium' },
  'Medium Long': { price: 50, name: 'Medium Long' },
  'Long': { price: 100, name: 'Long' },
  'XL': { price: 150, name: 'XL' },
  'XXL': { price: 200, name: 'XXL' }
};`;
bookingFlow = bookingFlow.replace(oldLengthsBooking, newLengthsBooking);

const oldPackages = `const SUBSCRIPTION_PACKAGES = {
  'basic': {
    id: 'basic',
    name: 'The Basic Set',
    description: 'Includes Tier 1 Art & up to Medium Length',
    price: 0
  },
  'extra': {
    id: 'extra',
    name: 'The Extra Set',
    description: 'Includes up to Tier 3 Art & up to Long Length',
    price: 350
  },
  'ultimate': {
    id: 'ultimate',
    name: 'The Ultimate Set',
    description: 'Includes up to Tier 4 Art & Any Length (XXL)',
    price: 550
  }
};`;
const newPackages = `const SUBSCRIPTION_PACKAGES = {
  'basic': {
    id: 'basic',
    name: 'The Basic Set',
    description: 'Includes Tier 1 Art & up to Medium Length',
    price: 0
  },
  'standard': {
    id: 'standard',
    name: 'The Standard Set',
    description: 'Includes up to Tier 2 Art & up to Medium Long Length',
    price: 150
  },
  'extra': {
    id: 'extra',
    name: 'The Extra Set',
    description: 'Includes up to Tier 3 Art & up to Long Length',
    price: 350
  },
  'ultimate': {
    id: 'ultimate',
    name: 'The Ultimate Set',
    description: 'Includes up to Tier 4 Art & Any Length (XXL)',
    price: 550
  }
};`;
bookingFlow = bookingFlow.replace(oldPackages, newPackages);

fs.writeFileSync('src/components/BookingFlow.jsx', bookingFlow);


// 2. Update SingleBookingFlow.jsx
let singleBookingFlow = fs.readFileSync('src/components/SingleBookingFlow.jsx', 'utf8');

const oldLengthsSingle = `const LENGTH_UPGRADES = {
  'Short': { price: 0, name: 'Short' },
  'Medium': { price: 0, name: 'Medium' },
  'Long': { price: 100, name: 'Long' },
  'XL': { price: 150, name: 'XL' },
  'XXL': { price: 200, name: 'XXL' }
};`;
const newLengthsSingle = `const LENGTH_UPGRADES = {
  'Short': { price: 0, name: 'Short' },
  'Medium': { price: 0, name: 'Medium' },
  'Medium Long': { price: 50, name: 'Medium Long' },
  'Long': { price: 100, name: 'Long' },
  'XL': { price: 150, name: 'XL' },
  'XXL': { price: 200, name: 'XXL' }
};`;
singleBookingFlow = singleBookingFlow.replace(oldLengthsSingle, newLengthsSingle);

fs.writeFileSync('src/components/SingleBookingFlow.jsx', singleBookingFlow);
