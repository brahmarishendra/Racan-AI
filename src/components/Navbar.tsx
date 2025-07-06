import React, { useState, useEffect } from 'react';
import { LogOut, User, ChevronDown, Bot, ShoppingBag } from 'lucide-react';
import { getCurrentUser, signOut, onAuthStateChange } from '../lib/supabase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

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
        /* Custom glass cursor styles */
        * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='none' stroke='%23000' stroke-width='1' opacity='0.3'/%3E%3Cpath fill='%23000' d='M2 2l7.5 18.5L12 14l6.5 2.5L2 2z' opacity='0.7'/%3E%3C/svg%3E") 8 8, auto;
        }

        a, button, [role="button"] {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='none' stroke='%23FF2D6B' stroke-width='1' opacity='0.4'/%3E%3Cpath fill='%23FF2D6B' d='M2 2l7.5 18.5L12 14l6.5 2.5L2 2z' opacity='0.8'/%3E%3C/svg%3E") 8 8, pointer;
        }

        .hamburger-menu {
          width: 16px;
          height: 16px;
          position: relative;
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='none' stroke='%23FF2D6B' stroke-width='1' opacity='0.4'/%3E%3Cpath fill='%23FF2D6B' d='M2 2l7.5 18.5L12 14l6.5 2.5L2 2z' opacity='0.8'/%3E%3C/svg%3E") 8 8, pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .hamburger-line {
          width: 16px;
          height: 1.5px;
          background-color: #000;
          border-radius: 1px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-origin: center;
          position: absolute;
        }

        .hamburger-line:nth-child(1) {
          top: 3px;
        }

        .hamburger-line:nth-child(2) {
          top: 7px;
        }

        .hamburger-line:nth-child(3) {
          top: 11px;
        }

        /* Animated states */
        .hamburger-menu.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(2px, 2px);
        }

        .hamburger-menu.open .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: scale(0);
        }

        .hamburger-menu.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(2px, -2px);
        }

        /* Glass blur menu overlay */
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 60;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: scale(0.95);
        }

        .menu-overlay.open {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
        }

        /* Modern smooth zoom-in text animations */
        .menu-item {
          font-size: 1.75rem;
          font-weight: 600;
          color: #374151;
          text-decoration: none;
          margin: 0.75rem 0;
          padding: 1.25rem 2.5rem;
          border-radius: 16px;
          opacity: 0;
          transform: translateY(50px) scale(0.7);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          min-width: 250px;
          text-align: center;
          letter-spacing: 0.5px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .menu-overlay.open .menu-item {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Staggered smooth zoom-in animations */
        .menu-overlay.open .menu-item:nth-child(1) {
          animation: smoothZoomIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both;
        }

        .menu-overlay.open .menu-item:nth-child(2) {
          animation: smoothZoomIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
        }

        .menu-overlay.open .menu-item:nth-child(3) {
          animation: smoothZoomIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
        }

        .menu-overlay.open .menu-item:nth-child(4) {
          animation: smoothZoomIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
        }

        /* Glass hover effects */
        .menu-item:hover {
          background: rgba(243, 244, 246, 0.6);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          color: #973cff;
          transform: translateY(-8px) scale(1.05);
          box-shadow: 
            0 20px 40px rgba(151, 60, 255, 0.15),
            0 0 0 1px rgba(151, 60, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(151, 60, 255, 0.2);
        }

        /* Animated gradient underline */
        .menu-item::before {
          content: '';
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff3366, #973cff, #00d4aa);
          background-size: 200% 100%;
          border-radius: 2px;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation: gradientShift 3s ease-in-out infinite;
        }

        .menu-item:hover::before {
          width: 70%;
        }

        /* Text glow and shadow effects */
        .menu-item:hover {
          text-shadow: 
            0 0 10px rgba(151, 60, 255, 0.3),
            0 0 20px rgba(151, 60, 255, 0.2),
            0 0 30px rgba(151, 60, 255, 0.1);
        }

        /* Glass ripple effect */
        .menu-item::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(151, 60, 255, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .menu-item:hover::after {
          width: 300px;
          height: 300px;
        }

        /* Products dropdown styles */
        .products-dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 1rem;
          min-width: 280px;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(-10px) scale(0.95);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 100;
          margin-top: 0.5rem;
        }

        .dropdown-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0) scale(1);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          text-decoration: none;
          color: #374151;
          transition: all 0.3s ease;
          margin-bottom: 0.5rem;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .dropdown-item:hover {
          background: rgba(151, 60, 255, 0.1);
          color: #973cff;
          transform: translateX(5px);
          border: 1px solid rgba(151, 60, 255, 0.2);
        }

        .dropdown-item:last-child {
          margin-bottom: 0;
        }

        .dropdown-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .user-section {
          margin-top: 2rem;
          text-align: center;
          opacity: 0;
          transform: translateY(30px) scale(0.8);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          padding: 1.5rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .menu-overlay.open .user-section {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition-delay: 0.5s;
          animation: glassSlideUp 0.8s ease-out 0.5s both;
        }

        /* Desktop-style Try Racan button with glass effect */
        .mobile-try-racan-btn {
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: white;
          padding: 0.875rem 2.25rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.125rem;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: inline-block;
          margin-top: 1.5rem;
          opacity: 0;
          transform: translateY(30px) scale(0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .menu-overlay.open .mobile-try-racan-btn {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition-delay: 0.6s;
          animation: glassZoomIn 0.8s ease-out 0.6s both;
        }

        .mobile-try-racan-btn:hover {
          background: rgba(215, 1, 83, 0.9);
          transform: translateY(-4px) scale(1.05);
          box-shadow: 
            0 12px 40px rgba(215, 1, 83, 0.3),
            0 0 0 1px rgba(215, 1, 83, 0.2);
          border: 1px solid rgba(215, 1, 83, 0.3);
        }

        /* Glass shimmer effect */
        .mobile-try-racan-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }

        .mobile-try-racan-btn:hover::before {
          left: 100%;
        }

        /* Keyframe animations */
        @keyframes smoothZoomIn {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.7) rotateX(20deg);
          }
          60% {
            opacity: 0.8;
            transform: translateY(-5px) scale(1.02) rotateX(-2deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
          }
        }

        @keyframes glassSlideUp {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.8);
            backdrop-filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            backdrop-filter: blur(15px);
          }
        }

        @keyframes glassZoomIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.6);
            backdrop-filter: blur(5px);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-5px) scale(1.05);
            backdrop-filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            backdrop-filter: blur(10px);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(151, 60, 255, 0.3);
          }
          50% {
            text-shadow: 
              0 0 15px rgba(151, 60, 255, 0.6),
              0 0 25px rgba(151, 60, 255, 0.4),
              0 0 35px rgba(151, 60, 255, 0.2);
          }
        }

        .menu-item:hover {
          animation: textGlow 2s ease-in-out infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .menu-item {
            font-size: 1.5rem;
            padding: 1rem 2rem;
            min-width: 220px;
          }
          
          .mobile-try-racan-btn {
            font-size: 1rem;
            padding: 0.75rem 2rem;
          }
        }

        @media (max-width: 480px) {
          .menu-item {
            font-size: 1.375rem;
            padding: 0.875rem 1.75rem;
            min-width: 200px;
          }
          
          .mobile-try-racan-btn {
            font-size: 0.95rem;
            padding: 0.625rem 1.75rem;
          }
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-[70] bg-white shadow-sm transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <img
            src="https://i.postimg.cc/rsYBTFzm/image-41.png"
            alt="Racan Logo"
            className="w-24"
            onClick={() => handleNavigation('/')}
          />

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-[#973cff] transition-colors duration-300"
            >
              Features
            </a>
            
            {/* Products Dropdown */}
            <div 
              className="products-dropdown"
              onMouseEnter={() => setShowProductsDropdown(true)}
              onMouseLeave={() => setShowProductsDropdown(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-[#973cff] transition-colors duration-300">
                Products
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showProductsDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`dropdown-menu ${showProductsDropdown ? 'show' : ''}`}>
                <a 
                  href="https://chat-with-racan.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="dropdown-item"
                >
                  <Bot className="dropdown-icon text-[#973cff]" />
                  <div>
                    <div className="font-medium">Racan AI ChatBot</div>
                    <div className="text-xs text-gray-500">AI Fashion Assistant</div>
                  </div>
                </a>
                
                <a 
                  href="https://dreamxworld.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="dropdown-item"
                >
                  <img 
                    src="https://i.postimg.cc/15mjf5Cn/Instagram-post-1.png" 
                    alt="DreamX" 
                    className="dropdown-icon rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">DreamX Ecommerce</div>
                    <div className="text-xs text-gray-500">Fashion Store</div>
                  </div>
                </a>
              </div>
            </div>
            
            <button
              onClick={() => handleNavigation('/about')}
              className="text-gray-700 hover:text-[#973cff] transition-colors duration-300"
            >
              About Us
            </button>
            
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#004AAD] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 max-w-24 truncate">
                    {getUserDisplayName()}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-300"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-[#d70153] transition-all duration-300"
              >
                Try Racan
              </button>
            )}
          </nav>

          {/* Smaller Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-[80] relative p-3 hover:bg-gray-100 rounded-full transition-colors duration-300"
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

      {/* Glass Blur Mobile Menu Overlay */}
      <div className={`menu-overlay md:hidden ${isMenuOpen ? 'open' : ''}`}>
        <nav className="flex flex-col items-center">
          <a
            href="#features"
            className="menu-item"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#products"
            className="menu-item"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </a>
          <button
            onClick={() => handleNavigation('/about')}
            className="menu-item"
          >
            About Us
          </button>

          {loading ? (
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mt-8"></div>
          ) : user ? (
            <div className="user-section">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#004AAD] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-900">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => handleNavigation('/login')}
              className="mobile-try-racan-btn"
            >
              Try Racan
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;