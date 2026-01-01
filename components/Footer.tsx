import React, { useRef, useState } from 'react';
import { Instagram, Twitter, Linkedin, Mail, ArrowUpRight, Youtube } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Reveal animation: clip-path expands from top to bottom
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const footerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Parallax effects for different columns
  const leftY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const centerY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const rightY = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [-10, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white pt-24 pb-12 relative overflow-hidden"
    >
      <motion.div
        style={{ clipPath, opacity: footerOpacity }}
        className="max-w-[1400px] mx-auto px-6"
      >
        {/* Top Section: Info, Navigation, CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20"
        >
          {/* Logo & Info Column */}
          <motion.div
            style={{ y: leftY }}
            variants={itemVariants}
            className="md:col-span-4 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  style={{ rotate: logoRotate, scale: logoScale }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-2 border border-white/20"
                >
                  <img src="https://i.postimg.cc/rsYBTFzm/image-41.png" alt="logo" className="w-full brightness-0 invert" />
                </motion.div>
                <h3 className="text-xl font-bold tracking-tight uppercase">RACAN AI</h3>
              </div>
              <p className="text-white/50 text-xs leading-relaxed max-w-xs font-bold uppercase tracking-[0.2em]">
                Racan Hyderabad, Telangana, India. <br />
                Building the future of fashion tech.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <p className="text-white/40 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Mail className="w-3 h-3" /> Get In Touch
              </p>
              <a href="mailto:racan8@zohomail.in" className="text-lg font-bold hover:text-[#D4FF00] transition-colors no-underline text-white">
                racan8@zohomail.in
              </a>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                {[
                  { icon: Instagram, url: "https://www.instagram.com/racan.ai?utm_source=ig_web_button_share_sheet&igsh=MXR2czM5N2JoYnJlbg==" },
                  { icon: Twitter, url: "#" },
                  { icon: Linkedin, url: "https://cal.com/racacn-ai/meeting" },
                  { icon: Youtube, url: "#" },
                  {
                    icon: (props: any) => (
                      <svg {...props} viewBox="0 0 541 541" fill="currentColor" stroke="none">
                        <path d="M119.5 99.4C180.5 145.4 250 240.8 270.5 281C291 240.8 360.5 145.4 421.5 99.4C465.1 66.6 525.6 56.6 525.6 122.1C525.6 137.9 516.4 249.9 511.2 271C493 345.2 406.8 360.9 333.6 348.6C418.1 362.4 507.7 391.8 461.4 485.4C430.5 548 350.5 450.3 303.4 391.4C286.7 370.5 272.9 353.4 270.5 350C268.1 353.4 254.3 370.5 237.6 391.4C190.5 450.3 110.5 548 79.6 485.4C33.3 391.8 122.9 362.4 207.4 348.6C134.2 360.9 48 345.2 29.8 271C24.6 249.9 15.4 137.9 15.4 122.1C15.4 56.6 75.9 66.6 119.5 99.4Z" />
                      </svg>
                    ),
                    url: "#"
                  },
                  {
                    icon: (props: any) => (
                      <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.04.282.063.568.063.856 0 2.454-2.826 4.451-6.301 4.451-3.475 0-6.301-1.997-6.301-4.451 0-.288.023-.574.063-.856A1.751 1.751 0 0 1 5.415 12c0-.968.786-1.754 1.754-1.754.463 0 .891.181 1.201.484 1.169-.843 2.802-1.397 4.604-1.472l.806-3.722-2.535.541a1.249 1.249 0 0 1-2.511-.053 1.25 1.25 0 0 1 2.511-.053l2.671-.571c.051-.01.1-.011.15-.004l2.686.565a1.243 1.243 0 0 1 .305-.125zM12 15.542c-2.406 0-4.363-.483-4.363-1.077 0-.594 1.957-1.077 4.363-1.077 2.406 0 4.363.483 4.363 1.077 0 .594-1.957 1.077-4.363 1.077z" />
                      </svg>
                    ),
                    url: "#"
                  }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    whileHover={{ scale: 1.2, color: "#D4FF00", rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/40 transition-colors"
                  >
                    {typeof social.icon === 'function' ? <social.icon className="w-[18px] h-[18px]" /> : <social.icon size={18} strokeWidth={2} />}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Featured Card Integrated */}
            <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 max-w-xs group hover:border-white/20 transition-all cursor-default">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center p-1.5 border border-white/10 shadow-inner">
                  <img src="https://i.postimg.cc/rsYBTFzm/image-41.png" alt="logo" className="w-full brightness-0 invert" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-white uppercase m-0">Racan AI</h5>
                  <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest m-0">@racanaiapp</p>
                </div>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed font-medium m-0">
                We've just announced a new feature that will help you increase your style precision using Racan AI! Check it out.
              </p>
            </div>
          </motion.div>

          {/* Navigation Grid */}
          <motion.div
            style={{ y: centerY }}
            variants={itemVariants}
            className="md:col-span-4 grid grid-cols-2 gap-8 border-y md:border-y-0 md:border-x border-white/10 py-12 md:py-0 md:px-12"
          >
            <div className="flex flex-col gap-6">
              <h4 className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Navigation</h4>
              {['Home', 'Features', 'Products', 'About Us'].map((item) => (
                <motion.a
                  key={item}
                  href={item === 'About Us' ? '/about' : `#${item.toLowerCase()}`}
                  whileHover={{ x: 10, color: "#D4FF00" }}
                  className="text-white/60 text-sm font-bold uppercase tracking-widest no-underline transition-all flex items-center gap-2 group"
                >
                  {item}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-[#D4FF00]" />
                </motion.a>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Ecosystem</h4>
              <a href="#" className="text-white/60 hover:text-white text-sm font-bold uppercase tracking-widest no-underline transition-all">Style Blog</a>
              <a href="https://cal.com/racacn-ai/30min" className="text-white/60 hover:text-white text-sm font-bold uppercase tracking-widest no-underline transition-all">Partnerships</a>
              <a href="#" className="text-white/60 hover:text-white text-sm font-bold uppercase tracking-widest no-underline transition-all">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white text-sm font-bold uppercase tracking-widest no-underline transition-all">Terms</a>
            </div>
          </motion.div>

          {/* CTA Column */}
          <motion.div
            style={{ y: rightY }}
            variants={itemVariants}
            className="md:col-span-4 flex flex-col justify-between items-start md:items-end text-left md:text-right"
          >
            <div className="max-w-xs">
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-6 uppercase tracking-tighter">
                Connect. <br />
                Don't Just Look.
              </h2>
              <p className="text-white/50 text-sm mb-10 font-medium leading-relaxed">
                Join millions of fashion lovers! Experience limitless style at your fingertips with India's first AI-powered styling engine. Let's Get Started!
              </p>
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#D4FF00",
                color: "#000",
                boxShadow: "0 0 20px rgba(212, 255, 0, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: ["0 0 0px rgba(212, 255, 0, 0)", "0 0 15px rgba(212, 255, 0, 0.2)", "0 0 0px rgba(212, 255, 0, 0)"]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              onClick={() => window.location.href = 'https://lookbook-psus.onrender.com'}
              className="bg-white text-black px-10 py-5 font-black text-xs tracking-[0.2em] uppercase transition-all border-none cursor-pointer shadow-2xl"
            >
              TRY RACAN AI
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer Bottom: Copyright & Large Text */}
        <div className="pt-4 border-t border-white/10 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
              &copy; {new Date().getFullYear()} RACAN AI &copy;
            </p>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
              Partnered with Dreamx World
            </p>
          </div>

          <div
            className="overflow-hidden py-4 -mb-8 cursor-pointer relative group"
            // normal with hover
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.h1
              whileTap={{ scale: 0.98 }}
              className="text-[12vw] md:text-[18vw] font-black   text-center whitespace-nowrap select-none transition-all duration-700"
              style={{
                fontFamily: 'Inter, sans-serif',
                backgroundImage: `url('https://i.pinimg.com/originals/60/ee/2c/60ee2c40db75cc99419e2eced7d3ae91.gif')`,
                // bg image size need small 
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: isHovered ? 'white' : 'transparent',
              }}
            >
              RACAN AI
            </motion.h1>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
