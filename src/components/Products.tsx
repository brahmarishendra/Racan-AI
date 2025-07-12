import React from 'react';
import { Sparkles } from 'lucide-react';

const Products: React.FC = () => {
  return (
    <section
      id="products"
      className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -mt-[30px] text-white relative overflow-hidden"
    >
      {/* Portal-style background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Hexagonal floating elements */}
        <div className="absolute w-16 h-16 opacity-10 top-20 left-10" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="absolute w-12 h-12 opacity-15 bottom-32 right-16" style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '2s'
        }}></div>
        
        {/* Neural network lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="neuralProducts" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="50%" stopColor="#764ba2" />
              <stop offset="100%" stopColor="#f093fb" />
            </linearGradient>
          </defs>
          <g className="animate-pulse">
            <line x1="50" y1="100" x2="250" y2="150" stroke="url(#neuralProducts)" strokeWidth="1" />
            <line x1="250" y1="150" x2="450" y2="120" stroke="url(#neuralProducts)" strokeWidth="1" />
            <line x1="450" y1="120" x2="650" y2="180" stroke="url(#neuralProducts)" strokeWidth="1" />
            <circle cx="50" cy="100" r="2" fill="#667eea" className="animate-ping" />
            <circle cx="250" cy="150" r="2" fill="#764ba2" className="animate-ping" style={{animationDelay: '1s'}} />
            <circle cx="450" cy="120" r="2" fill="#f093fb" className="animate-ping" style={{animationDelay: '2s'}} />
            <circle cx="650" cy="180" r="2" fill="#4facfe" className="animate-ping" style={{animationDelay: '3s'}} />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-5 text-center mb-3">
            <div className="text-xs md:text-sm text-purple-300 opacity-80">
              SOON
            </div>
            <div className="text-xs md:text-sm text-blue-300 opacity-80">
              SPECIAL
            </div>
            <div className="text-xs md:text-sm text-slate-300 opacity-80"></div>
            <div className="text-xs md:text-sm text-pink-300 opacity-80">
              Ecommerce
            </div>
            <div className="text-xs md:text-sm text-purple-300 opacity-80">
              SOON
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20">
            <div className="grid grid-cols-5 h-96 md:h-[28rem] relative">
              <div className="col-span-2 bg-gradient-to-br from-amber-800 to-amber-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-30">
                  <Sparkles size={200} className="text-amber-300" />
                </div>
                {/* Portal-style hexagonal accent */}
                <div className="absolute top-4 right-4 w-8 h-8 opacity-20" style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  animation: 'float 4s ease-in-out infinite'
                }}></div>
                <div className="text-center p-4">
                  <div className="text-xs md:text-sm text-amber-300 mb-2">
                    SOON
                  </div>
                  <div className="text-xs md:text-sm text-amber-300 mb-2">
                    FOR
                  </div>
                  <div className="text-xs md:text-sm text-amber-300">YOUR</div>
                </div>
              </div>

              <div className="col-span-3 relative">
                <img
                  src="https://i.pinimg.com/736x/18/54/5e/18545e118c7d768c037c88fad8033702.jpg"
                  alt="Chevelure Collection"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent flex items-center justify-center">
                  <h3 className="text-4xl md:text-6xl font-bold text-amber-300 font-serif tracking-widest"></h3>
                </div>
                {/* Portal-style corner indicators */}
                <div className="absolute top-4 right-4 w-6 h-6 border-2 border-amber-300/50 rounded-full opacity-80">
                  <div className="w-2 h-2 bg-amber-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                </div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-amber-300/50 rounded-full opacity-80">
                  <div className="w-2 h-2 bg-amber-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.href = 'https://chat-with-racan.vercel.app'}
              className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border-none cursor-pointer border border-amber-500/30"
            >
              Try Racan AI
            </button>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-50 to-transparent"></div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default Products;