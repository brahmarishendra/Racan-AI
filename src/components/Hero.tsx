import React from 'react';

function Hero() {
  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .modern-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .gradient-bg {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .modern-btn {
          background: #ff3366;
          border: none;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(255, 51, 102, 0.3);
        }

        .modern-btn:hover {
          background: #d70153;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 51, 102, 0.4);
        }

        .decorative-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(255, 51, 102, 0.1), rgba(151, 60, 255, 0.1));
        }

        .tech-grid {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.05;
          background-image: 
            radial-gradient(circle at 25% 25%, #ff3366 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #973cff 2px, transparent 2px);
          background-size: 50px 50px;
        }
      `}</style>
      
      <section className="relative min-h-screen pt-20 gradient-bg overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="tech-grid"></div>
        
        {/* Decorative Elements */}
        <div className="decorative-circle w-64 h-64 -top-32 -left-32 floating-element"></div>
        <div className="decorative-circle w-48 h-48 top-1/4 -right-24 floating-element" style={{ animationDelay: '2s' }}></div>
        <div className="decorative-circle w-32 h-32 bottom-1/4 left-1/4 floating-element" style={{ animationDelay: '4s' }}></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <div className="modern-card rounded-3xl p-8 lg:p-12 max-w-2xl">
                
                {/* Main Heading */}
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
                  <span className="block text-gray-900 text-shadow">Redefine Your</span>
                  <span className="block text-gray-900 text-shadow">Style With</span>
                  <span className="block bg-gradient-to-r from-[#ff3366] to-[#973cff] bg-clip-text text-transparent">
                    Racan
                  </span>
                </h1>

                {/* Subtitle */}
                <div className="text-lg lg:text-xl text-gray-700 mb-2 animate-fade-in-up animation-delay-300">
                  <span className="font-semibold">AI-powered assistant</span>
                  <span className="mx-2">+</span>
                  <span className="font-semibold">Fashion</span>
                </div>
                <div className="text-lg lg:text-xl text-gray-700 mb-8 animate-fade-in-up animation-delay-300">
                  <span className="font-semibold">Ecommerce</span>
                </div>

                {/* Description */}
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-10 animate-fade-in-up animation-delay-600 max-w-lg">
                  Experience the future of fashion with AI-powered Fashion assistant Ecommerce, 
                  personalized recommendations that match your unique taste.
                </p>

                {/* CTA Button */}
                <div className="animate-fade-in-up animation-delay-600">
                  <a
                    href="https://chat-with-racan.vercel.app" 
                    className="modern-btn inline-block px-8 py-4 text-lg font-semibold"
                  >
                    Try Racan
                  </a>
                </div>

                {/* Stats or Features */}
                <div className="flex items-center space-x-8 mt-12 animate-fade-in-up animation-delay-600">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">150K+</div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide">Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">AI</div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide">Powered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide">Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Visual Elements */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative">
                
                {/* Main Visual Card */}
                <div className="modern-card rounded-3xl p-8 w-80 lg:w-96 floating-element">
                  <div className="aspect-square bg-gradient-to-br from-[#ff3366] to-[#973cff] rounded-2xl mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-6xl font-bold">RA</div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-20 rounded-full backdrop-blur-sm"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-white bg-opacity-30 rounded-full backdrop-blur-sm"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI Fashion Assistant</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Personalized styling recommendations powered by advanced AI algorithms.
                  </p>
                </div>

                {/* Secondary Cards */}
                <div className="absolute -top-8 -right-8 modern-card rounded-2xl p-4 w-32 floating-element" style={{ animationDelay: '1s' }}>
                  <div className="w-full h-16 bg-gradient-to-r from-[#973cff] to-[#ff3366] rounded-lg mb-2"></div>
                  <div className="text-xs font-semibold text-gray-900">Style Match</div>
                  <div className="text-xs text-gray-600">98%</div>
                </div>

                <div className="absolute -bottom-8 -left-8 modern-card rounded-2xl p-4 w-36 floating-element" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-[#ff3366] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#973cff] rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="text-xs font-semibold text-gray-900">Smart Wardrobe</div>
                  <div className="text-xs text-gray-600">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;