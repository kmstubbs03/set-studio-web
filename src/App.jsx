import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import World from './pages/World';
import SmartFAQ from './components/SmartFAQ';
import Socials from './components/Socials';

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/world/:id" element={<World />} />
        </Routes>
      </AnimatePresence>
      <SmartFAQ />
      <Socials />
    </>
  );
}

export default App;
