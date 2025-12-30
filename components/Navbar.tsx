import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, ChevronDown, Bot, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { getCurrentUser, signOut, onAuthStateChange } from '../src/lib/supabase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const platformTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);
  const partnersTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handlePlatformEnter = () => {
    if (platformTimeoutRef.current) {
      clearTimeout(platformTimeoutRef.current);
    }
    setIsPlatformOpen(true);
  };

  const handlePlatformLeave = () => {
    platformTimeoutRef.current = setTimeout(() => {
      setIsPlatformOpen(false);
    }, 200);
  };

  const handlePartnersEnter = () => {
    if (partnersTimeoutRef.current) {
      clearTimeout(partnersTimeoutRef.current);
    }
    setIsPartnersOpen(true);
  };

  const handlePartnersLeave = () => {
    partnersTimeoutRef.current = setTimeout(() => {
      setIsPartnersOpen(false);
    }, 200);
  };

  const mobileMenuContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { y: 20, opacity: 0, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Check auth state on mount and listen for changes
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { user } = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close dropdown when clicking outside (Desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.products-dropdown-container')) {
        setIsProductsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when clicking outside or on menu items
  useEffect(() => {
    if (isMenuOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.mobile-menu-container') && !target.closest('.hamburger-menu')) {
          setIsMenuOpen(false);
          setIsMobileProductsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  const handleNavigation = (path: string) => {
    window.location.href = path;
    setIsMenuOpen(false);
    setIsMobileProductsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split('@')[0] ||
      'User';
  };

  const handleMobileProductsToggle = () => {
    setIsMobileProductsOpen(!isMobileProductsOpen);
  };

  const handleMobileProductClick = (url: string) => {
    window.location.href = url;
    setIsMenuOpen(false);
  };

  // Desktop hover handlers
  const handleDesktopProductsHover = () => {
    setIsProductsDropdownOpen(true);
  };

  const handleDesktopProductsLeave = () => {
    setIsProductsDropdownOpen(false);
  };

  const handleTryRacanClick = () => {
    // If authenticated, go directly to chat
    window.location.href = 'https://lookbook-psus.onrender.com/';
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${lastScrollY > 20 ? 'bg-black/90 backdrop-blur-md py-4 border-white/10 shadow-lg' : 'bg-transparent py-4 lg:py-7 border-transparent'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          {/* Logo Section */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            <div className="bg-black p-3 rounded-[1.4rem] flex items-center justify-center mr-4 hover:scale-105 transition-transform shadow-xl border border-white/10">
              <img
                src="https://i.postimg.cc/rsYBTFzm/image-41.png"
                alt="Racan Logo"
                className="w-16 brightness-0 invert"
              />
            </div>
          </div>

          {/* Desktop Navigation - Centered Pill Design */}
          {/* Desktop Navigation - Standard Open Layout */}
          <nav className="hidden lg:flex items-center gap-10">
            <div
              className="relative h-full flex items-center group/platform"
              onMouseEnter={handlePlatformEnter}
              onMouseLeave={handlePlatformLeave}
            >
              <button
                className={`flex items-center gap-1.5 text-base font-medium transition-colors border-none bg-transparent cursor-pointer relative py-2 ${isPlatformOpen ? 'text-[#D4FF00]' : 'text-white hover:text-[#D4FF00]'}`}
              >
                Platform <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isPlatformOpen ? 'rotate-180 text-[#D4FF00]' : ''}`} />
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#D4FF00] transform transition-transform duration-300 origin-left ${isPlatformOpen ? 'scale-x-100' : 'scale-x-0 group-hover/platform:scale-x-100'}`}></span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            </div>

            <div
              className="relative h-full flex items-center group/partners"
              onMouseEnter={handlePartnersEnter}
              onMouseLeave={handlePartnersLeave}
            >
              <button
                className={`flex items-center gap-1.5 text-base font-medium transition-colors border-none bg-transparent cursor-pointer relative py-2 ${isPartnersOpen ? 'text-[#D4FF00]' : 'text-white hover:text-[#D4FF00]'}`}
              >
                Partners <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isPartnersOpen ? 'rotate-180 text-[#D4FF00]' : ''}`} />
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#D4FF00] transform transition-transform duration-300 origin-left ${isPartnersOpen ? 'scale-x-100' : 'scale-x-0 group-hover/partners:scale-x-100'}`}></span>
              </button>
            </div>

            {['Features', 'Products', 'Company'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-base font-medium transition-colors no-underline text-white hover:text-[#D4FF00] relative py-2 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </nav>

          {/* User Section - Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-white">EN</span>
            </div>

            {loading ? (
              <div className="w-11 h-11 rounded-full bg-white/20 animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-full p-1 leading-none">
                <div className="w-9 h-9 rounded-full bg-[#D4FF00] flex items-center justify-center text-black shadow-sm">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col mr-3">
                  <span className="text-[10px] font-black tracking-widest uppercase text-white/60 mb-0.5">Account</span>
                  <span className="text-sm font-bold text-white max-w-[80px] truncate">{getUserDisplayName()}</span>
                </div>
                <button onClick={handleSignOut} className="w-9 h-9 rounded-full flex items-center justify-center text-red-400 hover:bg-white/10 transition-all border-none bg-transparent cursor-pointer">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="group flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white pl-5 pr-1.5 py-1.5 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 border-none cursor-pointer"
              >
                <span className="font-bold text-sm tracking-wide">Try Racan AI</span>
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5 text-blue-600" />
                </div>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-[#D4FF00] transition-colors cursor-pointer group hamburger-menu"
          >
            <div className={`w-7 h-5 flex flex-col justify-between transition-all duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>
              <span className={`w-full h-0.5 rounded-full transition-all bg-white group-hover:bg-black ${isMenuOpen ? '!bg-black' : ''} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 rounded-full transition-all bg-white group-hover:bg-black ${isMenuOpen ? '!bg-black' : ''} ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 rounded-full transition-all bg-white group-hover:bg-black ${isMenuOpen ? '!bg-black' : ''} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Platform Mega Menu */}
        {/* Platform Mega Menu */}
        <AnimatePresence>
          {isPlatformOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl overflow-hidden"
              onMouseEnter={handlePlatformEnter}
              onMouseLeave={handlePlatformLeave}
            >
              <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-4 gap-12">
                {/* Column 1: Core Platform */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-[#D4FF00]"></span> Core Platform
                  </h3>
                  <div className="flex flex-col gap-4">
                    <a href="#" className="group flex items-start gap-3 no-underline">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#D4FF00] group-hover:text-black transition-colors text-white">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-white font-medium group-hover:text-[#D4FF00] transition-colors text-sm">AI Agents</span>
                        <span className="block text-white/40 text-xs mt-1 leading-relaxed">Autonomous agents that execute complex workflows.</span>
                      </div>
                    </a>
                    <a href="#" className="group flex items-start gap-3 no-underline">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#D4FF00] group-hover:text-black transition-colors text-white">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-white font-medium group-hover:text-[#D4FF00] transition-colors text-sm">Commerce Engine</span>
                        <span className="block text-white/40 text-xs mt-1 leading-relaxed">Next-gen headless commerce infrastructure.</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Column 2: Solutions */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-[#D4FF00]"></span> Solutions
                  </h3>
                  <ul className="flex flex-col gap-3 list-none p-0 m-0">
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm no-underline flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#D4FF00]"></span> Enterprise Search</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm no-underline flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#D4FF00]"></span> Customer Support</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm no-underline flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#D4FF00]"></span> Data Analytics</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm no-underline flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#D4FF00]"></span> Workflow Automation</a></li>
                  </ul>
                </div>

                {/* Column 3: Resources */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-[#D4FF00]"></span> Developers
                  </h3>
                  <ul className="flex flex-col gap-3 list-none p-0 m-0">
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm no-underline">Documentation</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm no-underline">API Reference</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm no-underline">Community Forum</a></li>
                    <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm no-underline">Status Page</a></li>
                  </ul>
                </div>

                {/* Column 4: Featured */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <span className="text-[#D4FF00] text-xs font-black tracking-widest uppercase mb-3 block">New Release</span>
                  <h4 className="text-white text-xl font-bold mb-2">Racan V2.0 is Live</h4>
                  <p className="text-white/50 text-xs leading-relaxed mb-4">
                    Experience the next evolution of AI-driven commerce with improved agentic workflows.
                  </p>
                  <button
                    onClick={() => handleNavigation('#about')}
                    className="w-full py-2 bg-white text-black font-bold text-xs rounded-lg hover:bg-[#D4FF00] transition-colors border-none cursor-pointer"
                  >
                    Explore V2.0
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Partners Mega Menu */}
        {/* Partners Mega Menu */}
        <AnimatePresence>
          {isPartnersOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl overflow-hidden"
              onMouseEnter={handlePartnersEnter}
              onMouseLeave={handlePartnersLeave}
            >
              <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-4 gap-12">
                {/* Column 1: Strategic Partners */}
                <div className="flex flex-col gap-6 col-span-2">
                  <h3 className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-[#D4FF00]"></span> Strategic Partners
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <a href="https://dreamxworld.com/" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors no-underline border border-white/5 hover:border-white/20">
                      <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center p-2 overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                        <img src="https://i.postimg.cc/sx24cHZb/image-89.png" alt="DreamX" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <span className="text-white font-bold text-base block group-hover:text-[#D4FF00] mb-1 transition-colors">Dream X</span>
                        <span className="text-white/40 text-xs leading-relaxed block">Pioneering the future of sim racing ecosystem.</span>
                      </div>
                    </a>
                  </div>
                </div>
                {/* Spacer columns to fill full width */}
                <div className="col-span-2"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


      </header >



      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {
          isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-[90] lg:hidden mobile-menu-container"
            >
              <motion.div
                variants={mobileMenuContainerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="p-8 pt-32 flex flex-col gap-6 max-w-lg mx-auto"
              >
                <motion.button
                  variants={mobileMenuItemVariants}
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className="text-4xl font-black text-gray-900 border-none bg-transparent text-left p-0 flex items-center justify-between bg-white w-full cursor-pointer group"
                >
                  <span className="relative">
                    Platform
                    <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#D4FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                  <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <motion.div variants={mobileMenuItemVariants} className={`overflow-hidden transition-all duration-300 flex flex-col gap-4 pl-6 border-l-4 border-gray-100 ${isMobileProductsOpen ? 'max-h-[500px] mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2 mt-2">Core Platform</h4>
                  <button onClick={() => handleNavigation('#ai-agents')} className="text-xl font-bold text-gray-600 border-none bg-transparent text-left p-0 hover:text-black hover:translate-x-2 transition-all flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-black">
                      <Bot className="w-4 h-4" />
                    </div>
                    AI Agents
                  </button>
                  <button onClick={() => handleNavigation('#commerce')} className="text-xl font-bold text-gray-600 border-none bg-transparent text-left p-0 hover:text-black hover:translate-x-2 transition-all flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-black">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    Commerce Engine
                  </button>

                  <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2 mt-4">Our Partners</h4>
                  <a href="https://dreamxworld.com/" target="_blank" className="text-xl font-bold text-gray-600 border-none bg-transparent text-left p-0 hover:text-black hover:translate-x-2 transition-all flex items-center gap-3 no-underline">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-black border border-gray-200 overflow-hidden">
                      <img src="https://i.postimg.cc/sx24cHZb/image-89.png" alt="DreamX" className="w-full h-full object-contain p-1" />
                    </div>
                    Dream X
                  </a>
                </motion.div>

                <motion.a variants={mobileMenuItemVariants} href="#features" onClick={(e) => { e.preventDefault(); handleNavigation('#features'); }} className="text-4xl font-black text-gray-900 no-underline relative w-fit group">
                  Features
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#D4FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </motion.a>
                <motion.a variants={mobileMenuItemVariants} href="#products" onClick={(e) => { e.preventDefault(); handleNavigation('#products'); }} className="text-4xl font-black text-gray-900 no-underline relative w-fit group">
                  Products
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#D4FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </motion.a>
                <motion.a variants={mobileMenuItemVariants} href="about.tsx" onClick={(e) => { e.preventDefault(); handleNavigation('#about'); }} className="text-4xl font-black text-gray-900 no-underline relative w-fit group">
                  Company
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#D4FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </motion.a>

                <motion.div variants={mobileMenuItemVariants} className="mt-8 pt-8 border-t border-gray-100">
                  <button
                    onClick={() => handleNavigation('/login')}
                    className="w-full flex items-center justify-between bg-blue-500 text-white p-2 rounded-full shadow-xl border-none active:scale-95 transition-transform"
                  >
                    <span className="font-bold text-lg ml-6">Try Racan AI</span>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-6 h-6 text-blue-600" />
                    </div>
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
};

export default Navbar;
