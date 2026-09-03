const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Title
indexHtml = indexHtml.replace(
  '<title>Set Studio | Mobile Nail & Lash Salon Cape Town</title>',
  '<title>Set Studio | Mobile Nail Salon Cape Town</title>'
);

// Meta description
indexHtml = indexHtml.replace(
  '<meta name="description" content="Set Studio is Cape Town\'s premier 100% mobile nail and lash salon. We bring luxury polygel nails and lash extensions subscriptions directly to your home. Serving CBD, Southern Suburbs, Atlantic Seaboard, and Century City." />',
  '<meta name="description" content="Set Studio is Cape Town\'s premier 100% mobile nail salon. We bring luxury polygel nails directly to your home. Serving CBD, Southern Suburbs, Atlantic Seaboard, and Century City." />'
);

// Meta keywords
indexHtml = indexHtml.replace(
  '<meta name="keywords" content="mobile nail salon Cape Town, mobile lash salon Cape Town, polygel nails Cape Town, lash extensions at home, mobile beauty services Cape Town, nail tech Cape Town, lash extensions, Set Studio, VIP beauty subscription, Southern Suburbs, Atlantic Seaboard, Sea Point, Century City" />',
  '<meta name="keywords" content="mobile nail salon Cape Town, polygel nails Cape Town, mobile beauty services Cape Town, nail tech Cape Town, Set Studio, VIP beauty subscription, Southern Suburbs, Atlantic Seaboard, Sea Point, Century City" />'
);

// OG Title
indexHtml = indexHtml.replace(
  '<meta property="og:title" content="Set Studio | Mobile Polygel Nails & Lashes in Cape Town" />',
  '<meta property="og:title" content="Set Studio | Mobile Polygel Nails in Cape Town" />'
);

// OG Description
indexHtml = indexHtml.replace(
  '<meta property="og:description" content="Skip the traffic! Set Studio brings premium polygel nails and lash extensions directly to you. 100% mobile VIP beauty subscriptions in Cape Town." />',
  '<meta property="og:description" content="Skip the traffic! Set Studio brings premium polygel nails directly to you. 100% mobile VIP beauty subscriptions in Cape Town." />'
);

// Twitter Title
indexHtml = indexHtml.replace(
  '<meta name="twitter:title" content="Set Studio | Mobile Polygel Nails & Lashes in Cape Town" />',
  '<meta name="twitter:title" content="Set Studio | Mobile Polygel Nails in Cape Town" />'
);

// Twitter Description
indexHtml = indexHtml.replace(
  '<meta name="twitter:description" content="Skip the traffic! Set Studio brings premium polygel nails and lash extensions directly to you. 100% mobile VIP beauty subscriptions in Cape Town." />',
  '<meta name="twitter:description" content="Skip the traffic! Set Studio brings premium polygel nails directly to you. 100% mobile VIP beauty subscriptions in Cape Town." />'
);

// Schema JSON
indexHtml = indexHtml.replace(
  '"name": "Set Studio Mobile Nail & Lash Salon",',
  '"name": "Set Studio Mobile Nail Salon",'
);

indexHtml = indexHtml.replace(
  '"description": "Cape Town\'s premier 100% mobile salon offering VIP polygel nails and lash extensions subscriptions in the comfort of your own home.",',
  '"description": "Cape Town\'s premier 100% mobile salon offering VIP polygel nail subscriptions in the comfort of your own home.",'
);

fs.writeFileSync('index.html', indexHtml);
