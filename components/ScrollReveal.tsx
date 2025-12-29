import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
    text: string;
    className?: string;
}

const Word = ({ children, progress, range }: { children: string; progress: any; range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0.15, 1]);

    return (
        <span className="relative inline-block mr-[0.25em]">
            <span className="absolute opacity-[0.05]">{children}</span>
            <motion.span style={{ opacity }}>
                {children}
            </motion.span>
        </span>
    );
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ text, className }) => {
    const container = useRef<HTMLDivElement>(null);
    const words = text.split(" ");

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.8", "start 0.2"]
    });

    return (
        <section ref={container} className={`relative py-32 px-6 lg:px-12 bg-[#F4F4F4] ${className}`}>
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-4xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-black flex flex-wrap">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        );
                    })}
                </h2>
            </div>
        </section>
    );
};

export default ScrollReveal;
