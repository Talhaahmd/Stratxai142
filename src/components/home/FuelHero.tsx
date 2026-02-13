import { ReactLenis } from "lenis/react";
import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
} from "motion/react";
import { useRef } from "react";

export default function FuelHero() {
    return (
        <div className="bg-black">
            <ReactLenis
                root
                options={{
                    lerp: 0.05,
                }}
            >
                {/* Nav is handled by HatamexNavbar in parent */}
                <Hero />
                <Schedule />
            </ReactLenis>
        </div>
    );
}

const SECTION_HEIGHT = 1500;

const Hero = () => {
    return (
        <div
            style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
            className="relative w-full"
        >
            <CenterImage />

            <ParallaxImages />

            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-black/0 to-black z-20" />
        </div>
    );
};

const CenterImage = () => {
    const { scrollY } = useScroll();

    const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
    const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

    const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

    const backgroundSize = useTransform(
        scrollY,
        [0, SECTION_HEIGHT + 500],
        ["170%", "100%"]
    );
    const opacity = useTransform(
        scrollY,
        [SECTION_HEIGHT, SECTION_HEIGHT + 500],
        [1, 0]
    );

    return (
        <motion.div
            className="sticky top-0 h-screen w-full bg-black"
            style={{
                clipPath,
                backgroundSize,
                opacity,
                backgroundImage:
                    "url(https://images.pexels.com/photos/8193814/pexels-photo-8193814.jpeg)", // Meeting / Strategy image
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Content Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
                {/* STRAT X Branding */}
                <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16 flex items-baseline gap-4 select-none">
                    <h1 className="text-[12vw] md:text-[8vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                        STRAT
                    </h1>
                    <h1 className="text-[12vw] md:text-[8vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                        X
                    </h1>
                </div>
            </div>
        </motion.div>
    );
};

const ParallaxImages = () => {
    return (
        <div className="mx-auto max-w-5xl px-4 pt-[200px] relative z-10">
            <ParallaxImg
                src="https://elements-resized.envatousercontent.com/elements-cover-images/61fbf556-e335-4d87-b33a-0a046d028906?w=2038&cf_fit=scale-down&q=85&format=auto&s=c375202aec9e43f9750bc2691619d67808636daf86437a197f62b6379f510c11" // Office / Planning
                alt="Strategy Planning"
                start={-200}
                end={200}
                className="w-1/3 rounded-lg shadow-2xl"
            />
            <ParallaxImg
                src="https://elements-resized.envatousercontent.com/elements-cover-images/c9035547-93d7-440e-a28a-eb13598938a1?w=2038&cf_fit=scale-down&q=85&format=auto&s=f6d190812da6785e283bd09d4e35eb350a0dbef7e52e07517245cc81fbc11bab" // Videography / Camera
                alt="Videography Setup"
                start={200}
                end={-250}
                className="mx-auto w-2/3 rounded-lg shadow-2xl"
            />
            <ParallaxImg
                src="https://elements-resized.envatousercontent.com/elements-cover-images/40e21abe-d6fc-4c94-8f90-95a7fdcab10f?w=2038&cf_fit=scale-down&q=85&format=auto&s=73899cc4f47c7c3b4995de2c3bb3d4cdb92ecec98cad3da47fc72102354160bf" // Branding / Design
                alt="Branding Design"
                start={-200}
                end={200}
                className="ml-auto w-1/3 rounded-lg shadow-2xl"
            />
            <ParallaxImg
                src="https://elements-resized.envatousercontent.com/elements-cover-images/3bab7125-641a-4424-b816-41594551adbd?w=2038&cf_fit=scale-down&q=85&format=auto&s=1cfc686a50a61db52d89180d71e9106af6b19632fbed94528b529e824015fbcb" // Team Collaboration
                alt="Team Collaboration"
                start={0}
                end={-500}
                className="ml-24 w-5/12 rounded-lg shadow-2xl"
            />
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ParallaxImg = ({ className, alt, src, start, end }: any) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`${start}px end`, `end ${end * -1}px`],
    });

    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

    const y = useTransform(scrollYProgress, [0, 1], [start, end]);
    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

    return (
        <motion.img
            src={src}
            alt={alt}
            className={className}
            ref={ref}
            style={{ transform, opacity }}
        />
    );
};

const Schedule = () => {
    return (
        <section
            id="launch-schedule"
            className="mx-auto max-w-5xl px-4 py-32 md:py-48 text-white relative z-10 flex flex-col items-center justify-center text-center"
        >
            <motion.h3
                initial={{ y: 48, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.75 }}
                className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6"
            >
                We help ideas become brands.
            </motion.h3>

            <motion.p
                initial={{ y: 48, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
                className="text-lg md:text-2xl text-white/70 max-w-3xl leading-relaxed mb-10"
            >
                We design AI-powered websites and marketing systems that automate growth, attract qualified customers, and help brands scale faster with less manual effort.
            </motion.p>

            <motion.div
                initial={{ y: 48, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.75, delay: 0.4 }}
            >
                <a
                    href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2qFC4jqPXjFkMuhjKV3LIUBT6jY4neDuMSxPbwSwTnLMJJ4G0tkheqCSslN_qHmQf7i2SZCEli?mcp_token=eyJwaWQiOjM0MjEwMzEsInNpZCI6MTkyODM3Mzc1MCwiYXgiOiIyNjkxN2I2YjdmZDFmMjUxNmU2NzVmZThjOGY5NTVjMSIsInRzIjoxNzcxMDA5ODQwLCJleHAiOjE3NzM0MjkwNDB9.iIqVUpHA20C77QC-YFx8TLLkdO9lg7LbQeXhvvyambM&fbclid=PAVERFWAP8VoNleHRuA2FlbQIxMABzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAad0WZS9izx3XAtXbflkpPGfGYxtvk9HMa11Rf3DSQkUBL5INjAx6Kwx4pI94A_aem_Y9fPmtryz55XZVQUv3mHUA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-600/50"
                >
                    Book a call
                </a>
            </motion.div>
        </section>
    );
};
