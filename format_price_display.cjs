const fs = require('fs');
let code = fs.readFileSync('src/components/SingleBookingFlow.jsx', 'utf8');

// Use a variable for price display
const priceDisplayLogic = `
  let currentMinPrice = PRICING[selectedArea] + LENGTH_UPGRADES[selectedLength].price + ART_UPGRADES[selectedArt].min;
  let currentMaxPrice = PRICING[selectedArea] + LENGTH_UPGRADES[selectedLength].price + ART_UPGRADES[selectedArt].max;
  let priceDisplay = currentMinPrice === currentMaxPrice ? \`R\${currentMinPrice}\` : \`R\${currentMinPrice} - R\${currentMaxPrice}\`;
`;

code = code.replace(
  `let currentMinPrice = PRICING[selectedArea] + LENGTH_UPGRADES[selectedLength].price + ART_UPGRADES[selectedArt].min;\n  let currentMaxPrice = PRICING[selectedArea] + LENGTH_UPGRADES[selectedLength].price + ART_UPGRADES[selectedArt].max;`,
  priceDisplayLogic
);

// Replace UI blocks
code = code.replace(
  `<div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>R{currentMinPrice} - R{currentMaxPrice}</div>`,
  `<div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>{priceDisplay}</div>`
);

code = code.replace(
  `<div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>R{currentMinPrice} - R{currentMaxPrice}</div>`,
  `<div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--color-dusty-lilac)' }}>{priceDisplay}</div>`
);

code = code.replace(
  `message += \`*Estimated Total:* R\${currentMinPrice} - R\${currentMaxPrice}\\n\\n\`;`,
  `message += \`*Estimated Total:* \${priceDisplay}\\n\\n\`;`
);

fs.writeFileSync('src/components/SingleBookingFlow.jsx', code);
