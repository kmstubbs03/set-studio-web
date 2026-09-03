const fs = require('fs');

// 1. UPDATE index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/Mobile Polygel Nails/g, 'Mobile Polygel & Acrylic Nails');
indexHtml = indexHtml.replace(/premium polygel nails/g, 'premium polygel & acrylic nails');
indexHtml = indexHtml.replace(/polygel nails Cape Town/g, 'polygel nails Cape Town, acrylic nails Cape Town');
fs.writeFileSync('index.html', indexHtml);

// 2. UPDATE src/pages/World.jsx
let worldJsx = fs.readFileSync('src/pages/World.jsx', 'utf8');
worldJsx = worldJsx.replace(/Polygel Nails Subscription/g, 'Polygel & Acrylic Nails Subscription');
worldJsx = worldJsx.replace(/Premium Polygel Extensions & Overlays/g, 'Premium Polygel & Acrylic Extensions & Overlays');
worldJsx = worldJsx.replace(/fresh polygel sets/g, 'fresh polygel or acrylic sets');
fs.writeFileSync('src/pages/World.jsx', worldJsx);

// 3. UPDATE api/chat.js
let chatJs = fs.readFileSync('api/chat.js', 'utf8');
chatJs = chatJs.replace(/I use polygel and gel polish/g, 'I use polygel, acrylic, and gel polish');
fs.writeFileSync('api/chat.js', chatJs);

console.log("Replacements complete.");
