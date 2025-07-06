import React, { useState, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import { getCurrentUser, signOut, onAuthStateChange } from '../lib/supabase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const handleNavigation = (path: string) => {
    window.location.href = path;
    setIsMenuOpen(false);
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

  return (
    <>
      <style jsx>{`
        /* Custom Pixel Cursor - Exact match to your image */
        * {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="0" y="0" width="2" height="2" fill="black"/><rect x="2" y="0" width="2" height="2" fill="black"/><rect x="4" y="0" width="2" height="2" fill="black"/><rect x="6" y="0" width="2" height="2" fill="black"/><rect x="8" y="0" width="2" height="2" fill="black"/><rect x="10" y="0" width="2" height="2" fill="black"/><rect x="0" y="2" width="2" height="2" fill="black"/><rect x="2" y="2" width="2" height="2" fill="white"/><rect x="4" y="2" width="2" height="2" fill="white"/><rect x="6" y="2" width="2" height="2" fill="white"/><rect x="8" y="2" width="2" height="2" fill="white"/><rect x="10" y="2" width="2" height="2" fill="black"/><rect x="0" y="4" width="2" height="2" fill="black"/><rect x="2" y="4" width="2" height="2" fill="white"/><rect x="4" y="4" width="2" height="2" fill="white"/><rect x="6" y="4" width="2" height="2" fill="white"/><rect x="8" y="4" width="2" height="2" fill="white"/><rect x="10" y="4" width="2" height="2" fill="black"/><rect x="0" y="6" width="2" height="2" fill="black"/><rect x="2" y="6" width="2" height="2" fill="white"/><rect x="4" y="6" width="2" height="2" fill="white"/><rect x="6" y="6" width="2" height="2" fill="white"/><rect x="8" y="6" width="2" height="2" fill="white"/><rect x="10" y="6" width="2" height="2" fill="black"/><rect x="0" y="8" width="2" height="2" fill="black"/><rect x="2" y="8" width="2" height="2" fill="white"/><rect x="4" y="8" width="2" height="2" fill="white"/><rect x="6" y="8" width="2" height="2" fill="white"/><rect x="8" y="8" width="2" height="2" fill="white"/><rect x="10" y="8" width="2" height="2" fill="black"/><rect x="0" y="10" width="2" height="2" fill="black"/><rect x="2" y="10" width="2" height="2" fill="white"/><rect x="4" y="10" width="2" height="2" fill="white"/><rect x="6" y="10" width="2" height="2" fill="white"/><rect x="8" y="10" width="2" height="2" fill="white"/><rect x="10" y="10" width="2" height="2" fill="black"/><rect x="0" y="12" width="2" height="2" fill="black"/><rect x="2" y="12" width="2" height="2" fill="white"/><rect x="4" y="12" width="2" height="2" fill="white"/><rect x="6" y="12" width="2" height="2" fill="white"/><rect x="8" y="12" width="2" height="2" fill="white"/><rect x="10" y="12" width="2" height="2" fill="black"/><rect x="0" y="14" width="2" height="2" fill="black"/><rect x="2" y="14" width="2" height="2" fill="white"/><rect x="4" y="14" width="2" height="2" fill="white"/><rect x="6" y="14" width="2" height="2" fill="white"/><rect x="8" y="14" width="2" height="2" fill="white"/><rect x="10" y="14" width="2" height="2" fill="black"/><rect x="0" y="16" width="2" height="2" fill="black"/><rect x="2" y="16" width="2" height="2" fill="white"/><rect x="4" y="16" width="2" height="2" fill="white"/><rect x="6" y="16" width="2" height="2" fill="white"/><rect x="8" y="16" width="2" height="2" fill="white"/><rect x="10" y="16" width="2" height="2" fill="black"/><rect x="0" y="18" width="2" height="2" fill="black"/><rect x="2" y="18" width="2" height="2" fill="white"/><rect x="4" y="18" width="2" height="2" fill="white"/><rect x="6" y="18" width="2" height="2" fill="white"/><rect x="8" y="18" width="2" height="2" fill="white"/><rect x="10" y="18" width="2" height="2" fill="black"/><rect x="0" y="20" width="2" height="2" fill="black"/><rect x="2" y="20" width="2" height="2" fill="white"/><rect x="4" y="20" width="2" height="2" fill="white"/><rect x="6" y="20" width="2" height="2" fill="white"/><rect x="8" y="20" width="2" height="2" fill="white"/><rect x="10" y="20" width="2" height="2" fill="black"/><rect x="0" y="22" width="2" height="2" fill="black"/><rect x="2" y="22" width="2" height="2" fill="black"/><rect x="4" y="22" width="2" height="2" fill="black"/><rect x="6" y="22" width="2" height="2" fill="black"/><rect x="8" y="22" width="2" height="2" fill="black"/><rect x="10" y="22" width="2" height="2" fill="black"/><rect x="2" y="24" width="2" height="2" fill="black"/><rect x="4" y="24" width="2" height="2" fill="white"/><rect x="6" y="24" width="2" height="2" fill="black"/><rect x="4" y="26" width="2" height="2" fill="black"/></svg>') 12 12, auto;
        }

        /* Small Hamburger Menu - 16px */
        .hamburger-menu {
          width: 16px;
          height: 16px;
          position: relative;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .hamburger-line {
          width: 16px;
          height: 1.5px;
          background-color: #333;
          border-radius: 1px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-origin: center;
          position: absolute;
        }

        .hamburger-line:nth-child(1) {
          top: 3px;
        }

        .hamburger-line:nth-child(2) {
          top: 7.5px;
        }

        .hamburger-line:nth-child(3) {
          top: 12px;
        }

        /* Animated states */
        .hamburger-menu.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(2.5px, 2.5px);
        }

        .hamburger-menu.open .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: scale(0);
        }

        .hamburger-menu.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(2.5px, -2.5px);
        }

        /* White Background Menu Overlay */
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 60;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: scale(0.95);
        }

        .menu-overlay.open {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
        }

        /* Small Font Menu Items */
        .menu-item {
          font-size: 1.4rem;
          font-weight: 400;
          color: #333;
          text-decoration: none;
          margin: 0.6rem 0;
          padding: 0.4rem 1.2rem;
          border-radius: 8px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .menu-overlay.open .menu-item {
          opacity: 1;
          transform: translateY(0);
        }

        .menu-overlay.open .menu-item:nth-child(1) {
          transition-delay: 0.1s;
        }

        .menu-overlay.open .menu-item:nth-child(2) {
          transition-delay: 0.2s;
        }

        .menu-overlay.open .menu-item:nth-child(3) {
          transition-delay: 0.3s;
        }

        .menu-overlay.open .menu-item:nth-child(4) {
          transition-delay: 0.4s;
        }

        /* Light Gray Hover Effects */
        .menu-item:hover {
          background: #f5f5f5;
          color: #ff3366;
          transform: translateX(8px) scale(1.02);
        }

        /* Text Wave Animation */
        .menu-item::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff3366, #973cff);
          transition: width 0.3s ease;
        }

        .menu-item:hover::before {
          width: 100%;
        }

        /* Character Animation */
        .menu-item span {
          display: inline-block;
          transition: all 0.2s ease;
        }

        .menu-item:hover span {
          animation: textWave 0.5s ease-in-out;
        }

        .menu-item:hover span:nth-child(1) { animation-delay: 0s; }
        .menu-item:hover span:nth-child(2) { animation-delay: 0.05s; }
        .menu-item:hover span:nth-child(3) { animation-delay: 0.1s; }
        .menu-item:hover span:nth-child(4) { animation-delay: 0.15s; }
        .menu-item:hover span:nth-child(5) { animation-delay: 0.2s; }
        .menu-item:hover span:nth-child(6) { animation-delay: 0.25s; }
        .menu-item:hover span:nth-child(7) { animation-delay: 0.3s; }
        .menu-item:hover span:nth-child(8) { animation-delay: 0.35s; }

        @keyframes textWave {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.1); }
        }

        /* User Section */
        .user-section {
          margin-top: 1.5rem;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          padding: 0.8rem;
          border-radius: 10px;
          background: #f9f9f9;
        }

        .menu-overlay.open .user-section {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.5s;
        }

        /* Try Racan Button */
        .try-racan-btn {
          background: linear-gradient(135deg, #ff3366, #973cff);
          color: white;
          padding: 0.7rem 1.5rem;
          border-radius: 20px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          display: inline-block;
          margin-top: 0.8rem;
          opacity: 0;
          transform: translateY(30px);
          border: none;
          cursor: pointer;
        }

        .menu-overlay.open .try-racan-btn {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.6s;
        }

        .try-racan-btn:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(255, 51, 102, 0.3);
          background: linear-gradient(135deg, #e6245e, #8a35e6);
        }

        /* Desktop Navigation - Small Fonts */
        .nav-link {
          position: relative;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          transition: all 0.3s ease;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .nav-link:hover {
          background: #f5f5f5;
          transform: translateY(-1px);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: #973cff;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: 80%;
        }

        /* Desktop Try Button - Small */
        .desktop-try-btn {
          font-size: 0.75rem;
          padding: 0.4rem 1rem;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .desktop-try-btn:hover {
          background: #d70153 !important;
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 4px 12px rgba(215, 1, 83, 0.3);
        }

        @media (max-width: 768px) {
          .menu-item {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-[70] bg-white shadow-sm transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <img
            src="https://i.postimg.cc/rsYBTFzm/image-41.png"
            alt="Racan Logo"
            className="w-18 cursor-pointer"
            onClick={() => handleNavigation('/')}
          />

          <nav className="hidden md:flex items-center space-x-4">
            <a
              href="#features"
              className="nav-link text-gray-700 hover:text-[#973cff] transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#products"
              className="nav-link text-gray-700 hover:text-[#973cff] transition-colors duration-300"
            >
              Products
            </a>
            <button
              onClick={() => handleNavigation('/about')}
              className="nav-link text-gray-700 hover:text-[#973cff] transition-colors duration-300"
            >
              About Us
            </button>
            
            {loading ? (
              <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-[#004AAD] rounded-full flex items-center justify-center">
                    <User className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-xs text-gray-700 max-w-16 truncate">
                    {getUserDisplayName()}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-300"
                  title="Sign out"
                >
                  <LogOut className="w-2.5 h-2.5" />
                  <span className="text-xs">Sign out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="desktop-try-btn bg-black text-white rounded-full hover:bg-[#d70153] transition-all duration-300"
              >
                Try Racan
              </button>
            )}
          </nav>

          {/* Small Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-[80] relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </div>
          </button>
        </div>
      </header>

      {/* White Background Mobile Menu */}
      <div className={`menu-overlay md:hidden ${isMenuOpen ? 'open' : ''}`}>
        <nav className="flex flex-col items-center">
          <a
            href="#features"
            className="menu-item"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>F</span><span>e</span><span>a</span><span>t</span><span>u</span><span>r</span><span>e</span><span>s</span>
          </a>
          <a
            href="#products"
            className="menu-item"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>P</span><span>r</span><span>o</span><span>d</span><span>u</span><span>c</span><span>t</span><span>s</span>
          </a>
          <button
            onClick={() => handleNavigation('/about')}
            className="menu-item"
          >
            <span>A</span><span>b</span><span>o</span><span>u</span><span>t</span> <span>U</span><span>s</span>
          </button>

          {loading ? (
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mt-4"></div>
          ) : user ? (
            <div className="user-section">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-[#004AAD] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-800">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors duration-300"
              >
                <LogOut className="w-3 h-3" />
                <span className="text-xs">Sign out</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => handleNavigation('/login')}
              className="try-racan-btn"
            >
              <span>T</span><span>r</span><span>y</span> <span>R</span><span>a</span><span>c</span><span>a</span><span>n</span>
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;