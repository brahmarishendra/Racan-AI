import React, { useEffect, useState, useRef } from 'react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative min-h-[300px] flex items-center overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
    >
      <div className="flex flex-col md:flex-row w-full h-full min-h-[300px]">
        {/* Left Side - Image Container */}
        <div className="w-full md:w-1/2 relative md:min-h-0 bg-white flex items-center justify-center h-[600px]">
          <img
            src="https://i.postimg.cc/jjp2L24q/Jacket-and-Cap-Style-Statement.png"
            alt="Racan AI Model"
            className="w-full h-full object-cover rounded-[1px] h-[600px]"
          />
        </div>

        {/* Right Side - Content Container */}
        <div className="w-full md:w-1/2 bg-[#022c22] relative overflow-hidden flex items-center p-6 md:p-8 h-[600px]">
          {/* Large Decorative Circle (As in Image 0) */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-emerald-600 rounded-full opacity-80 blur-3xl pointer-events-none animate-pulse"></div>
          <div className="absolute top-1/2 right-[-100px] -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500 rounded-full z-0 opacity-90 hidden md:block opacity-10"></div>

          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
              About <span className="text-emerald-400">Racan AI</span>
            </h2>

            <p className="text-sm md:text-base text-emerald-100/80 mb-6 leading-relaxed font-light">
              <span className="text-white font-semibold">Racan AI</span> is a revolutionary fashion assistant that combines artificial intelligence with e-commerce to transform your shopping experience.
              Our platform understands your unique style preferences, body type, and fashion needs to provide personalized recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href="#"
                className="inline-flex items-center justify-center bg-emerald-600 text-white px-6 py-3 rounded-full font-bold text-base hover:bg-emerald-500 transition-all transform hover:-translate-y-1 shadow-xl shadow-emerald-900/40 no-underline"
              >
                Learn More
              </a>
              <div className="flex -space-x-2 items-center mt-2 sm:mt-0 px-4">
                <div className="w-8 h-8 rounded-full border-2 border-[#022c22] bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full border-2 border-[#022c22] bg-gray-300"></div>
                <div className="w-8 h-8 rounded-full border-2 border-[#022c22] bg-gray-400"></div>
                <div className="pl-4 text-xs text-emerald-200/60 font-medium">Join 50,000+ users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default About;
