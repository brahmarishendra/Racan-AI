import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface BlurTextProps {
    text: string;
    delay?: number;
    animateBy?: 'words' | 'letters';
    direction?: 'top' | 'bottom';
    onAnimationComplete?: () => void;
    className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({
    text,
    delay = 200,
    animateBy = 'words',
    direction = 'top',
    onAnimationComplete,
    className = '',
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const [animatedCount, setAnimatedCount] = useState(0);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });

    useEffect(() => {
        if (animatedCount === elements.length && onAnimationComplete) {
            onAnimationComplete();
        }
    }, [animatedCount, elements.length, onAnimationComplete]);

    const variants: Variants = {
        hidden: {
            filter: 'blur(10px)',
            opacity: 0,
            y: direction === 'top' ? -20 : 20,
        },
        visible: {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
        },
    };

    return (
        <p ref={containerRef} className={`flex flex-wrap ${className}`}>
            {elements.map((element, index) => (
                <motion.span
                    key={index}
                    variants={variants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    transition={{
                        duration: 0.4,
                        delay: (index * delay) / 1000,
                        ease: 'easeOut',
                    }}
                    onAnimationComplete={() => setAnimatedCount((prev) => prev + 1)}
                    className="inline-block"
                    style={{ whiteSpace: 'pre' }}
                >
                    {element === ' ' ? '\u00A0' : element}
                    {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
                </motion.span>
            ))}
        </p>
    );
};

export default BlurText;
