const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(
  '<meta property="og:url" content="https://set-studio-web.vercel.app/" />',
  '<meta property="og:url" content="https://setstudio.co.za/" />'
);

code = code.replace(
  '<meta property="og:image" content="https://set-studio-web.vercel.app/logo.png" />',
  '<meta property="og:image" content="https://setstudio.co.za/favicon.png" />'
);

code = code.replace(
  '<meta name="twitter:image" content="https://set-studio-web.vercel.app/logo.png" />',
  '<meta name="twitter:image" content="https://setstudio.co.za/favicon.png" />'
);

code = code.replace(
  '"image": "https://set-studio-web.vercel.app/logo.png",',
  '"image": "https://setstudio.co.za/favicon.png",'
);

code = code.replace(
  '"@id": "https://set-studio-web.vercel.app/",',
  '"@id": "https://setstudio.co.za/",'
);

code = code.replace(
  '"url": "https://set-studio-web.vercel.app/",',
  '"url": "https://setstudio.co.za/",'
);

code = code.replace(
  '<link rel="canonical" href="https://set-studio-web.vercel.app/" />',
  '<link rel="canonical" href="https://setstudio.co.za/" />'
);

fs.writeFileSync('index.html', code);
