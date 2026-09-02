const fs = require('fs');
let code = fs.readFileSync('src/components/BookingFlow.jsx', 'utf8');

// Revert outer wrapper
code = code.replace(
/display: 'flex',\s*flexDirection: 'column',\s*alignItems: 'center',\s*justifyContent: 'flex-start',\s*overflowY: 'auto',\s*overflowX: 'hidden',\s*padding: '40px 20px'/g,
`display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '20px'`
);

// Update inner block to have overflowY: auto
code = code.replace(
/flexDirection: 'column',\s*alignItems: 'center',\s*margin: 'auto 0'/g,
`flexDirection: 'column',
            alignItems: 'center',
            maxHeight: 'calc(100vh - 40px)',
            overflowY: 'auto'`
);

// Make sure the frosted glass overlay is position absolute again (since outer is hidden, it'll cover properly)
// Or keep it fixed, doesn't matter if outer is hidden. But I'll change it to absolute to be safe.
code = code.replace(
/\{\/\* Dark Frosted Glass Overlay \*\/\}\s*<div style=\{\{\s*position: 'fixed'/g,
`{/* Dark Frosted Glass Overlay */}
        <div style={{
          position: 'absolute'`
);

fs.writeFileSync('src/components/BookingFlow.jsx', code);
