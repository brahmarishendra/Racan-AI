import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollRevealProps {
    text: string;
    className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ text, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const words = text.split(" ");

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const spans = textRef.current?.querySelectorAll('.reveal-word');
            if (spans && spans.length > 0) {
                gsap.fromTo(spans,
                    { opacity: 0.15 },
                    {
                        opacity: 1,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            end: "top 20%",
                            scrub: true,
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, [text]);

    return (
        <section
            ref={containerRef}
            className={`relative py-32 px-6 lg:px-12 bg-[#F4F4F4] ${className}`}
            style={{ position: 'relative' }}
        >
            <div className="max-w-[1200px] mx-auto">
                <h2
                    ref={textRef}
                    className="text-4xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-black flex flex-wrap"
                >
                    {words.map((word, i) => (
                        <span key={i} className="relative inline-block mr-[0.25em]">
                            <span className="reveal-word">{word}</span>
                        </span>
                    ))}
                </h2>
            </div>
        </section>
    );
};

export default ScrollReveal;
