import React, { useState, useEffect } from 'react';
import { LogOut, User, ChevronDown, Bot, ArrowUpRight } from 'lucide-react';
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
    if (url === 'https://chat-with-racan.vercel.app') {
      // For mobile products dropdown, use the same auth logic
      if (user) {
        window.location.href = url;
      } else {
        window.location.href = '/login';
      }
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setIsMenuOpen(false);
    setIsMobileProductsOpen(false);
  };

  // Desktop hover handlers
  const handleDesktopProductsHover = () => {
    setIsProductsDropdownOpen(true);
  };

  const handleDesktopProductsLeave = () => {
    setIsProductsDropdownOpen(false);
  };

  const handleTryRacanClick = () => {
    // Check if user is authenticated
    if (user) {
      // If authenticated, go directly to chat
      window.location.href = 'https://chat-with-racan.vercel.app';
    } else {
      // If not authenticated, show auth pages first
      window.location.href = '/login';
    }
  };

  return (
    <>
      <style jsx>{`
        /* Portal Gaming Style Navbar */
        .portal-navbar {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          animation: navbarFloat 6s ease-in-out infinite;
        }

        @keyframes navbarFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }

        @keyframes navItemGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(103, 126, 234, 0); }
          50% { box-shadow: 0 0 20px rgba(103, 126, 234, 0.3); }
        }

        @keyframes glassShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Navigation Container - Portal Gaming Style */
        .nav-container {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 4px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }

        .nav-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: -200%;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: glassShimmer 3s infinite;
        }

        .nav-container:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          transform: translateY(-1px);
        }

        .portal-nav-item {
          position: relative;
          padding: 8px 16px;
          border-radius: 25px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          color: #374151;
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
          cursor: pointer;
          border: none;
          background: transparent;
          z-index: 2;
        }

        .portal-nav-item:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #1e293b;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          animation: navItemGlow 2s ease-in-out infinite;
        }

        .portal-nav-item.active {
          background: rgba(255, 255, 255, 0.2);
          color: #1e293b;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Try Racan Button - Portal Gaming Style */
        .portal-cta-button {
          background: #000000;
          color: white;
          padding: 12px 28px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          z-index: 2;
        }

        .portal-cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .portal-cta-button:hover::before {
          left: 100%;
        }

        .portal-cta-button:hover {
          background: #333333;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .portal-cta-button:hover .arrow-icon {
          transform: translate(2px, -2px);
        }

        .arrow-icon {
          transition: transform 0.3s ease;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          padding: 3px;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Custom cursor styles */
        * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M2 2l7.5 18.5L12 14l6.5 2.5L2 2z'/%3E%3C/svg%3E") 8 8, auto;
        }

        a, button, [role="button"] {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23667eea' d='M8 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1z'/%3E%3Cpath fill='%23667eea' d='M2 2l7.5 18.5L12 14l6.5 2.5L2 2z'/%3E%3C/svg%3E") 8 8, pointer;
        }

        .hamburger-menu {
          width: 16px;
          height: 16px;
          position: relative;
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23667eea' d='M8 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1z'/%3E%3Cpath fill='%23667eea' d='M2 2l7.5 18.5L12 14l6.5 2.5L2 2z'/%3E%3C/svg%3E") 8 8, pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .hamburger-line {
          width: 16px;
          height: 1.5px;
          background-color: #374151;
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
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          min-width: 320px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 50;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .products-dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          text-decoration: none;
          color: #374151;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          transition: left 0.4s ease;
        }

        .dropdown-item:hover::before {
          left: 0;
        }

        .dropdown-item:hover {
          color: #374151;
          transform: translateX(4px);
        }

        .dropdown-item-icon {
          margin-right: 12px;
          flex-shrink: 0;
          z-index: 1;
          position: relative;
        }

        .dropdown-item-content {
          z-index: 1;
          position: relative;
        }

        .dropdown-item-content h3 {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #111827;
        }

        .dropdown-item-content p {
          font-size: 12px;
          margin: 0;
          color: #6b7280;
          line-height: 1.4;
        }

        /* Menu overlay animation - Portal Gaming Style */
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%);
          backdrop-filter: blur(20px);
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

        /* Portal Gaming Style menu items */
        .menu-item {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          text-decoration: none;
          margin: 0.4rem 0;
          padding: 1rem 2rem;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          background: transparent;
          border: none;
          min-width: 180px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .menu-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(103, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          transition: left 0.4s ease;
        }

        .menu-item:hover::before {
          left: 0;
        }

        .menu-item:hover {
          color: #667eea;
          transform: translateY(-2px);
        }

        /* Mobile Products Dropdown Styles */
        .mobile-products-dropdown {
          width: 100%;
          background: rgba(249, 250, 251, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          margin: 0.4rem 0;
          padding: 0;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: translateY(-10px);
        }

        .mobile-products-dropdown.open {
          max-height: 280px;
          opacity: 1;
          transform: translateY(0);
          padding: 1rem;
        }

        .mobile-dropdown-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          margin: 0.4rem 0;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          text-decoration: none;
          color: #374151;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
          transform: translateX(-20px);
          opacity: 0;
          position: relative;
          overflow: hidden;
        }

        .mobile-dropdown-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(103, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
          transition: left 0.4s ease;
        }

        .mobile-dropdown-item:hover::before {
          left: 0;
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
          margin-right: 12px;
          flex-shrink: 0;
          z-index: 1;
          position: relative;
        }

        .mobile-dropdown-item-content {
          z-index: 1;
          position: relative;
        }

        .mobile-dropdown-item-content h3 {
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #111827;
        }

        .mobile-dropdown-item-content p {
          font-size: 0.8rem;
          margin: 0;
          color: #6b7280;
          line-height: 1.3;
        }

        .user-section {
          margin-top: 2rem;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          padding: 1.5rem;
          border-radius: 20px;
          background: rgba(249, 250, 251, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        /* Portal Gaming Style Try Racan button for mobile */
        .mobile-try-racan-btn {
          background: #000000;
          color: white;
          padding: 1rem 2.4rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 1.5rem;
          border: none;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .mobile-try-racan-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .mobile-try-racan-btn:hover::before {
          left: 100%;
        }

        .mobile-try-racan-btn:hover {
          background: #333333;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .mobile-try-racan-btn:hover .arrow-icon {
          transform: translate(2px, -2px);
        }

        .mobile-try-racan-btn .arrow-icon {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          padding: 3px;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Responsive font sizes */
        @media (max-width: 768px) {
          .menu-item {
            font-size: 1.125rem;
            padding: 0.8rem 1.5rem;
            min-width: 160px;
          }
          
          .mobile-try-racan-btn {
            font-size: 1rem;
            padding: 0.8rem 1.9rem;
          }
        }

        @media (max-width: 480px) {
          .menu-item {
            font-size: 1rem;
            padding: 0.7rem 1.25rem;
            min-width: 150px;
          }
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-[70] portal-navbar transition-transform duration-300 ${
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

          {/* Desktop Navigation - Portal Gaming Style Container */}
          <div className="hidden md:flex items-center gap-6">
            <div className="nav-container">
              <a
                href="#features"
                className="portal-nav-item"
              >
                Features
              </a>
              
              {/* Products Dropdown */}
              <div 
                className="products-dropdown-container"
                onMouseEnter={handleDesktopProductsHover}
                onMouseLeave={handleDesktopProductsLeave}
              >
                <button
                  className="portal-nav-item flex items-center"
                >
                  Products
                </button>
                
                <div className={`products-dropdown ${isProductsDropdownOpen ? 'open' : ''}`}>
                  <button
                    onClick={handleTryRacanClick}
                    className="dropdown-item w-full text-left"
                  >
                    <div className="dropdown-item-icon">
                      <Bot className="w-5 h-5 text-[#667eea]" />
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
                className="portal-nav-item"
              >
                About Us
              </button>
            </div>

            {/* User Section or Try Racan Button */}
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#667eea] rounded-full flex items-center justify-center">
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
                className="portal-cta-button"
              >
                Try Racan
                <ArrowUpRight className="arrow-icon" />
              </button>
            )}
          </div>

          {/* Hamburger Menu Button */}
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

      {/* Enhanced Mobile Menu Overlay - Portal Gaming Style */}
      <div className={`menu-overlay md:hidden mobile-menu-container ${isMenuOpen ? 'open' : ''}`}>
        <nav className="flex flex-col items-center">
          <a
            href="#features"
            className="menu-item"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          
          {/* Mobile Products Dropdown */}
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
                  <Bot className="w-5 h-5 text-[#667eea]" />
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
                <div className="w-12 h-12 bg-[#667eea] rounded-full flex items-center justify-center">
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
              <ArrowUpRight className="arrow-icon" />
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;