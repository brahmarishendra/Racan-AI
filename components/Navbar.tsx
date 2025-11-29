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
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

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
    if (url === 'https://lookbook-psus.onrender.com') {
      // For mobile products dropdown, use the same auth logic
      if (user) {
        window.location.href = url;
      } 

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

        /* Smaller menu items without animations */
        .menu-item {
          font-size: 1.25rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          margin: 0.3rem 0;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          background: transparent;
          border: none;
          min-width: 150px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        /* Mobile Products Dropdown Styles */
        .mobile-products-dropdown {
          width: 100%;
          background: rgba(249, 250, 251, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          margin: 0.3rem 0;
          padding: 0;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: translateY(-10px);
        }

        .mobile-products-dropdown.open {
          max-height: 250px;
          opacity: 1;
          transform: translateY(0);
          padding: 0.75rem;
        }

        .mobile-dropdown-item {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          margin: 0.3rem 0;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 8px;
          text-decoration: none;
          color: #374151;
          transition: all 0.3s ease;
          border: 1px solid rgba(229, 231, 235, 0.5);
          transform: translateX(-20px);
          opacity: 0;
        }

        .mobile-products-dropdown.open .mobile-dropdown-item {
          transform: translateX(0);
          opacity: 1;
        }

        .mobile-products-dropdown.open .mobile-dropdown-item:nth-child(1) {
          transition-delay: 0.1s;
        }

        .mobile-products-dropdown.open .mobile-dropdown-item:nth-child(2) {
          transition-delay: 0.2s;
        }

        .mobile-dropdown-item-icon {
          margin-right: 10px;
          flex-shrink: 0;
        }

        .mobile-dropdown-item-content h3 {
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 3px 0;
          color: #111827;
        }

        .mobile-dropdown-item-content p {
          font-size: 0.8rem;
          margin: 0;
          color: #6b7280;
          line-height: 1.3;
        }

        .user-section {
          margin-top: 1.5rem;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          padding: 1.25rem;
          border-radius: 16px;
          background: rgba(249, 250, 251, 0.8);
          backdrop-filter: blur(10px);
        }

        /* Desktop-style Try Racan button for mobile */
        .mobile-try-racan-btn {
          background: #000000;
          color: white;
          padding: 0.65rem 1.75rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: inline-block;
          margin-top: 1.25rem;
          border: none;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        /* Responsive font sizes */
        @media (max-width: 768px) {
          .menu-item {
            font-size: 1.125rem;
            padding: 0.65rem 1.25rem;
            min-width: 140px;
          }
          
          .mobile-try-racan-btn {
            font-size: 0.95rem;
            padding: 0.6rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .menu-item {
            font-size: 1rem;
            padding: 0.6rem 1rem;
            min-width: 130px;
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
            
            {/* Products Dropdown - WITH ARROW for Desktop */}
            <div 
              className="products-dropdown-container"
              onMouseEnter={handleDesktopProductsHover}
              onMouseLeave={handleDesktopProductsLeave}
            >
              <button
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
                <button
                  onClick={handleTryRacanClick}
                  className="dropdown-item w-full text-left"
                >
                  <div className="dropdown-item-icon">
                    <Bot className="w-5 h-5 text-[#973cff]" />
                  </div>
                  <div className="dropdown-item-content">
                    <h3>Racan AI Chat Bot</h3>
                    <p>AI-powered fashion assistant for personalized styling</p>
                  </div>
                </button>
                
                <a
                  href="https://dreamxworld.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dropdown-item"
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
                onClick={handleTryRacanClick}
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
      <div className={`menu-overlay md:hidden mobile-menu-container ${isMenuOpen ? 'open' : ''}`}>
        <nav className="flex flex-col items-center">
          <a
            href="#features"
            className="menu-item"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          
          {/* Mobile Products Dropdown WITHOUT Arrow */}
          <div className="w-full flex flex-col items-center">
            <button
              onClick={handleMobileProductsToggle}
              className="menu-item"
            >
              Products
            </button>
            
            <div className={`mobile-products-dropdown ${isMobileProductsOpen ? 'open' : ''}`}>
              <button
                onClick={() => handleMobileProductClick('https://chat-with-racan.vercel.app')}
                className="mobile-dropdown-item"
              >
                <div className="mobile-dropdown-item-icon">
                  <Bot className="w-5 h-5 text-[#973cff]" />
                </div>
                <div className="mobile-dropdown-item-content">
                  <h3>Racan AI Chat Bot</h3>
                  <p>AI-powered fashion assistant for personalized styling</p>
                </div>
              </button>
              
              <button
                onClick={() => handleMobileProductClick('https://dreamxworld.com/')}
                className="mobile-dropdown-item"
              >
                <div className="mobile-dropdown-item-icon">
                  <img
                    src="https://i.postimg.cc/15mjf5Cn/Instagram-post-1.png"
                    alt="DreamX"
                    className="w-5 h-5 rounded-sm object-cover"
                  />
                </div>
                <div className="mobile-dropdown-item-content">
                  <h3>DreamX Ecommerce</h3>
                  <p>Premium fashion marketplace with curated collections</p>
                </div>
              </button>
            </div>
          </div>

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
              onClick={handleTryRacanClick}
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
