import React, { useState, useEffect } from 'react';

interface StartupAnimationProps {
  onComplete: () => void;
}

const StartupAnimation: React.FC<StartupAnimationProps> = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 200);
    const timer2 = setTimeout(() => setAnimationPhase(2), 800);
    const timer3 = setTimeout(() => onComplete(), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[10000]">
      {/* Simple centered logo */}
      <div className="flex flex-col items-center justify-center">
        {/* Logo with fade-in and scale animation */}
        <div className={`transition-all duration-1000 ease-out ${
          animationPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <img
            src="https://i.postimg.cc/rsYBTFzm/image-41.png"
            alt="Racan AI"
            className="w-24 h-24 object-contain"
          />
        </div>
        
        {/* Brand name with slide-up animation */}
        <div className={`mt-6 text-center transition-all duration-800 delay-300 ${
          animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Racan AI
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-normal">
            AI-Powered Fashion Assistant
          </p>
        </div>
        
        {/* Simple loading indicator */}
        <div className={`mt-8 transition-all duration-500 delay-500 ${
          animationPhase >= 2 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupAnimation;