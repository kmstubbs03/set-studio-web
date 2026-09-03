const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Standard Meta Description
indexHtml = indexHtml.replace(
  'content="Set Studio is Cape Town\'s premier 100% mobile nail salon. We bring luxury polygel nails directly to your home. Serving CBD, Southern Suburbs, Atlantic Seaboard, and Century City."',
  'content="Set Studio is a 100% mobile nail salon in Cape Town. We bring premium polygel nails directly to your home. Book a single set or join our monthly subscription! Serving the CBD, Southern Suburbs, Atlantic Seaboard, and Century City."'
);

// OG & Twitter Description
indexHtml = indexHtml.replace(
  /content="Skip the traffic! Set Studio brings premium polygel nails directly to you\. 100% mobile VIP beauty subscriptions in Cape Town\."/g,
  'content="Skip the traffic! Set Studio brings premium polygel nails directly to your home in Cape Town. Book a single appointment or join our monthly nail subscription."'
);

// Schema Description
indexHtml = indexHtml.replace(
  '"description": "Cape Town\'s premier 100% mobile salon offering VIP polygel nail subscriptions in the comfort of your own home."',
  '"description": "Cape Town\'s premier 100% mobile nail salon offering premium polygel nails in the comfort of your own home. Book a single appointment or join our monthly subscription."'
);

// Also remove VIP from keywords just in case
indexHtml = indexHtml.replace(
  'VIP beauty subscription, ',
  'monthly nail subscription, '
);

fs.writeFileSync('index.html', indexHtml);
