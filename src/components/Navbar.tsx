import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
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

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-[80] relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-white transition-all duration-500 ease-in-out transform ${
          isMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible pointer-events-none translate-y-[-100%]'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Top navbar area */}
        <div className="flex justify-between items-center px-6 py-4 shadow-sm">
          <img
            src="https://i.postimg.cc/rsYBTFzm/image-41.png"
            alt="Racan Logo"
            className="w-24"
          />
          {/* Empty div to match the exact button dimensions and positioning */}
          <div className="p-2 w-10 h-10"></div>
        </div>

        {/* Menu content */}
        <nav
          className="flex-1 flex flex-col items-center justify-center space-y-8 font-mono mt-32"
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href="#features"
            className="text-xl hover:text-[#973cff] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#products"
            className="text-xl hover:text-[#973cff] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </a>
          <button
            onClick={() => handleNavigation('/about')}
            className="text-xl hover:text-[#973cff] transition-colors duration-300"
          >
            About Us
          </button>

          {loading ? (
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
          ) : user ? (
            <div className="flex flex-col items-center space-y-4 mt-8">
              <div className="flex items-center space-x-3">
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
              className="mt-8 bg-black text-white px-6 py-3 rounded-full hover:bg-[#d70153] transition-all duration-300"
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