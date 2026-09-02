const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// Add import for SingleBookingFlow
code = code.replace(/import BookingFlow from '\.\.\/components\/BookingFlow';/, 'import BookingFlow from \'../components/BookingFlow\';\nimport SingleBookingFlow from \'../components/SingleBookingFlow\';');

// Add state for SingleBookingFlow
code = code.replace(/const \[showSubscribeModal, setShowSubscribeModal\] = useState\(false\);/, 'const [showSubscribeModal, setShowSubscribeModal] = useState(false);\n  const [showSingleModal, setShowSingleModal] = useState(false);');

// Update handleAction
code = code.replace(/if \(type === 'single'\) \{[\s\S]*?\} else if \(type === 'subscribe'\) \{/m, 'if (type === \'single\') {\n      setShowSingleModal(true);\n    } else if (type === \'subscribe\') {');

// Add modal render
const modalRender = `
      {/* Single Booking Portal Overlay */}
      {showSingleModal && (
        <SingleBookingFlow 
          onClose={() => setShowSingleModal(false)} 
        />
      )}
`;
code = code.replace(/\{\/\* Subscription Portal Overlay \*\/\}/, modalRender + '\n      {/* Subscription Portal Overlay */}');

fs.writeFileSync('src/pages/Home.jsx', code);
