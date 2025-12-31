import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Users, Star, ArrowRight, Bot, Sparkles, FileCode, Terminal, PenTool, Smartphone, Globe, Workflow } from 'lucide-react';
import BlurText from './BlurText';
import ScrambledText from './ScrambledText';

function Hero() {
  const handleAnimationComplete = () => {
    // Animation completed
  };

  const handleTryRacanClick = () => {
    window.location.href = 'https://lookbook-psus.onrender.com/';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const marqueeLogos = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="relative min-h-[105vh] bg-black overflow-hidden pt-24">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-100">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-[1400px] mx-auto px-6 lg:px-12 h- full flex flex-col justify-between pt-12 lg:pt-16 pb-32"
      >
        {/* Added pb-32 to give space for the absolute marquee so content doesn't overlap */}
        <div className="grid lg:grid-cols-2 gap-12 items-start z-10">
          {/* Left Column: Refined Typography */}
          <div className="flex flex-col gap-6 max-w-xl">
            <BlurText
              text="Match your unique taste!"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-2xl mb-8 text-white font-bold"
            />
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-[5.5rem] font-bold leading-[1] tracking-tighter text-white uppercase relative"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              <ScrambledText
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
              >
                Redefine Your
              </ScrambledText>
              <br />
              <span style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                fontWeight: '400',
                textTransform: 'none',
                marginLeft: '0.1em'
              }}>Style With
                <motion.span
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="ml-0.9 w-5 h-5 lg:w-4 lg:h-4 bg-[#D4FF00] rounded-full inline-block mt-3"
                ></motion.span>
              </span>
              <br />

              <ScrambledText
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
              >
                Racan AI
              </ScrambledText>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base lg:text-lg text-white/70 font-medium leading-relaxed max-w-md"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Building India’s First Full-Fledged AI-Commerce Ecosystem for Fashion
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-row items-center gap-4 sm:gap-8 mt-6 sm:mt-2">
              <div className="flex items-center gap-2 sm:gap-4 group cursor-pointer" style={{ fontFamily: '"Inter", sans-serif' }}>
                <div className="text-xl sm:text-2xl font-black text-white">5K+</div>
                <div className="flex flex-col">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white/20 overflow-hidden bg-gray-200 shadow-sm">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[7px] sm:text-[9px] font-bold uppercase tracking-widest text-white/50 mt-1">Active AI Stylists</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTryRacanClick}
                style={{ fontFamily: '"Inter", sans-serif' }}
                className="bg-[#D4FF00] text-black ml-18 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full font-black text-[14px] sm:text-xs flex items-center gap-2 sm:gap-3 transition-all shadow-xl group border-none cursor-pointer whitespace-nowrap"
              >
                Try Now <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>
            </motion.div>

            {/* Bottom Glass Card - Refined size 
            <motion.div variants={itemVariants} className="mt-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] max-w-xs shadow-xl group transition-all hover:bg-white/20">
                <h3 className="text-xl font-bold uppercase text-white leading-tight mb-4">Evolution of <br /> the Fastest</h3>
                <a href="https://dreamxworld.com/" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white flex items-center gap-2 no-underline transition-colors">
                  Discover Tech <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
            */}
          </div>

          {/* Right Column: Centered Widget Stack */}
          <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-end justify-center gap-10 lg:h-[550px] relative z-10">

            {/* Testimonial Widget - Top position */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10  mr-4 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] flex items-center gap-5 w-full max-w-[340px] z-20 group cursor-default"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4FF00]/30 p-0.5">
                  <img src="https://i.pravatar.cc/100?img=33" alt="avatar" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#D4FF00] rounded-full p-1 shadow-lg">
                  <Star className="w-3 h-3 text-black fill-current" />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <h5 className="font-bold text-sm text-white font-outfit uppercase tracking-wider">John Terry</h5>
                <p className="text-[11px] text-white/50 font-medium">Ultra precision AI!</p>
                <div className="flex gap-0.5 mt-1 text-[#D4FF00]">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
              </div>
            </motion.div>

            {/* Spec Widget Overlay - Centered below Testimonial */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2.5rem] shadow-2xl w-full max-w-[380px] z-20"
            >
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 block">Technical Specs</span>
                  <div className="flex gap-2">
                    {['Frameset', 'Brakes'].map((tab) => (
                      <button key={tab} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border-none cursor-pointer ${tab === 'Brakes' ? 'bg-[#D4FF00] text-black shadow-lg shadow-[#D4FF00]/20' : 'bg-white/10 text-white/60'} hover:scale-105`}>
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white leading-tight">Elite AI styling engine for luxury fashion enjoyment</h4>

                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-6 mt-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase text-white mb-1">PRECISION</span>
                    <p className="text-xs text-white/40 leading-tight">V8-Turbo Rendering</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase text-white mb-1">ENGINE</span>
                    <p className="text-xs text-white/40 leading-tight">Neural Sync 4.0</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div >
      </motion.div >
      {/* Closed the Max-W Container Here */}

      {/* Bottom Logo Cloud - Infinite Marquee - NOW OUTSIDE, FULL WIDTH */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 py-8 z-20"
        style={{
          background: 'linear-gradient(to right, #064e3b, #065f46)' // Dark green gradient
        }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
      >
        <div className="flex w-full overflow-hidden select-none mask-fade">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex flex-nowrap gap-16 md:gap-24 items-center shrink-0 min-w-full px-10"
          >
            {[
              { name: "Racan AI", icon: Bot },
              { name: "Dream X Store", icon: Smartphone },
              { name: "Code", icon: Terminal },
              { name: "Rockage", icon: Globe },
              { name: "Zapier", icon: Workflow },
              { name: "Racan AI", icon: Bot },
              { name: "Dream X Store", icon: Sparkles },
              { name: "Coders", icon: Terminal },
              { name: "Rockage", icon: Globe },
              { name: "Zapier", icon: Workflow },
            ].map((brand, idx) => (
              <div key={idx} className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
                <brand.icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
                <span className="text-lg font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-wider">{brand.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div >
  );
}

export default Hero;
