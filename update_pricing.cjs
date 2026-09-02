const fs = require('fs');
let code = fs.readFileSync('src/components/SingleBookingFlow.jsx', 'utf8');

// 1. Update ART_UPGRADES
const oldArtUpgrades = `const ART_UPGRADES = {
  'Tier 1': { price: 0, name: 'Tier 1' },
  'Tier 2': { price: 100, name: 'Tier 2' },
  'Tier 3': { price: 200, name: 'Tier 3' },
  'Tier 4': { price: 300, name: 'Tier 4' }
};`;

const newArtUpgrades = `const ART_UPGRADES = {
  'Tier 1': { min: 50, max: 100, name: 'Tier 1' },
  'Tier 2': { min: 100, max: 200, name: 'Tier 2' },
  'Tier 3': { min: 200, max: 300, name: 'Tier 3' },
  'Tier 4': { min: 300, max: 400, name: 'Tier 4' }
};`;
code = code.replace(oldArtUpgrades, newArtUpgrades);

// 2. Update currentPrice variables
code = code.replace(
  `let currentPrice = PRICING[selectedArea] + LENGTH_UPGRADES[selectedLength].price + ART_UPGRADES[selectedArt].price;`,
  `let currentMinPrice = PRICING[selectedArea] + LENGTH_UPGRADES[selectedLength].price + ART_UPGRADES[selectedArt].min;
  let currentMaxPrice = PRICING[selectedArea] + LENGTH_UPGRADES[selectedLength].price + ART_UPGRADES[selectedArt].max;`
);

// 3. Update Location Step Display
code = code.replace(
  `<div style={{ fontSize: '2rem', fontWeight: 'bold' }}>R {currentPrice.toLocaleString()}</div>`,
  `<div style={{ fontSize: '2rem', fontWeight: 'bold' }}>R{currentMinPrice} - R{currentMaxPrice}</div>`
);

// 4. Update Final Step Display
code = code.replace(
  `<div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>R {currentPrice.toLocaleString()}</div>`,
  `<div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>R{currentMinPrice} - R{currentMaxPrice}</div>`
);

// 5. Update WhatsApp Message
code = code.replace(
  `message += \`*Estimated Total:* R\${currentPrice}\\n\\n\`;`,
  `message += \`*Estimated Total:* R\${currentMinPrice} - R\${currentMaxPrice}\\n\\n\`;`
);

fs.writeFileSync('src/components/SingleBookingFlow.jsx', code);
