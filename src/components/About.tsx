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
      className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Floating Background Elements - Portal Style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Hexagonal floating elements */}
        <div 
          className="absolute w-20 h-20 opacity-10"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) rotate(45deg)`,
            transition: 'transform 0.3s ease-out',
            top: '15%',
            left: '10%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
          }}
        />
        <div 
          className="absolute w-16 h-16 opacity-15"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px) rotate(-30deg)`,
            transition: 'transform 0.3s ease-out',
            top: '60%',
            right: '15%',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
          }}
        />
        <div 
          className="absolute w-12 h-12 opacity-20"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) rotate(60deg)`,
            transition: 'transform 0.3s ease-out',
            bottom: '20%',
            left: '20%',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
          }}
        />
        
        {/* AI Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="50%" stopColor="#764ba2" />
              <stop offset="100%" stopColor="#f093fb" />
            </linearGradient>
          </defs>
          <g className="animate-pulse">
            <line x1="100" y1="150" x2="300" y2="200" stroke="url(#neuralGradient)" strokeWidth="1" />
            <line x1="300" y1="200" x2="500" y2="180" stroke="url(#neuralGradient)" strokeWidth="1" />
            <line x1="500" y1="180" x2="700" y2="220" stroke="url(#neuralGradient)" strokeWidth="1" />
            <circle cx="100" cy="150" r="3" fill="#667eea" className="animate-ping" />
            <circle cx="300" cy="200" r="3" fill="#764ba2" className="animate-ping" style={{animationDelay: '0.5s'}} />
            <circle cx="500" cy="180" r="3" fill="#f093fb" className="animate-ping" style={{animationDelay: '1s'}} />
            <circle cx="700" cy="220" r="3" fill="#4facfe" className="animate-ping" style={{animationDelay: '1.5s'}} />
          </g>
        </svg>
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
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-slate-900 font-bold mb-6 font-manrope relative">
                  <span className="inline-block hover:animate-pulse">About</span>
                  <span 
                    className="inline-block ml-2 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 cursor-default"
                  >
                    Racan AI
                  </span>
                  <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 animate-expand-width"></div>
                </h2>
              </div>

              <div 
                className={`transform transition-all duration-1000 delay-300 ease-out ${
                  textVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <p className="text-sm md:text-xl leading-relaxed text-slate-700 mb-8 hover:text-slate-900 transition-colors duration-300">
                  <span className="font-semibold text-slate-900 hover:text-purple-700 transition-colors duration-300 cursor-default">
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
                  className="group inline-block bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-4 rounded-full hover:from-purple-900 hover:to-slate-900 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden border border-slate-200"
                >
                  <span className="relative z-10 group-hover:animate-pulse">Learn More</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"></div>
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
                <div className="relative w-full max-w-[360px] h-[480px] sm:max-w-[360px] sm:h-[480px] md:max-w-[455px] md:h-[600px] mx-auto overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-700 group border border-slate-200/50">
                  
                  {/* Portal-style Glowing Border Animation */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-75 blur-sm animate-pulse transition-opacity duration-500"></div>
                  
                  {/* Main Image */}
                  <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-50 to-white">
                    <img
                      src="https://i.postimg.cc/jjp2L24q/Jacket-and-Cap-Style-Statement.png"
                      alt="Racan AI Feature"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Portal-style Overlay Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Hexagonal Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    
                    {/* Portal-style Corner Accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-lg"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-br-lg"></div>
                    
                    {/* AI Fashion Indicators */}
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="text-xs font-semibold text-slate-700">AI STYLED</div>
                    </div>
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
        
        @keyframes hexagon-pulse {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.1;
          }
          50% { 
            transform: scale(1.1) rotate(180deg);
            opacity: 0.3;
          }
        }
        
        .hexagon-animate {
          animation: hexagon-pulse 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;