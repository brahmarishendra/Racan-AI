import React, { useRef, useState } from 'react';
import { Instagram, Twitter, Linkedin, Mail, ArrowUpRight, Bot, Star, Sparkles, Facebook, ArrowRight } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const MagneticSocial = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-black hover:scale-110 transition-all no-underline relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <div className="relative z-10">{children}</div>
    </motion.a>
  );
};

const ModernLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <motion.a
      href={href}
      className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors no-underline relative w-fit"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF3A3A] scale-0 group-hover:scale-100 transition-transform duration-300"></span>
      <span className="font-medium text-base relative overflow-hidden">
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{children}</span>
        <span className="absolute left-0 top-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[#FF3A3A] font-bold">{children}</span>
      </span>
      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#FF3A3A]" />
    </motion.a>
  );
};

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="bg-[#080808] text-white pt-10 pb-12 relative overflow-hidden perspective-1000">
      {/* Top Banner Section - Red CTA */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#FF3A3A] via-[#FF5F3A] to-[#FF3A3A] p-12 lg:p-20 shadow-[0_40px_80px_-20px_rgba(255,58,58,0.4)] group"
        >
          {/* Decorative Background for Banner */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M0,500 C200,400 300,600 500,500 C700,400 800,600 1000,500"
                stroke="white" fill="transparent" strokeWidth="1" strokeDasharray="10 10"
              />
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                d="M0,600 C200,500 300,700 500,600 C700,500 800,700 1000,600"
                stroke="white" fill="transparent" strokeWidth="1" strokeDasharray="5 5"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Connect. <br />
              Don't Just Look.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/80 text-lg lg:text-xl font-medium mb-10 leading-relaxed"
            >
              Join millions of fashion lovers! Experience limitless style at your fingertips with India's first AI-powered styling engine. Let's Get Started!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => window.location.href = 'https://lookbook-psus.onrender.com'}
                className="bg-white text-[#FF3A3A] px-10 py-5 rounded-3xl font-black text-sm flex items-center gap-3 hover:scale-105 transition-all shadow-xl hover:bg-gray-50 border-none cursor-pointer relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">TRY RACAN AI <ArrowUpRight className="w-5 h-5" /></span>
                <div className="absolute inset-0 bg-black/5 transform scale-x-0 origin-left hover:scale-x-100 transition-transform duration-300"></div>
              </button>

              <div className="flex items-center gap-4 bg-black/10 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/20 hover:bg-black/20 transition-colors">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#FF5F3A] overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-white font-bold text-xs uppercase tracking-widest">Join the Club</span>
              </div>
            </motion.div>
          </div>

          {/* Floating Glassmorphism Items */}
          <div className="absolute top-1/2 right-20 -translate-y-1/2 hidden lg:block">
            <div className="relative perspective-1000">
              <motion.div
                animate={{ y: [0, -20, 0], rotateY: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/30 flex items-center justify-center text-white shadow-2xl absolute -top-32 -left-20"
              >
                <Bot className="w-10 h-10" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-14 h-14 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 flex items-center justify-center text-white shadow-2xl absolute -bottom-10 right-20"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <div className="w-24 h-24 rounded-full bg-blue-500/20 backdrop-blur-3xl absolute top-0 left-0 blur-xl"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Content Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20 mt-10"
      >

        {/* Navigation Column */}
        <motion.div variants={itemVariants}>
          <h3 className="text-white/40 font-black text-xs uppercase tracking-[0.2em] mb-8">Navigation</h3>
          <div className="flex flex-col gap-4">
            {['Home', 'Features', 'Products', 'About Us'].map((item) => (
              <ModernLink
                key={item}
                href={item === 'About Us' ? 'https://racan-ai.vercel.app/about' : `#${item.toLowerCase()}`}
              >
                {item}
              </ModernLink>
            ))}
          </div>
        </motion.div>

        {/* Ecosystem Column */}
        <motion.div variants={itemVariants}>
          <h3 className="text-white/40 font-black text-xs uppercase tracking-[0.2em] mb-8">Ecosystem</h3>
          <div className="flex flex-col gap-4">
            <ModernLink href="#">Style Blog</ModernLink>
            <ModernLink href="https://cal.com/racacn-ai/30min">Brand Partnership</ModernLink>
            <ModernLink href="#">Privacy Policy</ModernLink>
            <ModernLink href="#">Terms of Service</ModernLink>
          </div>
        </motion.div>

        {/* Contact Column */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <h3 className="text-white/40 font-black text-xs uppercase tracking-[0.2em] mb-8">Get in Touch</h3>
          <div className="flex flex-col gap-6">
            <a href="mailto:racan8@zohomail.in" className="flex items-center gap-4 group no-underline">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FF3A3A] group-hover:text-black hover:scale-110 transition-all duration-300 shadow-lg">
                <Mail className="w-5 h-5 text-white/40 group-hover:text-black transition-colors" />
              </div>
              <span className="text-lg font-bold text-white transition-colors group-hover:text-[#FF3A3A]">racan8@zohomail.in</span>
            </a>
            <p className="text-white/30 text-sm leading-relaxed font-medium">
              Racan Vadodara, Parul University, Gujarat, India. <br />
              Building the future of fashion tech.
            </p>
          </div>
        </motion.div>

        {/* Featured Card Column */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <motion.div
            whileHover={{ y: -5, boxShadow: "0 20px 40px -20px rgba(255, 58, 58, 0.2)" }}
            className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm relative group overflow-hidden transition-colors cursor-default"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-1/4 -translate-y-1/4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
              <Bot className="w-16 h-16 text-[#FF3A3A]" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center p-2 border border-white/10 shadow-inner">
                <img src="https://i.postimg.cc/rsYBTFzm/image-41.png" alt="logo" className="w-full brightness-0 invert" />
              </div>
              <div>
                <h5 className="font-bold text-sm text-white">Racan AI</h5>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">@racanaiapp</p>
              </div>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-medium mb-0">
              We've just announced a new feature that will help you increase your style precision using Racan! Check it out.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Copyright Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-[1400px] mx-auto px-6 mt-10 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8"
      >
        <div className="flex items-center gap-4 text-white/40 no-underline">
          <img src="https://i.postimg.cc/rsYBTFzm/image-41.png" alt="Logo" className="w-10 brightness-0 invert opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
          <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em] m-0">
            &copy; {new Date().getFullYear()} RACAN AI. ALL RIGHTS RESERVED.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: Instagram, url: "https://www.instagram.com/racan.ai?utm_source=ig_web_button_share_sheet&igsh=MXR2czM5N2JoYnJlbg==" },
            { icon: Twitter, url: "#" },
            { icon: Linkedin, url: "https://cal.com/racacn-ai/meeting" }
          ].map((social, idx) => (
            <MagneticSocial key={idx} href={social.url}>
              <social.icon size={16} strokeWidth={2.5} />
            </MagneticSocial>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
