import React from 'react';
import { Sparkles } from 'lucide-react';

const Products: React.FC = () => {
  return (
    <section
      id="products"
      className="py-16 md:py-24 bg-[#002235] -mt-[30px] text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 ">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-5 text-center mb-3">
            <div className="text-xs md:text-sm text-yellow-300 opacity-80">
              SOON
            </div>
            <div className="text-xs md:text-sm text-yellow-300 opacity-80">
              SPECIAL
            </div>
            <div className="text-xs md:text-sm text-yellow-300 opacity-80"></div>
            <div className="text-xs md:text-sm text-yellow-300 opacity-80">
              Ecommerce
            </div>
            <div className="text-xs md:text-sm text-yellow-300 opacity-80">
              SOON
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-5 h-96 md:h-[28rem] relative">
              <div className="col-span-2 bg-gradient-to-br from-amber-800 to-amber-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-30">
                  <Sparkles size={200} className="text-amber-300" />
                </div>
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
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://chat-with-racan.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Try Racan AI
            </a>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#fffcfc] to-transparent"></div>
    </section>
  );
};

export default Products;
