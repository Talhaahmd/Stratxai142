import NavbarDemo from './components/resizable-navbar-demo';
import HeroSection from './components/HeroSection';
import TrustedSection from './components/TrustedSection';
import CinematicSection from './components/CinematicSection';
import ResultsSection from './components/ResultsSection';
import AppleCardsCarouselDemo from './components/AppleCardsCarouselDemo';
import ServicesSection from './components/ServicesSection';
import FeaturedCases from './components/FeaturedCases';
import BookACall from './components/BookACall';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#1E2BFF] selection:text-white">
      <NavbarDemo />
      <HeroSection />
      <TrustedSection />
      <CinematicSection />
      <ResultsSection />
      <AppleCardsCarouselDemo />
      <ServicesSection />
      <FeaturedCases />
      <BookACall />
      <Footer />
    </div>
  );
}

export default App
