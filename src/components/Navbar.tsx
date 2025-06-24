import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const handleNavigation = (path) => {
    // Replace with your navigation logic
    console.log(`Navigate to: ${path}`);
    // For React Router: navigate(path);
    // For basic navigation: window.location.href = path;
    window.location.href = path; // Actual navigation
    setIsMenuOpen(false);
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
            className="w-24"
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
            <a
              href="#about"
              className="text-gray-700 hover:text-[#973cff] transition-colors duration-300"
            >
              About us
            </a>
            <button
              onClick={() => handleNavigation('/Login')}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-[#d70153] transition-all duration-300"
            >
              Try Racan
            </button>
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
          <a 
            href="#about"
            className="text-xl hover:text-[#973cff] transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About us
          </a>

          <button 
            onClick={() => handleNavigation('/Login')}
            className="mt-8 bg-black text-white px-6 py-3 rounded-full hover:bg-[#d70153] transition-all duration-300"
          >
            Try Racan
          </button>
        </nav>
      </div> 
    </> 
  );
};

export default Navbar;