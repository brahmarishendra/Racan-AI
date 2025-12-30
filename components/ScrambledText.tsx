import React, { useEffect, useState, useRef, useCallback } from 'react';

interface ScrambledTextProps {
    text?: string;
    children?: string;
    className?: string;
    duration?: number;
    speed?: number;
    scrambleChars?: string;
    radius?: number; // Added to match user snippet, though implementation might vary
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
    text,
    children,
    className = '',
    duration = 1.2,
    scrambleChars = '!@#$%^&*()_+',
}) => {
    const targetText = text || children || '';
    const textRef = useRef<HTMLSpanElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef<number | null>(null);

    const triggerAnimation = useCallback(() => {
        if (isAnimating || !textRef.current) return;

        let startTimestamp: number | null = null;
        const totalChars = targetText.length;

        setIsAnimating(true);

        const animate = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = (timestamp - startTimestamp) / (duration * 1000);

            if (progress < 1) {
                let currentText = '';
                for (let i = 0; i < totalChars; i++) {
                    if (targetText[i] === ' ') {
                        currentText += ' ';
                        continue;
                    }

                    const revealThreshold = i / totalChars;
                    if (progress > revealThreshold) {
                        currentText += targetText[i];
                    } else {
                        const randomIndex = Math.floor(Math.random() * scrambleChars.length);
                        currentText += scrambleChars[randomIndex];
                    }
                }

                if (textRef.current) {
                    textRef.current.textContent = currentText;
                }
                animationRef.current = requestAnimationFrame(animate);
            } else {
                if (textRef.current) {
                    textRef.current.textContent = targetText;
                }
                setIsAnimating(false);
            }
        };

        animationRef.current = requestAnimationFrame(animate);
    }, [targetText, duration, scrambleChars, isAnimating]);

    useEffect(() => {
        // Initial state
        if (textRef.current) {
            textRef.current.textContent = '';
        }
        triggerAnimation();
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <span
            ref={textRef}
            className={`${className} cursor-default`}
            onMouseEnter={triggerAnimation}
        >
            {targetText}
        </span>
    );
};

export default ScrambledText;
