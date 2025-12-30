import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (containerRef.current && imageRef.current) {
        // Set initial states via GSAP to avoid conflicts with autoAlpha
        gsap.set(containerRef.current, { autoAlpha: 0, xPercent: -100 });
        gsap.set(imageRef.current, { xPercent: 100, scale: 1.3 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            toggleActions: "play none none reverse",
            start: "top 85%",
            // markers: true,
          }
        });

        tl.to(containerRef.current, {
          autoAlpha: 1,
          xPercent: 0,
          duration: 1.5,
          ease: "power2.out"
        })
          .to(imageRef.current, {
            xPercent: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
          }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[300px] flex items-center overflow-hidden bg-white"
      style={{ position: 'relative' }}
    >
      <div className="flex flex-col md:flex-row w-full h-full min-h-[300px]" style={{ position: 'relative' }}>
        {/* Left Side - Image Container */}
        <div
          ref={containerRef}
          className="w-full md:w-1/2 relative md:min-h-0 bg-white h-[500px] reveal-container overflow-hidden"
        >
          <img
            ref={imageRef}
            src='/images/Racan.jpeg'
            alt="Racan AI Model"
            className="w-full h-full object-cover rounded-[1px] min-w-full min-h-full"
          />
        </div>

        {/* Right Side - Content Container */}
        <div className="w-full md:w-1/2 bg-[#022c22] relative overflow-hidden flex items-center p-6 md:p-8 h-[500px]">
          {/* Large Decorative Circle */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-emerald-600 rounded-full opacity-80 blur-3xl pointer-events-none animate-pulse"></div>

          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-[4rem] font-black text-white mb-6 leading-[1] tracking-tighter">
              About <span className="text-emerald-400">Racan AI</span>
            </h2>

            <p className="text-base md:text-lg text-emerald-100/80 mb-8 leading-relaxed font-medium">
              <span className="text-white font-bold">Racan AI</span> is a revolutionary fashion assistant that combines artificial intelligence with e-commerce to transform your shopping experience.
              Our platform understands your unique style preferences, body type, and fashion needs to provide personalized recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <button
                onClick={() => window.location.href = '#'}
                className="inline-flex items-center justify-center bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-emerald-500 transition-all transform hover:-translate-y-1 shadow-xl shadow-emerald-900/40 border-none cursor-pointer"
              >
                Learn More
              </button>
              <div className="flex -space-x-3 items-center mt-2 sm:mt-0 px-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#022c22] overflow-hidden bg-gray-200">
                    <img src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="pl-6 text-sm text-emerald-200/80 font-bold uppercase tracking-widest">Join 50k+ Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
