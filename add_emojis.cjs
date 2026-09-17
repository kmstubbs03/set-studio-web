const fs = require('fs');

const cleanMessages = (filePath, isSingle) => {
  let content = fs.readFileSync(filePath, 'utf8');

  let replacement = '';
  
  if (isSingle) {
    replacement = `
        let message = \`✨ *NEW SINGLE APPOINTMENT!* ✨\\n\\n\`;
        message += \`💋 *Name:* \${fullName}\\n\`;
        message += \`💋 *WhatsApp:* \${whatsapp}\\n\`;
        message += \`🛋️ *Address:* \${address}\\n\`;
        message += \`🐆 *Travel Fee:* R\${travelFee}\\n\`;
        message += \`💜 *Estimated Total:* \${priceDisplay}\\n\\n\`;
        
        message += \`💅 *NAIL PREFERENCES:*\\n\`;
        message += \`🧚🏼 - Product: \${selectedProduct}\\n\`;
        message += \`🧚🏼 - Length: \${selectedLength}\\n\`;
        message += \`🧚🏼 - Art Tier: \${selectedArt}\\n\`;
        message += \`🧚🏼 - Soak-off Needed: \${needsSoakOff ? 'Yes' : 'No'}\\n\\n\`;
  
        message += \`✨ *Preferred Date:* \${selectedDate.toDateString()}\\n\`;
        message += \`✨ *Preferred Times:* \${selectedTimes.length > 0 ? selectedTimes.join(', ') : 'Any time'}\\n\\n\`;
  
        message += \`💜 I agree to the T&Cs. I will send my reference photo shortly to confirm the final price!\`;
`;
  } else {
    replacement = `
        let message = \`✨ *NEW SUBSCRIPTION BOOKING!* ✨\\n\\n\`;
        message += \`💋 *Name:* \${fullName}\\n\`;
        message += \`💋 *WhatsApp:* \${whatsapp}\\n\`;
        message += \`🛋️ *Address:* \${address}\\n\`;
        message += \`🐆 *Travel Fee:* R\${travelFee}\\n\`;
        message += \`💜 *Package:* \${SUBSCRIPTION_PACKAGES[selectedPackage].name}\\n\`;
        message += \`💜 *Monthly Total:* R\${currentPrice}\\n\\n\`;
        
        message += \`💅 *NAIL PREFERENCES:*\\n\`;
        message += \`🧚🏼 - Product: \${selectedProduct}\\n\`;
        message += \`🧚🏼 - Length: \${selectedLength}\\n\`;
        message += \`🧚🏼 - Art Tier: \${selectedArt}\\n\\n\`;
  
        message += \`✨ *Preferred Date:* \${selectedDate.toDateString()}\\n\`;
        message += \`✨ *Preferred Times:* \${selectedTimes.length > 0 ? selectedTimes.join(', ') : 'Any time'}\\n\\n\`;
  
        message += \`💜 I agree to the T&Cs. I will send my reference photo shortly!\`;
`;
  }

  // Regex to match the block starting with "let message = `...`" until the fetch call
  const regex = /let message = [\s\S]*?(?=\/\/ Send data to Google Sheets)/;
  content = content.replace(regex, replacement + '        \n        ');

  fs.writeFileSync(filePath, content);
};

cleanMessages('src/components/BookingFlow.jsx', false);
cleanMessages('src/components/SingleBookingFlow.jsx', true);
