import { EncryptedText } from "./ui/encrypted-text";
import { motion } from "motion/react";

interface LoadingScreenProps {
    onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black text-white"
            onAnimationComplete={onComplete}
        >
            <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
                    <EncryptedText
                        text="We are the StratX AI."
                        className="uppercase"
                        encryptedClassName="text-white/20"
                        revealedClassName="text-white"
                        revealDelayMs={60}
                    />
                </h2>
            </div>
        </motion.div>
    );
}
