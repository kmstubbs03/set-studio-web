const fs = require('fs');
let code = fs.readFileSync('src/components/BookingFlow.jsx', 'utf8');

// Update Step 2: "Monthly Debit Order (Area + Package)" -> "Monthly Total"
code = code.replace(
  `<div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '4px' }}>Monthly Debit Order (Area + Package)</div>`,
  `<div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '4px' }}>Monthly Total</div>`
);

// Update Step 4: Details block "Monthly Debit Order" & "Area + Package"
code = code.replace(
  `<div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Monthly Debit Order</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '2px' }}>Area + Package</div>`,
  `<div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Monthly Total</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '2px' }}>Travel Included</div>`
);

// Update Details text "I agree to the T&Cs and the monthly debit order structure."
code = code.replace(
  `message += \`I agree to the T&Cs and the monthly debit order structure. I will send my reference photo shortly!\`;`,
  `message += \`I agree to the T&Cs. I will send my reference photo shortly!\`;`
);

// Also remove "debit order" from the checkbox T&Cs disclaimer
code = code.replace(
  `I agree to the T&Cs. Note: 1st month subscription is payable upfront to secure your spot. Thereafter, you will be billed on the 1st of every month via debit order. Travel fee is included in the base price.`,
  `I agree to the T&Cs. Note: 1st month subscription is payable upfront to secure your spot. Thereafter, you will be billed on the 1st of every month. Travel fee is included in the base price.`
);

fs.writeFileSync('src/components/BookingFlow.jsx', code);
