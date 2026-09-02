const fs = require('fs');
let code = fs.readFileSync('src/components/SingleBookingFlow.jsx', 'utf8');

// Rename component
code = code.replace(/export default function BookingFlow\(/g, 'export default function SingleBookingFlow(');

// Remove SUBSCRIPTION_PACKAGES
code = code.replace(/const SUBSCRIPTION_PACKAGES = \{[\s\S]*?^\};\n/m, '');

// Remove selectedPackage state
code = code.replace(/const \[selectedPackage, setSelectedPackage\] = useState\('basic'\);\n/g, '');

// Update price calculation
code = code.replace(/let currentPrice = PRICING\[selectedArea\] \+ SUBSCRIPTION_PACKAGES\[selectedPackage\]\.price;/g, 'let currentPrice = PRICING[selectedArea] + LENGTH_UPGRADES[selectedLength].price + ART_UPGRADES[selectedArt].price;');

// Update location step texts
code = code.replace(/Select your area to see the monthly subscription cost\./g, 'Select your area to see the base cost.');
code = code.replace(/Base Subscription/g, 'Estimated Price');
code = code.replace(/Includes 1x visit per month & travel fees/g, 'Includes travel fees. Final price confirmed on WhatsApp.');

// Remove the package step
code = code.replace(/\{\s*id: 'package',[\s\S]*?id: 'date',/m, '{\n        id: \'date\',');

// Update Terms and Conditions
code = code.replace(/I agree to the T&Cs\. Note: 1st month subscription is payable upfront to secure your spot\. Thereafter, you will be billed on the 1st of every month via debit order\. Travel fee is included in the base price\./g, 'I agree to the T&Cs. A deposit may be required to secure your spot. Travel fee is included in the base price.');

// Update WhatsApp message
code = code.replace(/\*NEW SUBSCRIPTION BOOKING!\*/g, '*NEW SINGLE APPOINTMENT!*');
code = code.replace(/message \+= `\*Package:\* \$\{SUBSCRIPTION_PACKAGES\[selectedPackage\]\.name\}\\n`;\n/g, '');
code = code.replace(/\*Total Monthly Rate:\*/g, '*Estimated Total:*');
code = code.replace(/I agree to the T&Cs and the monthly debit order structure\. I will send my reference photo shortly!/g, 'I agree to the T&Cs. I will send my reference photo shortly to confirm the final price!');

fs.writeFileSync('src/components/SingleBookingFlow.jsx', code);
