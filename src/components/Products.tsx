import React from 'react';
import { Sparkles } from 'lucide-react';

const Products: React.FC = () => {
  return (
    <section
      id="products"
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 -mt-[30px] text-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric shapes */}
        <div className="absolute w-16 h-16 opacity-5 top-20 left-10" style={{
          background: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="absolute w-12 h-12 opacity-10 bottom-32 right-16" style={{
          background: 'linear-gradient(135deg, #4B5563 0%, #6B7280 100%)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '2s'
        }}></div>
        
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 800 600">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6B7280" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-5 text-center mb-3">
            <div className="text-xs md:text-sm text-gray-600 opacity-80">
              SOON
            </div>
            <div className="text-xs md:text-sm text-gray-600 opacity-80">
              SPECIAL
            </div>
            <div className="text-xs md:text-sm text-gray-600 opacity-80"></div>
            <div className="text-xs md:text-sm text-gray-600 opacity-80">
              Ecommerce
            </div>
            <div className="text-xs md:text-sm text-gray-600 opacity-80">
              SOON
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-300/20">
            <div className="grid grid-cols-5 h-96 md:h-[28rem] relative">
              <div className="col-span-2 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center relative overflow-hidden">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-30">
                  <Sparkles size={200} className="text-gray-400" />
                </div>
                {/* Geometric accent */}
                <div className="absolute top-4 right-4 w-8 h-8 opacity-20" style={{
                  background: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)',
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  animation: 'float 4s ease-in-out infinite'
                }}></div>
                <div className="text-center p-4">
                  <div className="text-xs md:text-sm text-gray-300 mb-2">
                    SOON
                  </div>
                  <div className="text-xs md:text-sm text-gray-300 mb-2">
                    FOR
                  </div>
                  <div className="text-xs md:text-sm text-gray-300">YOUR</div>
                </div>
              </div>

              <div className="col-span-3 relative">
                <img
                  src="https://i.pinimg.com/736x/18/54/5e/18545e118c7d768c037c88fad8033702.jpg"
                  alt="Chevelure Collection"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-center justify-center">
                  <h3 className="text-4xl md:text-6xl font-bold text-gray-200 font-serif tracking-widest"></h3>
                </div>
                {/* Corner indicators */}
                <div className="absolute top-4 right-4 w-6 h-6 border-2 border-gray-400/50 rounded-full opacity-80">
                  <div className="w-2 h-2 bg-gray-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                </div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-gray-400/50 rounded-full opacity-80">
                  <div className="w-2 h-2 bg-gray-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.href = 'https://chat-with-racan.vercel.app'}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border-none cursor-pointer border border-gray-300/30"
              style={{ borderRadius: '1px' }}
            >
              Try Racan AI
              <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-200/10 to-transparent"></div>
      
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