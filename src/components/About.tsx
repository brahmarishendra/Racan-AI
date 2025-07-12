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
      className="py-16 md:py-24 bg-[#EEFFC1] relative overflow-hidden"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-32 h-32 bg-gradient-to-br from-[#004AAD]/10 to-[#973cff]/10 rounded-full blur-xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out',
            top: '10%',
            left: '10%',
          }}
        />
        <div 
          className="absolute w-24 h-24 bg-gradient-to-br from-[#973cff]/15 to-[#004AAD]/15 rounded-full blur-lg"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
            transition: 'transform 0.3s ease-out',
            top: '60%',
            right: '15%',
          }}
        />
        <div 
          className="absolute w-16 h-16 bg-gradient-to-br from-[#004AAD]/20 to-[#973cff]/20 rounded-full blur-md"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: 'transform 0.3s ease-out',
            bottom: '20%',
            left: '20%',
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
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#004AAD] font-semibold mb-6 font-manrope relative">
                  <span className="inline-block hover:animate-pulse">About</span>
                  <span 
                    className="inline-block ml-2 bg-gradient-to-r from-[#004AAD] to-[#973cff] bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 cursor-default"
                  >
                    Racan AI
                  </span>
                  <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#004AAD] to-[#973cff] animate-expand-width"></div>
                </h2>
              </div>

              <div 
                className={`transform transition-all duration-1000 delay-300 ease-out ${
                  textVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <p className="text-sm md:text-xl leading-relaxed text-black md:text-gray-900 mb-8 hover:text-gray-700 transition-colors duration-300">
                  <span className="font-normal text-[#004AAD] hover:text-[#973cff] transition-colors duration-300 cursor-default">
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
                <a
                  href="#"
                  className="group inline-block bg-[#004AAD] text-white px-8 py-4 rounded-full hover:bg-[#d70153] transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
                >
                  <span className="relative z-10 group-hover:animate-pulse">Learn More</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#973cff] to-[#d70153] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#004AAD] to-[#973cff] rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
                </a>
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
                <div className="relative w-full max-w-[360px] h-[480px] sm:max-w-[360px] sm:h-[480px] md:max-w-[455px] md:h-[600px] mx-auto overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-700 group">
                  
                  {/* Glowing Border Animation */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#004AAD] via-[#973cff] to-[#d70153] rounded-2xl opacity-0 group-hover:opacity-75 blur-sm animate-pulse transition-opacity duration-500"></div>
                  
                  {/* Main Image */}
                  <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden">
                    <img
                      src="https://i.postimg.cc/jjp2L24q/Jacket-and-Cap-Style-Statement.png"
                      alt="Racan AI Feature"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#004AAD]/20 to-[#973cff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    
                    {/* Corner Accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;