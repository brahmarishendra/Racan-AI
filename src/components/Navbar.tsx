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
        /* Custom cursor styles */
        * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M2 2l7.5 18.5L12 14l6.5 2.5L2 2z'/%3E%3C/svg%3E") 8 8, auto;
        }

        a, button, [role="button"] {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23FF2D6B' d='M8 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1z'/%3E%3Cpath fill='%23FF2D6B' d='M2 2l7.5 18.5L12 14l6.5 2.5L2 2z'/%3E%3C/svg%3E") 8 8, pointer;
        }

        .hamburger-menu {
          width: 18px;
          height: 18px;
          position: relative;
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23FF2D6B' d='M8 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1z'/%3E%3Cpath fill='%23FF2D6B' d='M2 2l7.5 18.5L12 14l6.5 2.5L2 2z'/%3E%3C/svg%3E") 8 8, pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .hamburger-line {
          width: 18px;
          height: 2px;
          background-color: #000;
          border-radius: 1px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-origin: center;
          position: absolute;
        }

        .hamburger-line:nth-child(1) {
          top: 4px;
        }

        .hamburger-line:nth-child(2) {
          top: 8px;
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

        /* Menu overlay animation */
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
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

        .menu-item {
          font-size: 2.5rem;
          font-weight: 300;
          color: white;
          text-decoration: none;
          margin: 1rem 0;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
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

        .menu-item:hover {
          color: #ff3366;
          transform: translateX(10px);
        }

        .menu-item::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff3366, #973cff);
          transition: width 0.3s ease;
        }

        .menu-item:hover::before {
          width: 100%;
        }

        .user-section {
          margin-top: 2rem;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .menu-overlay.open .user-section {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.5s;
        }

        .try-racan-btn {
          background: linear-gradient(135deg, #ff3366, #973cff);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          display: inline-block;
          margin-top: 1rem;
          opacity: 0;
          transform: translateY(30px);
        }

        .menu-overlay.open .try-racan-btn {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.6s;
        }

        .try-racan-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 51, 102, 0.3);
        }

        @media (max-width: 768px) {
          .menu-item {
            font-size: 2rem;
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
            <a
              href="#products"
              className="text-gray-700 hover:text-[#973cff] transition-colors duration-300"
            >
              Products
            </a>
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

          {/* Animated Hamburger Menu Button - Smaller for mobile/tablet */}
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

      {/* Animated Mobile Menu Overlay */}
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
                  <p className="text-lg font-medium text-white">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-sm text-gray-300">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
          ) : (
            <a 
              href="/login"
              className="try-racan-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              Try Racan
            </a>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;