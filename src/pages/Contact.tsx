import HatamexNavbar from '../components/HatamexNavbar';
import BookACall from '../components/BookACall';
import Footer from '../components/Footer';

export default function Contact() {
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-[#1E2BFF] selection:text-white">
            <HatamexNavbar />
            <BookACall theme="light" />
            <Footer theme="dark" />
        </div>
    );
}
