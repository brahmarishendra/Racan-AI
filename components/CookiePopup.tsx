import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookiePopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasAccepted = localStorage.getItem('cookies-accepted');
        if (!hasAccepted) {
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-6 left-6 md:left-10 z-[9999] max-w-[340px] w-[calc(100vw-3rem)]"
                >
                    <div className="bg-[#1A1A1A]/80 backdrop-blur-0 border border-white/10 rounded-[1px] p-6 shadow-2xl relative group overflow-hidden">
                        <div className="flex flex-col gap-4 relative z-10">
                            <p className="text-white/80 text-xs leading-relaxed font-medium">
                                We use cookies to improve your experience. By continuing, you agree to our
                                <a href="#" className="text-white underline hover:text-[#D4FF00] ml-1 transition-colors font-bold uppercase tracking-widest text-[10px]">cookie policy</a>.
                            </p>

                            <div className="flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAccept}
                                    className="flex-1 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest border border-white/10 cursor-pointer hover:bg-[#D4FF00] hover:text-black transition-all duration-300 rounded-[1px]"
                                >
                                    Accept
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAccept}
                                    className="flex-1 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest border border-white/10 cursor-pointer hover:bg-[#D4FF00] hover:text-black transition-all duration-300 rounded-[1px]"
                                >
                                    Decline
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookiePopup;
