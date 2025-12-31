import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CookiePopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const hasAccepted = localStorage.getItem('cookies-accepted');
        if (!hasAccepted) {
            // Small delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookies-accepted', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] max-w-[320px] w-[calc(100vw-3rem)]"
                >
                    {/* Main White Box */}
                    <div className="bg-white border-[2px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative flex flex-col overflow-hidden">

                        {/* Header/Top Bar */}
                        <div className="border-b-[2px] border-black flex justify-end items-center p-2 bg-white">
                            <button
                                onClick={handleAccept}
                                className="hover:bg-gray-100 p-1 transition-colors group"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 md:p-8 flex flex-col items-center text-center">
                            <h2 className="text-2xl md:text-3xl font-black text-black mb-4 tracking-tight leading-none uppercase">
                                Cookie Consent
                            </h2>

                            <p className="text-sm md:text-base text-black font-bold mb-6 leading-snug">
                                We use cookies to enhance your Racan AI experience.
                            </p>

                            {/* Button */}
                            <button
                                onClick={handleAccept}
                                className="group relative w-full"
                            >
                                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"></div>
                                <div className="relative bg-[#2D2D2D] text-white py-3 px-6 border-[2px] border-black text-lg font-black uppercase tracking-wider group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform active:translate-x-1 active:translate-y-1 active:transition-none">
                                    I Accept
                                </div>
                            </button>
                        </div>

                        {/* Pointer Illustration */}
                        <div className="absolute bottom-4 right-3 pointer-events-none opacity-10 hidden md:block">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                                <path d="M7 2l12 12-4.5.5L18 21l-3 1.5-3.5-6.5L7 20V2z" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookiePopup;
