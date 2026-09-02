const fs = require('fs');

// --- Update BookingFlow.jsx ---
let bookingFlow = fs.readFileSync('src/components/BookingFlow.jsx', 'utf8');

const oldBookingMessage = `let message = \`*NEW SUBSCRIPTION BOOKING!*\\n\\n\`;
      message += \`*Name:* \${fullName}\\n\`;
      message += \`*WhatsApp:* \${whatsapp}\\n\`;
      message += \`*Address:* \${address}\\n\`;
      message += \`*Area:* \${selectedArea}\\n\`;
      message += \`*Package:* \${SUBSCRIPTION_PACKAGES[selectedPackage].name}\\n\`;
      message += \`*Total Monthly Rate:* R\${currentPrice}\\n\\n\`;
      
      message += \`*NAIL PREFERENCES:*\\n\`;
      message += \`- Product: \${selectedProduct}\\n\`;
      message += \`- Length: \${selectedLength}\\n\`;
      message += \`- Art Tier: \${selectedArt}\\n\\n\`;

      message += \`*Preferred Date:* \${selectedDate.toDateString()}\\n\`;
      message += \`*Preferred Times:* \${selectedTimes.length > 0 ? selectedTimes.join(', ') : 'Any time'}\\n\\n\`;

      message += \`I agree to the T&Cs. I will send my reference photo shortly!\`;`;

const newBookingMessage = `let message = \`💅 *NEW SUBSCRIPTION BOOKING!* 💅\\n\\n\`;
      message += \`👤 *Name:* \${fullName}\\n\`;
      message += \`📱 *WhatsApp:* \${whatsapp}\\n\`;
      message += \`📍 *Address:* \${address}\\n\`;
      message += \`🚗 *Area:* \${selectedArea}\\n\`;
      message += \`📦 *Package:* \${SUBSCRIPTION_PACKAGES[selectedPackage].name}\\n\`;
      message += \`💰 *Monthly Total:* R\${currentPrice}\\n\\n\`;
      
      message += \`✨ *NAIL PREFERENCES:*\\n\`;
      message += \`🫧 - Product: \${selectedProduct}\\n\`;
      message += \`📏 - Length: \${selectedLength}\\n\`;
      message += \`🎨 - Art Tier: \${selectedArt}\\n\\n\`;

      message += \`📅 *Preferred Date:* \${selectedDate.toDateString()}\\n\`;
      message += \`⏰ *Preferred Times:* \${selectedTimes.length > 0 ? selectedTimes.join(', ') : 'Any time'}\\n\\n\`;

      message += \`✅ I agree to the T&Cs. I will send my reference photo shortly!\`;`;

bookingFlow = bookingFlow.replace(oldBookingMessage, newBookingMessage);
fs.writeFileSync('src/components/BookingFlow.jsx', bookingFlow);


// --- Update SingleBookingFlow.jsx ---
let singleBookingFlow = fs.readFileSync('src/components/SingleBookingFlow.jsx', 'utf8');

const oldSingleMessage = `let message = \`*NEW SINGLE APPOINTMENT!*\\n\\n\`;
      message += \`*Name:* \${fullName}\\n\`;
      message += \`*WhatsApp:* \${whatsapp}\\n\`;
      message += \`*Address:* \${address}\\n\`;
      message += \`*Area:* \${selectedArea}\\n\`;
            message += \`*Estimated Total:* \${priceDisplay}\\n\\n\`;
      
      message += \`*NAIL PREFERENCES:*\\n\`;
      message += \`- Product: \${selectedProduct}\\n\`;
      message += \`- Length: \${selectedLength}\\n\`;
      message += \`- Art Tier: \${selectedArt}\\n\`;
      message += \`- Soak-off Needed: \${needsSoakOff ? 'Yes' : 'No'}\\n\\n\`;

      message += \`*Preferred Date:* \${selectedDate.toDateString()}\\n\`;
      message += \`*Preferred Times:* \${selectedTimes.length > 0 ? selectedTimes.join(', ') : 'Any time'}\\n\\n\`;

      message += \`I agree to the T&Cs. I will send my reference photo shortly to confirm the final price!\`;`;

const newSingleMessage = `let message = \`💅 *NEW SINGLE APPOINTMENT!* 💅\\n\\n\`;
      message += \`👤 *Name:* \${fullName}\\n\`;
      message += \`📱 *WhatsApp:* \${whatsapp}\\n\`;
      message += \`📍 *Address:* \${address}\\n\`;
      message += \`🚗 *Area:* \${selectedArea}\\n\`;
            message += \`💰 *Estimated Total:* \${priceDisplay}\\n\\n\`;
      
      message += \`✨ *NAIL PREFERENCES:*\\n\`;
      message += \`🫧 - Product: \${selectedProduct}\\n\`;
      message += \`📏 - Length: \${selectedLength}\\n\`;
      message += \`🎨 - Art Tier: \${selectedArt}\\n\`;
      message += \`💧 - Soak-off Needed: \${needsSoakOff ? 'Yes' : 'No'}\\n\\n\`;

      message += \`📅 *Preferred Date:* \${selectedDate.toDateString()}\\n\`;
      message += \`⏰ *Preferred Times:* \${selectedTimes.length > 0 ? selectedTimes.join(', ') : 'Any time'}\\n\\n\`;

      message += \`✅ I agree to the T&Cs. I will send my reference photo shortly to confirm the final price!\`;`;

singleBookingFlow = singleBookingFlow.replace(oldSingleMessage, newSingleMessage);
fs.writeFileSync('src/components/SingleBookingFlow.jsx', singleBookingFlow);
