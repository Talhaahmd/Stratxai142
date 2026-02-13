import HatamexNavbar from '../components/HatamexNavbar';
import FuelHero from '../components/home/FuelHero';
import CinematicSection from '../components/CinematicSection';
import ResultsSection from '../components/ResultsSection';
import AppleCardsCarouselDemo from '../components/AppleCardsCarouselDemo';
import ServicesSection from '../components/ServicesSection';
import FeaturedCases from '../components/FeaturedCases';
import BookACall from '../components/BookACall';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#1E2BFF] selection:text-white">
            <HatamexNavbar />
            <FuelHero />
            <ServicesSection />
            <AppleCardsCarouselDemo />
            <ResultsSection />
            <CinematicSection />
            <FeaturedCases />
            <BookACall theme="dark" />
            <Footer theme="dark" />
        </div>
    );
}
