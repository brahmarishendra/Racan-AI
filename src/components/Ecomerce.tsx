import { Menu, X, ShoppingCart, Instagram, Twitter, Facebook, Mail } from "lucide-react";
import React, { useState, useEffect } from "react";

export const RacanXVindof = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartItems, setCartItems] = useState<number[]>([]);

  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      title: "PRETENDING T-SHIRT",
      description: "The Pretending Tee Featuring a painted portrait with a zipper covering the eyes and the words \"so — when do we stop pretending,\"",
      image: "https://vindof.com/cdn/shop/articles/vindof-casualwear-redefined.jpg?v=1749536025&width=1000"
    },
    {
      id: 2,
      title: "ARTISTIC EXPRESSION",
      description: "Discover our collection of artistic t-shirts that blend creativity with comfort. Each piece tells a unique story.",
      image: "https://images.pexels.com/photos/8532609/pexels-photo-8532609.jpeg?auto=compress&cs=tinysrgb&w=1000"
    },
    {
      id: 3,
      title: "PREMIUM COLLECTION",
      description: "Elevate your style with our premium collection featuring high-quality materials and contemporary designs.",
      image: "https://images.pexels.com/photos/8532635/pexels-photo-8532635.jpeg?auto=compress&cs=tinysrgb&w=1000"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  // Navigation links data
  const navLinks = [
    { text: "Home", href: "#" },
    { text: "New", href: "#" },
    { text: "Catalog", href: "#" },
  ];

  // T-shirts data
  const tShirts = [
    {
      id: 1,
      name: "ART ADDICTS T-SHIRT",
      price: "Rs. 2,837.00",
      image: "https://vindof.com/cdn/shop/files/18-05-2025_VINDOF01066_copy.jpg?v=1747987027&width=1000",
    },
    {
      id: 2,
      name: "ART ADDICTS T-SHIRT",
      price: "Rs. 2,837.00",
      image: "https://vindof.com/cdn/shop/files/18-05-2025_VINDOF01006_copy_cfca951e-0018-48d6-bf72-9baddf7bcd0e.jpg?v=1750245434&width=1000",
    },
    {
      id: 3,
      name: "ART ADDICTS T-SHIRT",
      price: "Rs. 2,837.00",
      image: "https://vindof.com/cdn/shop/files/18-05-2025_VINDOF00912_copy_0d7896e4-c9b0-425f-9d52-35fc6e89f759.jpg?v=1750245563&width=1000",
    },
  ];

  // Premium shirts data
  const premiumShirts = [
    {
      id: 4,
      name: "ART ADDICTS SHIRT",
      price: "Rs. 2,837.00",
      image: "https://i.pinimg.com/736x/6e/07/09/6e07092bd7489a4ba0740f1b49622621.jpg",
    },
    {
      id: 5,
      name: "ART ADDICTS SHIRT",
      price: "Rs. 2,837.00",
      image: "https://i.pinimg.com/736x/2f/6b/69/2f6b6948709e0e27e4942e7ce1b3ab4a.jpg",
    },
    {
      id: 6,
      name: "ART ADDICTS SHIRT",
      price: "Rs. 2,837.00",
      image: "https://i.pinimg.com/736x/4f/d1/21/4fd121f25ac18fc8be0e6b6c2c2489b5.jpg",
    },
  ];

  // Add to cart functionality
  const addToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
    // You can add a toast notification here
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div className="bg-[#FF5722] w-full">
      <div className="bg-[#FF5722] overflow-hidden w-full max-w-[1536px] mx-auto relative">
        {/* Header */}
        <header className="w-full h-16 md:h-20 lg:h-[120px] relative bg-[#FF5722] flex items-center justify-between px-4 md:px-6 lg:px-[106px]">
          {/* Mobile Menu Button - Left Side */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden z-50 relative order-1"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>

          {/* Logo - Center on mobile, left on desktop */}
          <div className="flex items-center order-2 lg:order-1">
            <img
              className="h-6 md:h-7 lg:h-8 object-cover"
              alt="Racan Logo"
              src="https://i.postimg.cc/rsYBTFzm/image-41.png"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-16 order-2">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="font-['Outfit',sans-serif] font-normal text-black text-xl xl:text-2xl hover:text-gray-800 transition-colors"
              >
                {link.text}
              </a>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3 md:space-x-4 order-3">
            {/* Shopping Bag Icon */}
            <div className="relative w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-[43px] bg-black/10 rounded-full lg:rounded-[22px] flex items-center justify-center">
              <img
                src="https://img.icons8.com/?size=100&id=3686&format=png&color=000000"
                alt="Shopping Bag"
                className="w-4 h-4 md:w-5 md:h-5 lg:w-[21px] lg:h-[21px]"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>

            {/* Try Racan Button - Desktop Only */}
            <button className="hidden lg:block h-12 bg-black rounded-[26px] px-6 font-['Poppins',sans-serif] font-medium text-white text-xl hover:bg-gray-800 transition-colors">
              <a href="https://chat-with-racan.vercel.app" target="_blank" rel="noopener noreferrer" className="text-white no-underline">
                Try Racan
              </a>
            </button>

            {/* Profile Image - Desktop Only */}
            <img
              className="hidden lg:block w-[58px] h-14 object-cover rounded-full"
              alt="User Profile"
              src="https://i.pinimg.com/736x/94/e6/cc/94e6cc707a02f2ae57b722cf3dddb9af.jpg"
            />
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-[#FF5722] z-40 pt-20">
            <nav className="flex flex-col items-start px-6 space-y-6 pt-8">
              {/* Profile Section in Mobile Menu */}
              <div className="flex items-center space-x-4 pb-6 border-b border-black/20 w-full">
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  alt="User Profile"
                  src="https://i.pinimg.com/736x/94/e6/cc/94e6cc707a02f2ae57b722cf3dddb9af.jpg"
                />
                <div>
                  <p className="font-['Poppins',sans-serif] font-medium text-black text-lg">John Doe</p>
                  <p className="font-['Outfit',sans-serif] text-black/70 text-sm">john@example.com</p>
                </div>
              </div>

              {/* Navigation Links */}
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-['Outfit',sans-serif] font-normal text-black text-xl w-full py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </a>
              ))}

              {/* Additional Menu Items */}
              <a
                href="#"
                className="font-['Outfit',sans-serif] font-normal text-black text-xl w-full py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </a>
              <a
                href="#"
                className="font-['Outfit',sans-serif] font-normal text-black text-xl w-full py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </a>
              <a
                href="#"
                className="font-['Outfit',sans-serif] font-normal text-black text-xl w-full py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </a>

              {/* Try Racan Button */}
              <button className="mt-8 h-12 bg-black rounded-[26px] px-8 font-['Poppins',sans-serif] font-medium text-white text-xl w-full">
                <a href="https://chat-with-racan.vercel.app" target="_blank" rel="noopener noreferrer" className="text-white no-underline">
                  Try Racan
                </a>
              </button>
            </nav>
          </div>
        )}

        {/* Hero Section with Auto-sliding */}
        <section className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[742px] relative overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute left-4 md:left-8 lg:left-[29px] top-1/2 transform -translate-y-1/2 lg:top-[350px] lg:transform-none flex flex-col items-start space-y-3 md:space-y-6 lg:space-y-8 max-w-[calc(100%-2rem)] md:max-w-[495px]">
                <h1 className="font-['Poppins',sans-serif] font-normal text-white text-xl sm:text-2xl md:text-3xl lg:text-[40px] leading-tight">
                  {slide.title}
                </h1>
                <p className="font-['Outfit',sans-serif] font-normal text-white text-sm md:text-lg lg:text-xl max-w-[280px] sm:max-w-[350px] lg:max-w-[390px] leading-relaxed">
                  {slide.description}
                </p>
                <button className="w-32 sm:w-36 md:w-40 lg:w-44 h-10 sm:h-12 lg:h-[51px] rounded-[30px] border-2 border-white bg-transparent text-white font-['Outfit',sans-serif] font-medium text-base sm:text-lg lg:text-xl flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          ))}

          {/* Pagination dots */}
          <div className="absolute bottom-4 md:bottom-8 lg:bottom-[45px] right-4 md:right-8 lg:right-[53px] flex space-x-1">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-[31px] lg:h-[30px] rounded-sm transition-colors ${
                  index === currentSlide ? 'bg-black' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* T-shirts For Men Section */}
        <section className="mt-8 sm:mt-12 md:mt-16 lg:mt-[83px] px-4 md:px-8 lg:px-[155px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 lg:mb-10">
            <h2 className="font-['Shinko_Sans-Regular',sans-serif] font-normal text-black text-xl sm:text-2xl md:text-3xl lg:text-5xl mb-4 sm:mb-0">
              T-shirts For Men
            </h2>
            <div className="flex items-center">
              <a
                href="#"
                className="font-['Poppins',sans-serif] font-medium text-black text-base sm:text-lg md:text-xl lg:text-2xl underline hover:no-underline"
              >
                View More
              </a>
              <span className="ml-2 text-black text-base sm:text-lg md:text-xl lg:text-2xl">→</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
            {tShirts.map((shirt) => (
              <div
                key={shirt.id}
                className="w-full aspect-[3/4] relative overflow-hidden shadow-lg group cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${shirt.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <button className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-[53px] lg:h-[53px] top-3 md:top-4 lg:top-5 right-3 md:right-4 lg:right-5 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span className="text-white text-lg sm:text-xl">♡</span>
                </button>
                <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-5 lg:p-6 text-white">
                  <h3 className="font-['Poppins',sans-serif] font-medium text-sm sm:text-base md:text-lg lg:text-xl mb-2 md:mb-4 lg:mb-6">
                    {shirt.name}
                  </h3>
                  <p className="font-['Poppins',sans-serif] font-medium text-sm sm:text-base md:text-lg lg:text-xl">
                    {shirt.price}
                  </p>
                </div>
                <button 
                  onClick={() => addToCart(shirt.id)}
                  className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-[54px] lg:h-[54px] bottom-10 sm:bottom-12 md:bottom-16 lg:bottom-[59px] right-3 md:right-4 lg:right-5 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <ShoppingCart className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Limited-Time Offers Section */}
        <section className="w-full mt-12 sm:mt-16 md:mt-20 lg:mt-[98px] bg-black/10 py-8 sm:py-12 md:py-16 lg:py-[76px]">
          <div className="px-4 md:px-8 lg:px-[95px]">
            <div className="flex flex-col lg:flex-row items-start mb-8 md:mb-12 lg:mb-[76px]">
              <h2 className="font-['Spline_Sans_Mono',monospace] font-medium text-black text-2xl sm:text-3xl md:text-4xl lg:text-[64px] leading-tight max-w-full lg:max-w-[650px] mb-4 lg:mb-0">
                Vindof Limited-Time Offers
              </h2>
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[82px] lg:h-[82px] bg-black rounded-full border border-solid border-white flex items-center justify-center lg:ml-4">
                <span className="font-['Outfit',sans-serif] font-medium text-[#FF5722] text-lg sm:text-xl md:text-2xl lg:text-[32px]">
                  40%
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10">
              <div className="w-full lg:w-2/3">
                <img
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-[493px] object-cover rounded-lg"
                  alt="Limited time offer"
                  src="https://images.pexels.com/photos/8532609/pexels-photo-8532609.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
              </div>
              <div className="w-full lg:w-1/3 bg-black rounded-xl border border-solid border-white p-4 md:p-6 lg:p-[26px] flex flex-col items-center">
                <img
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-[262px] object-cover mb-4 sm:mb-6 md:mb-8 lg:mb-10 rounded-lg"
                  alt="Pretending Tee"
                  src="https://images.pexels.com/photos/8532473/pexels-photo-8532473.jpeg?auto=compress&cs=tinysrgb&w=400"
                />
                <p className="font-['Spline_Sans_Mono',monospace] font-medium text-white text-xs sm:text-sm md:text-base lg:text-base text-center leading-relaxed">
                  The Pretending Tee Featuring a painted portrait with a
                  zipper covering the eyes and the words "so — when do we
                  stop pretending,"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vindof shirts for men Banner */}
        <section className="w-full h-48 sm:h-64 md:h-80 lg:h-[637px] bg-[url('https://images.pexels.com/photos/8532635/pexels-photo-8532635.jpeg?auto=compress&cs=tinysrgb&w=1000')] bg-cover bg-center relative">
          <h2 className="absolute w-full max-w-[280px] sm:max-w-xs md:max-w-md lg:max-w-[510px] top-1/2 transform -translate-y-1/2 left-4 md:left-8 lg:left-[92px] font-['Shinko_Sans-Regular',sans-serif] font-normal text-black text-2xl sm:text-3xl md:text-4xl lg:text-[64px] leading-tight">
            Vindof shirts for men
          </h2>
        </section>

        {/* Premium shirts Section */}
        <section className="mt-8 sm:mt-12 md:mt-16 lg:mt-[69px] px-4 md:px-8 lg:px-[152px] pb-8 sm:pb-12 md:pb-16 lg:pb-[85px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 lg:mb-10">
            <h2 className="font-['Shinko_Sans-Regular',sans-serif] font-normal text-black text-xl sm:text-2xl md:text-3xl lg:text-5xl mb-4 sm:mb-0">
              Premium shirts
            </h2>
            <div className="flex items-center">
              <a
                href="#"
                className="font-['Poppins',sans-serif] font-medium text-black text-base sm:text-lg md:text-xl lg:text-2xl underline hover:no-underline"
              >
                View More
              </a>
              <span className="ml-2 text-black text-base sm:text-lg md:text-xl lg:text-2xl">→</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
            {premiumShirts.map((shirt) => (
              <div
                key={shirt.id}
                className="w-full aspect-[3/4] relative overflow-hidden shadow-lg group cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${shirt.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <button className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-[53px] lg:h-[53px] top-3 md:top-4 lg:top-5 right-3 md:right-4 lg:right-5 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span className="text-white text-lg sm:text-xl">♡</span>
                </button>
                <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-5 lg:p-6 text-white">
                  <h3 className="font-['Poppins',sans-serif] font-medium text-sm sm:text-base md:text-lg lg:text-xl mb-2 md:mb-4 lg:mb-6">
                    {shirt.name}
                  </h3>
                  <p className="font-['Poppins',sans-serif] font-medium text-sm sm:text-base md:text-lg lg:text-xl">
                    {shirt.price}
                  </p>
                </div>
                <button 
                  onClick={() => addToCart(shirt.id)}
                  className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-[54px] lg:h-[54px] bottom-10 sm:bottom-12 md:bottom-16 lg:bottom-[59px] right-3 md:right-4 lg:right-5 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <ShoppingCart className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-black border-t border-gray-700 py-12 md:py-16 lg:py-20">
          <div className="px-4 md:px-8 lg:px-[95px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {/* About Racan */}
              <div className="lg:col-span-1">
                <img
                  className="h-8 mb-6 filter brightness-0 invert"
                  alt="Racan Logo"
                  src="https://i.postimg.cc/rsYBTFzm/image-41.png"
                />
                <h3 className="font-['Poppins',sans-serif] font-semibold text-lg mb-4 text-white">About Racan</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Premium fashion brand offering high-quality clothing for the modern lifestyle.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-lg mb-4 text-white">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Catalog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-lg mb-4 text-white">Contact</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <a href="mailto:ssbkfdurga17@gmail.com" className="hover:text-white transition-colors">
                      ssbkfdurga17@gmail.com
                    </a>
                  </li>
                  <li>Racan, Vadodara</li>
                  <li>Parul University</li>
                  <li>India</li>
                </ul>
              </div>

              {/* Follow Us */}
              <div>
                <h3 className="font-['Poppins',sans-serif] font-semibold text-lg mb-4 text-white">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-500">
              © 2024 Racan. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};