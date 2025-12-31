import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
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
  );
}

export default App;
