import React, { useState, useEffect } from 'react';
import { LogOut, User, ChevronDown, Bot, ShoppingBag } from 'lucide-react';
import { getCurrentUser, signOut, onAuthStateChange } from '../lib/supabase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

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

  // Close dropdown when clicking outside
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
        /* Custom cursor styles */
        * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M2 2l7.5 18.5L12 14l6.5 2.5L2 2z'/%3E%3C/svg%3E") 8 8, auto;
        }

        a, button, [role="button"] {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23FF2D6B' d='M8 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1z'/%3E%3Cpath fill='%23FF2D6B' d='M2 2l7.5 18.5L12 14l6.5 2.5L2 2z'/%3E%3C/svg%3E") 8 8, pointer;
        }

        .hamburger-menu {
          width: 16px;
          height: 16px;
          position: relative;
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23FF2D6B' d='M8 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1z'/%3E%3Cpath fill='%23FF2D6B' d='M2 2l7.5 18.5L12 14l6.5 2.5L2 2z'/%3E%3C/svg%3E") 8 8, pointer;
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

        /* Products Dropdown Styles */
        .products-dropdown-container {
          position: relative;
        }

        .products-dropdown {
          margin-top: 20px;
          margin-left: 0px;
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 1px;
          min-width: 300px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.2s ease-out;
          z-index: 50;
          box-shadow: none;
        }

        .products-dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          text-decoration: none;
          color: #374151;
          transition: background-color 0.2s ease;
          border-bottom: 1px solid #f3f4f6;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background-color: #f9fafb;
        }

        .dropdown-item-icon {
          margin-right: 12px;
          flex-shrink: 0;
        }

        .dropdown-item-content h3 {
          font-size: 14px;
          font-weight: 500;
          margin: 0 0 2px 0;
          color: #111827;
        }

        .dropdown-item-content p {
          font-size: 12px;
          margin: 0;
          color: #6b7280;
          line-height: 1.4;
        }

        /* Menu overlay animation - WHITE BACKGROUND with menubar bg */
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('https://i.pinimg.com/736x/35/b0/95/35b0954232776284469e69abde5817ff.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
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

        .menu-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.9);
          z-index: -1;
        }

        .menu-overlay.open {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
        }

        /* Enhanced menu items with gray hover background */
        .menu-item {
          font-size: 1.5rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          margin: 0.5rem 0;
          padding: 1rem 2rem;
          border-radius: 12px;
          opacity: 0;
          transform: translateY(30px) scale(0.9);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          background: transparent;
          border: none;
          min-width: 200px;
          text-align: center;
        }

        .menu-overlay.open .menu-item {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .menu-overlay.open .menu-item:nth-child(1) {
          transition-delay: 0.1s;
          animation: slideInBounce 0.6s ease-out 0.1s both;
        }

        .menu-overlay.open .menu-item:nth-child(2) {
          transition-delay: 0.2s;
          animation: slideInBounce 0.6s ease-out 0.2s both;
        }

        .menu-overlay.open .menu-item:nth-child(3) {
          transition-delay: 0.3s;
          animation: slideInBounce 0.6s ease-out 0.3s both;
        }

        .menu-overlay.open .menu-item:nth-child(4) {
          transition-delay: 0.4s;
          animation: slideInBounce 0.6s ease-out 0.4s both;
        }

        /* Gray hover background with smooth animations */
        .menu-item:hover {
          background: #f3f4f6;
          color: #973cff;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        /* Animated underline effect */
        .menu-item::before {
          content: '';
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff3366, #973cff);
          border-radius: 2px;
          transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .menu-item:hover::before {
          width: 60%;
        }

        /* Text glow effect on hover */
        .menu-item:hover {
          text-shadow: 0 0 8px rgba(151, 60, 255, 0.3);
        }

        /* Ripple effect */
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
          transition: all 0.3s ease;
        }

        .menu-item:hover::after {
          width: 300px;
          height: 300px;
        }

        .user-section {
          margin-top: 2rem;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          padding: 1.5rem;
          border-radius: 16px;
          background: rgba(249, 250, 251, 0.8);
          backdrop-filter: blur(10px);
        }

        .menu-overlay.open .user-section {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.5s;
          animation: fadeInScale 0.6s ease-out 0.5s both;
        }

        /* Desktop-style Try Racan button for mobile with enhanced hover */
        .mobile-try-racan-btn {
          background: #000000;
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.125rem;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: inline-block;
          margin-top: 1.5rem;
          opacity: 0;
          transform: translateY(30px) scale(0.9);
          border: none;
          position: relative;
          overflow: hidden;
        }

        .menu-overlay.open .mobile-try-racan-btn {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition-delay: 0.6s;
          animation: bounceIn 0.8s ease-out 0.6s both;
        }

        .mobile-try-racan-btn:hover {
          background: #d70153;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 25px rgba(215, 1, 83, 0.3);
        }

        /* Shimmer effect for Try Racan button */
        .mobile-try-racan-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .mobile-try-racan-btn:hover::before {
          left: 100%;
        }

        /* Keyframe animations */
        @keyframes slideInBounce {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.3);
          }
          50% {
            opacity: 1;
            transform: translateY(-10px) scale(1.1);
          }
          70% {
            transform: translateY(5px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(151, 60, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 15px rgba(151, 60, 255, 0.6);
          }
        }

        .menu-item:hover {
          animation: textGlow 1.5s ease-in-out infinite;
        }

        /* Responsive font sizes */
        @media (max-width: 768px) {
          .menu-item {
            font-size: 1.375rem;
          }
          
          .mobile-try-racan-btn {
            font-size: 1rem;
            padding: 0.625rem 1.75rem;
          }
        }

        @media (max-width: 480px) {
          .menu-item {
            font-size: 1.25rem;
            padding: 0.875rem 1.5rem;
            min-width: 180px;
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
            <div className="products-dropdown-container">
              <button
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-[#973cff] transition-colors duration-300"
              >
                Products
                <ChevronDown 
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    isProductsDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <div className={`products-dropdown ${isProductsDropdownOpen ? 'open' : ''}`}>
                <a
                  href="https://chat-with-racan.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dropdown-item"
                  onClick={() => setIsProductsDropdownOpen(false)}
                >
                  <div className="dropdown-item-icon">
                    <Bot className="w-5 h-5 text-[#973cff]" />
                  </div>
                  <div className="dropdown-item-content">
                    <h3>Racan AI Chat Bot</h3>
                    <p>AI-powered fashion assistant for personalized styling</p>
                  </div>
                </a>
                
                <a
                  href="https://dreamxworld.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dropdown-item"
                  onClick={() => setIsProductsDropdownOpen(false)}
                >
                  <div className="dropdown-item-icon">
                    <img
                      src="https://i.postimg.cc/15mjf5Cn/Instagram-post-1.png"
                      alt="DreamX"
                      className="w-5 h-5 rounded-sm object-cover"
                    />
                  </div>
                  <div className="dropdown-item-content">
                    <h3>DreamX Ecommerce</h3>
                    <p>Premium fashion marketplace with curated collections</p>
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

      {/* Enhanced Mobile Menu Overlay with Background Image */}
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