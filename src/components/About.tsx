import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setTextVisible(true), 300);
          setTimeout(() => setImageVisible(true), 600);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      id="about" 
      className="py-16 md:py-24 bg-white relative overflow-hidden border-t border-gray-100"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-50/30"></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-50/20 to-purple-50/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: 'transform 0.6s ease-out',
            top: '10%',
            left: '10%',
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-br from-purple-50/15 to-blue-50/15 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.008}px, ${mousePosition.y * -0.008}px)`,
            transition: 'transform 0.6s ease-out',
            bottom: '10%',
            right: '10%',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center ml-[0rem] sm:ml-0 md:ml-[2.6rem]">
            
            {/* Text Content */}
            <div className="order-2 md:order-1" ref={textRef}>
              <div 
                className={`transform transition-all duration-1000 ease-out ${
                  textVisible 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-12 opacity-0'
                }`}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 font-bold mb-6 font-manrope relative tracking-tight">
                  <span className="inline-block">About</span>
                  <span 
                    className="inline-block ml-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
                  >
                    Racan AI
                  </span>
                  <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gray-900 rounded-full"></div>
                </h2>
              </div>

              <div 
                className={`transform transition-all duration-1000 delay-300 ease-out ${
                  textVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <p className="text-sm md:text-xl leading-relaxed text-gray-600 mb-8 font-light">
                  <span className="font-medium text-gray-900">
                    Racan AI
                  </span> is a revolutionary fashion assistant that combines artificial
                  intelligence with e-commerce to transform your shopping
                  experience. Our platform understands your unique style
                  preferences, body type, and fashion needs to provide
                  personalized recommendations.
                </p>
              </div>

              <div 
                className={`transform transition-all duration-1000 delay-500 ease-out ${
                  textVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <button
                  className="group inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Image Content */}
            <div className="order-1 md:order-2" ref={imageRef}>
              <div 
                className={`transform transition-all duration-1200 ease-out ${
                  imageVisible 
                    ? 'translate-x-0 opacity-100 scale-100' 
                    : 'translate-x-12 opacity-0 scale-95'
                }`}
              >
                <div className="relative w-full max-w-[360px] h-[480px] sm:max-w-[360px] sm:h-[480px] md:max-w-[455px] md:h-[600px] mx-auto overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-700 group bg-white border border-gray-100">
                  
                  {/* Main Image */}
                  <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden">
                    <img
                      src="https://i.postimg.cc/jjp2L24q/Jacket-and-Cap-Style-Statement.png"
                      alt="Racan AI Feature"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay Effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Corner Accent */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-gray-900 rounded-full opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes expand-width {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-expand-width {
          animation: expand-width 2s ease-out forwards;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default About;