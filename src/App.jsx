import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import World from './pages/World';
import SmartFAQ from './components/SmartFAQ';

function App() {
  const location = useLocation();
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home setIsFAQOpen={setIsFAQOpen} />} />
          <Route path="/world/:id" element={<World />} />
        </Routes>
      </AnimatePresence>
      <SmartFAQ isOpen={isFAQOpen} setIsOpen={setIsFAQOpen} />
    </>
  );
}

export default App;
