import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const Products: React.FC = () => {
  return (
    <section
      id="products"
      className="py-24 bg-[#031A32] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fadeInUp">
          <span className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Exclusive Drops</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Upcoming Collections</h2>
          <div className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-[#031A32]  overflow-hidden border flex flex-col md:flex-row min-h-[500px] group">
            {/* Image Section */}
            <div className="w-full md:w-[60%] relative overflow-hidden">
              <img
                src="https://i.pinimg.com/1200x/80/04/00/800400bd197cfa257cc6d6c83129b490.jpg"
                alt="Chevelure Collection"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute top-8 left-8 bg-white/90 px-6 py-2 rounded-full border border-white/50">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Premium Drop</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-[40%] bg-[#031A32] p-12 flex flex-col justify-center text-white relative">
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>

              <div className="mb-8">
                <div className="flex items-center gap-2 text-blue-400 mb-4">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-widest">Coming Soon</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  Chevelure <br />
                  <span className="text-blue-400">Collection</span>
                </h3>
                <p className="text-blue-100/70 text-lg leading-relaxed mb-10">
                  India's first AI-curated experimental fashion line. Redefining how you interact with premium apparel.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sm font-medium text-blue-200/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Limited Edition Release</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-blue-200/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>Sustainable Materials</span>
                </div>
              </div>

              <div className="mt-12">
                <button
                  onClick={() => window.location.href = 'https://chat-with-racan.vercel.app'}
                  className="group inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-500 transition-all transform hover:-translate-y-1 shadow-xl border-none cursor-pointer"
                >
                  Notify Me <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-900/10 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
    </section>
  );
};

export default Products;
