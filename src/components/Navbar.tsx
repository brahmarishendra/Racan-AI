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
        .hamburger-menu {
          width: 24px;
          height: 24px;
          position: relative;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .hamburger-line {
          width: 24px;
          height: 2px;
          background-color: #000;
          border-radius: 2px;
          transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform-origin: center;
          position: absolute;
        }

        .hamburger-line:nth-child(1) {
          top: 6px;
          transition-delay: 0s;
        }

        .hamburger-line:nth-child(2) {
          top: 11px;
          transition-delay: 0.1s;
        }

        .hamburger-line:nth-child(3) {
          top: 16px;
          transition-delay: 0.2s;
        }

        /* Enhanced morphing animation states */
        .hamburger-menu.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(3.5px, 3.5px) scale(1.1);
          transition-delay: 0.2s;
        }

        .hamburger-menu.open .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: scale(0) rotate(180deg);
          transition-delay: 0s;
        }

        .hamburger-menu.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(3.5px, -3.5px) scale(1.1);
          transition-delay: 0.1s;
        }

        /* Menu overlay with enhanced morphing animation */
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
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform: scale(0.8) rotate(-5deg);
          backdrop-filter: blur(0px);
        }

        .menu-overlay.open {
          opacity: 1;
          visibility: visible;
          transform: scale(1) rotate(0deg);
          backdrop-filter: blur(10px);
        }

        /* Enhanced menu items with fluid morphing */
        .menu-item {
          font-size: 2.5rem;
          font-weight: 300;
          color: white;
          text-decoration: none;
          margin: 1rem 0;
          opacity: 0;
          transform: translateY(50px) rotateX(-90deg);
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: relative;
          overflow: hidden;
          perspective: 1000px;
        }

        .menu-overlay.open .menu-item {
          opacity: 1;
          transform: translateY(0) rotateX(0deg);
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

        /* Enhanced hover effects with morphing */
        .menu-item:hover {
          color: #ff3366;
          transform: translateX(20px) scale(1.05) rotateY(5deg);
          text-shadow: 0 0 20px rgba(255, 51, 102, 0.5);
        }

        .menu-item::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff3366, #973cff);
          transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          border-radius: 2px;
        }

        .menu-item:hover::before {
          width: 100%;
          box-shadow: 0 0 10px rgba(255, 51, 102, 0.8);
        }

        /* Enhanced user section with morphing */
        .user-section {
          margin-top: 2rem;
          text-align: center;
          opacity: 0;
          transform: translateY(50px) scale(0.8);
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .menu-overlay.open .user-section {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition-delay: 0.5s;
        }

        /* Enhanced Try Racan button with morphing */
        .try-racan-btn {
          background: linear-gradient(135deg, #ff3366, #973cff);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          display: inline-block;
          margin-top: 1rem;
          opacity: 0;
          transform: translateY(50px) scale(0.8) rotateZ(-10deg);
          box-shadow: 0 10px 30px rgba(255, 51, 102, 0.3);
        }

        .menu-overlay.open .try-racan-btn {
          opacity: 1;
          transform: translateY(0) scale(1) rotateZ(0deg);
          transition-delay: 0.6s;
        }

        .try-racan-btn:hover {
          transform: translateY(-5px) scale(1.1) rotateZ(2deg);
          box-shadow: 0 20px 40px rgba(255, 51, 102, 0.5);
          background: linear-gradient(135deg, #ff3366, #973cff, #ff3366);
          background-size: 200% 200%;
          animation: gradientShift 2s ease infinite;
        }

        /* Additional morphing effects */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Floating particles effect */
        .menu-overlay::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 80%, rgba(255, 51, 102, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(151, 60, 255, 0.1) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 1s ease;
          pointer-events: none;
        }

        .menu-overlay.open::before {
          opacity: 1;
        }

        /* Enhanced close button morphing */
        .hamburger-menu:hover .hamburger-line {
          background-color: #ff3366;
          box-shadow: 0 0 5px rgba(255, 51, 102, 0.3);
        }

        /* Desktop Navigation Hover Effects */
        .nav-item {
          position: relative;
          padding: 8px 20px;
          border-radius: 30px;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          overflow: hidden;
          cursor: pointer;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          top: -50px;
          right: -50px;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(156, 163, 175, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          transform: scale(0);
          transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          pointer-events: none;
        }

        .nav-item:hover::before {
          transform: scale(1.5);
          animation: bubbleFloat 2s ease-in-out infinite;
        }

        .nav-item:hover {
          background-color: rgba(156, 163, 175, 0.2);
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(156, 163, 175, 0.3);
        }

        .nav-item::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .nav-item:hover::after {
          transform: translateX(100%);
        }

        @keyframes bubbleFloat {
          0%, 100% {
            transform: scale(1.5) translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.8) translateY(-10px);
            opacity: 0.6;
          }
        }

        /* Additional bubble effects */
        .nav-item:hover {
          position: relative;
        }

        .nav-item:hover::before {
          animation: bubbleFloat 2s ease-in-out infinite, bubblePulse 1.5s ease-in-out infinite;
        }

        @keyframes bubblePulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }

        /* Multiple bubble effect */
        .nav-item::after {
          content: '';
          position: absolute;
          top: -30px;
          right: -30px;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(156, 163, 175, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          transform: scale(0);
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          pointer-events: none;
        }

        .nav-item:hover::after {
          transform: scale(1.2);
          animation: bubbleFloat2 2.5s ease-in-out infinite;
        }

        @keyframes bubbleFloat2 {
          0%, 100% {
            transform: scale(1.2) translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          33% {
            transform: scale(1.5) translateY(-8px) translateX(-5px);
            opacity: 0.5;
          }
          66% {
            transform: scale(1.3) translateY(-15px) translateX(5px);
            opacity: 0.4;
          }
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
            className="w-24 cursor-pointer"
            onClick={() => handleNavigation('/')}
          />

          <nav className="hidden md:flex items-center space-x-4">
            <a
              href="#features"
              className="nav-item text-gray-700 hover:text-[#973cff] transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#products"
              className="nav-item text-gray-700 hover:text-[#973cff] transition-colors duration-300"
            >
              Products
            </a>
            <button
              onClick={() => handleNavigation('/about')}
              className="nav-item text-gray-700 hover:text-[#973cff] transition-colors duration-300"
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

          {/* Enhanced Animated Hamburger Menu Button */}
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

      {/* Enhanced Animated Mobile Menu Overlay */}
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