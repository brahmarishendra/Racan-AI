import React, { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface AdPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const AdPopup: React.FC<AdPopupProps> = ({ isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has previously closed the popup
        const hasClosed = localStorage.getItem('closebyuser');

        if (isOpen && !hasClosed) {
            setIsVisible(true);

            // Auto-close after 40 seconds
            const autoCloseTimer = setTimeout(() => {
                onClose();
            }, 40000);

            return () => clearTimeout(autoCloseTimer);
        }
    }, [isOpen, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('closebyuser', 'true');
        onClose();
    };

    if (!isVisible || !isOpen) {
        return null;
    }
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 font-sans">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
                onClick={handleClose}
            ></div>

            {/* Modal - Styled to match the provided UI image */}
            <div className="relative bg-white rounded-[2rem] shadow-2xl max-w-[400px] w-full animate-fade-in-up z-10 overflow-hidden flex flex-col">

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 p-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full close-icon"
                >
                    <X size={20} />
                </button>

                {/* Top Image Section */}
                <div className="h-[280px] w-full relative">
                    <img
                        src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop"
                        alt="Abstract 3D Art"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90"></div>
                </div>

                {/* Content Section */}
                <div className="px-8 pb-8 -mt-12 relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
                        Upgrade to Racan AI, <br />
                        Your style journey here!
                    </h3>

                    <p className="text-gray-500 text-sm mb-6">
                        Get premium AI styling advice and upgrade your wardrobe.
                    </p>

                    {/* "Upload" Row Mimic - Product/Plan Info */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-3 flex items-center justify-between shadow-sm mb-4">
                        <div className="flex items-center gap-3">
                            <img
                                src="https://i.postimg.cc/VsFmP0Fm/Racan-ai.jpg"
                                alt="Racan AI Logo"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900">Racan AI Premium</span>
                                <span className="text-[10px] text-gray-400">Unlimited Styling</span>
                            </div>
                        </div>
                        <div className="bg-black text-white text-xs px-4 py-2 rounded-full font-medium flex items-center gap-1">
                            <Sparkles size={12} />
                            <span>Pro</span>
                        </div>
                    </div>

                    {/* "Input" Row Mimic - Price Display */}
                    <div className="bg-gray-50 rounded-2xl px-5 py-4 mb-8 flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Special Price</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-gray-400 text-xs line-through">?999</span>
                            <span className="text-gray-900 font-bold text-lg">?499</span>
                        </div>
                    </div>

                    {/* "Continue" Button Mimic - Action Button */}
                    <a
                        href="https://racan-ai.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-black text-white text-center py-4 rounded-full font-medium hover:bg-gray-900 transition-colors shadow-lg"
                    >
                        Get Now
                    </a>

                </div>
            </div>
        </div>
    );
};

export default AdPopup;
