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
    speed = 0.5,
    scrambleChars = '!@#$%^&*()_+',
}) => {
    const targetText = text || children || '';
    const [displayText, setDisplayText] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef<number | null>(null);

    const triggerAnimation = useCallback(() => {
        if (isAnimating) return;

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

                    // Determine if this character should be revealed yet
                    const revealThreshold = i / totalChars;
                    if (progress > revealThreshold) {
                        currentText += targetText[i];
                    } else {
                        // Random character from scramble pool
                        const randomIndex = Math.floor(Math.random() * scrambleChars.length);
                        currentText += scrambleChars[randomIndex];
                    }
                }
                setDisplayText(currentText);
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setDisplayText(targetText);
                setIsAnimating(false);
            }
        };

        animationRef.current = requestAnimationFrame(animate);
    }, [targetText, duration, scrambleChars, isAnimating]);

    useEffect(() => {
        triggerAnimation();
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []); // Run on mount

    return (
        <span
            className={`${className} cursor-default`}
            onMouseEnter={triggerAnimation}
        >
            {displayText}
        </span>
    );
};

export default ScrambledText;
