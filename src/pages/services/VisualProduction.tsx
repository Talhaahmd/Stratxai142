import HatamexNavbar from '../../components/HatamexNavbar';
import Footer from '../../components/Footer';

const VisualProduction = () => {
    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <HatamexNavbar />
            <div className="pt-48 pb-32 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
                <span className="text-[#1E2BFF] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                    SERVICES / PHOTOGRAPHY & VISUAL PRODUCTION
                </span>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8">
                    Photography & Visual Production
                </h1>
                <p className="text-xl text-neutral-500 max-w-2xl">
                    Coming soon. We are currently polishing this service page to match the Klarus AI standard.
                </p>
                <div className="mt-12">
                    <a href="/" className="bg-black text-white px-8 py-4 rounded-lg font-bold text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors">
                        GO BACK HOME
                    </a>
                </div>
            </div>
            <Footer theme="light" />
        </div>
    );
};

export default VisualProduction;
