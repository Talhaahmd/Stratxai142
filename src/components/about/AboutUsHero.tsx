"use client";

type Props = {
    videoSrc?: string;
};

export default function AboutUsHero({
    videoSrc = "https://res.cloudinary.com/dt93sahp2/video/upload/v1764847053/ai_video_short_lkasrf.mp4",
}: Props) {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Full-screen video */}
            <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Subtle black overlay */}
            <div className="absolute inset-0 bg-black/25" />
        </section>
    );
}
