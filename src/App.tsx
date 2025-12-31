import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import DigitalDevelopment from './pages/services/DigitalDevelopment';
import PerformanceMarketing from './pages/services/PerformanceMarketing';
import AIAutomation from './pages/services/AIAutomation';
import SocialMediaContent from './pages/services/SocialMediaContent';
import CustomAppSolutions from './pages/services/CustomAppSolutions';
import CaseStudyDetail from './pages/cases/CaseStudyDetail';
import CaseStudies from './pages/CaseStudies';
import OurClients from './pages/OurClients';
import ClientDetail from './pages/clients/ClientDetail';
import StoryDetail from './pages/stories/StoryDetail';
import AiPrompts from './pages/AiPrompts';
import LoadingScreen from './components/LoadingScreen';
import { SmoothScrollProvider } from './components/providers/SmoothScrollProvider';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to show the loading screen
    // The EncryptedText takes roughly (text_length * delay) ms
    // "We are the StratX AI." is 21 chars * 60ms = 1260ms
    // Add some buffer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScrollProvider>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/our-clients" element={<OurClients />} />
          <Route path="/clients/:slug" element={<ClientDetail />} />
          <Route path="/stories/:slug" element={<StoryDetail />} />
          <Route path="/ai-prompts" element={<AiPrompts />} />
          <Route path="/services/digital-development" element={<DigitalDevelopment />} />
          <Route path="/services/performance-marketing" element={<PerformanceMarketing />} />
          <Route path="/services/ai-automation" element={<AIAutomation />} />
          <Route path="/services/social-media-content" element={<SocialMediaContent />} />
          <Route path="/services/custom-app-solutions" element={<CustomAppSolutions />} />
          <Route path="/cases/:slug" element={<CaseStudyDetail />} />
        </Routes>
      </BrowserRouter>
    </SmoothScrollProvider>
  );
}

export default App;
