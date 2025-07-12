import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';

const Features: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [newsVisible, setNewsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showCookiePopup, setShowCookiePopup] = useState(true);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true and can't be changed
    analytics: false,
    marketing: false,
    personalization: false
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  // Updated news items data with different content and links
  const newsItems = [
    {
      id: 1,
      title: "🚀 Racan AI x DreamX Is Hiring: Frontend Developer Intern (Web3 Stack)",
      description: "We're on the lookout for passionate Frontend Development Interns to collaborate with us on our cutting-edge DreamX product and the Racan AI. If you're eager to work on Web3 technologies, sharpen your frontend skills, and grow in a creative AI-driven environment — this is your chance!",
      image: "https://i.postimg.cc/MKgw8rCf/Whats-App-Image-2025-06-25-at-22-33-39-2e1c8160.jpg",
      link: "https://techcrunch.com/ai-fashion"
    },
    {
      id: 2,
      title: "A great Our story always starts with modern dresses",
      description: "In the fast-paced world of fashion, it's easy to get lost in the trends. But at VINDOF, we believe in something different. We believe in timeless style, quality craftsmanship, and pieces that make you feel confident and beautiful.",
      image: "https://vindof.com/cdn/shop/articles/vindof-casualwear-blog.jpg?v=1749550789&width=1000",
      link: "https://vindof.com/blogs/news/a-great-our-story-always-starts-with-modern-dresses"
    },
    {
      id: 3,
      title: "Smart Wardrobe Integration: The Future is Here",
      description: "Learn how Racan AI seamlessly connects with your existing wardrobe to create endless styling possibilities and reduce fashion waste.",
      image: "https://cdn.shopify.com/s/files/1/0708/3340/6189/files/image_49_1.png?v=1736421252",
      link: "https://www.vogue.com/article/smart-wardrobe-technology"
    },
    {
      id: 4,
      title: "User Success Stories: Style Transformations with Racan AI",
      description: "Real users share their incredible style journeys and how Racan AI helped them discover their perfect fashion identity.",
      image: "https://images.pexels.com/photos/7679471/pexels-photo-7679471.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "https://blog.racanai.com/success-stories"
    },
    {
      id: 5,
      title: "Fashion Week 2025: Racan AI Predicts Next Season's Trends",
      description: "Our AI algorithms analyze global fashion data to predict upcoming trends and help you stay ahead of the style curve.",
      image: "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "https://www.elle.com/fashion/trends/racan-ai-predictions"
    }
  ];

  // Check localStorage on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences));
      setShowCookiePopup(false);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setIsVisible(true);
          }
          if (entry.target === featuresRef.current && entry.isIntersecting) {
            setFeaturesVisible(true);
          }
          if (entry.target === newsRef.current && entry.isIntersecting) {
            setNewsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (newsRef.current) observer.observe(newsRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (newsRef.current) observer.unobserve(newsRef.current);
    };
  }, []);

  const nextSlide = () => {
    const container = document.querySelector('.news-scroll-container');
    if (container) {
      const cardWidth = 320 + 12; // card width + gap
      const newPosition = Math.min(
        currentSlide + 1,
        newsItems.length - Math.floor(container.offsetWidth / cardWidth)
      );
      setCurrentSlide(newPosition);
      container.scrollTo({
        left: newPosition * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const prevSlide = () => {
    const container = document.querySelector('.news-scroll-container');
    if (container) {
      const cardWidth = 320 + 12; // card width + gap
      const newPosition = Math.max(currentSlide - 1, 0);
      setCurrentSlide(newPosition);
      container.scrollTo({
        left: newPosition * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleAcceptCookies = () => {
    const preferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true
    };
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setCookiePreferences(preferences);
    setShowCookiePopup(false);
  };

  const handleRejectCookies = () => {
    const preferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false
    };
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setCookiePreferences(preferences);
    setShowCookiePopup(false);
  };

  const handleCustomizeCookies = () => {
    setShowCustomizeModal(true);
    setShowCookiePopup(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setShowCustomizeModal(false);
  };

  const handleTogglePreference = (key: keyof typeof cookiePreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setCookiePreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section id="features" className="py-16 md:py-24 bg-white -mt-[20px] overflow-hidden relative">
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${15 + i * 15}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#004AAD] text-center transform transition-all duration-1000 opacity-0 translate-y-8 animate-title-reveal">
          Our Features
        </h2>

        <div 
          ref={featuresRef}
          className="grid md:grid-cols-3 gap-6 mt-16 px-4"
        >
          {/* AI-Powered Styling */}
          <div 
            className={`group bg-white rounded-[2px] border border-gray-100 transition-all duration-700 overflow-hidden transform feature-card ${
              featuresVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-3'
            }`} 
            style={{ transitionDelay: '0ms' }}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="https://i.postimg.cc/VvypZYJt/ddf.png"
                alt="AI-Powered Styling"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 group-hover:rotate-2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {hoveredCard === 0 && (
                <div className="absolute inset-0 shimmer-effect pointer-events-none" />
              )}
            </div>
            <div className="p-4 transform transition-all duration-300 group-hover:translate-y-[-2px]">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#004AAD] animate-text-wave">
                AI-Powered Styling
              </h3>
              <p className="text-sm text-gray-600 mb-3 transition-colors duration-300 group-hover:text-gray-700">
                Get personalized outfit recommendations based on your style
                preferences.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-[#004AAD] hover:text-[#973cff] transition-all duration-300 text-sm font-semibold group-hover:translate-x-1 magnetic-link"
              >
                Learn more <ArrowRight className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
              </a>
            </div>
          </div>

          {/* Character Selection */}
          <div 
            className={`group bg-white rounded-[2px] border border-gray-100 transition-all duration-700 overflow-hidden transform feature-card ${
              featuresVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-[-3deg]'
            }`} 
            style={{ transitionDelay: '200ms' }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="https://majestic-halva-16882d.netlify.app/image-9.png"
                alt="Character Selection"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 group-hover:rotate-[-2deg]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {hoveredCard === 1 && (
                <div className="absolute inset-0 shimmer-effect pointer-events-none" />
              )}
            </div>
            <div className="p-4 transform transition-all duration-300 group-hover:translate-y-[-2px]">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#004AAD] animate-text-wave">
                Character Selection
              </h3>
              <p className="text-sm text-gray-600 mb-3 transition-colors duration-300 group-hover:text-gray-700">
                Pick your character and get style recommendations that match
                their vibe.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-[#004AAD] hover:text-[#973cff] transition-all duration-300 text-sm font-semibold group-hover:translate-x-1 magnetic-link"
              >
                Learn more <ArrowRight className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
              </a>
            </div>
          </div>

          {/* Smart Wardrobe Assistant */}
          <div 
            className={`group bg-white rounded-[2px] border border-gray-100 transition-all duration-700 overflow-hidden transform feature-card ${
              featuresVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-2'
            }`} 
            style={{ transitionDelay: '400ms' }}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="https://majestic-halva-16882d.netlify.app/image-10.png"
                alt="Smart Wardrobe Assistant"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {hoveredCard === 2 && (
                <div className="absolute inset-0 shimmer-effect pointer-events-none" />
              )}
            </div>
            <div className="p-4 transform transition-all duration-300 group-hover:translate-y-[-2px]">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#004AAD] animate-text-wave">
                Smart Wardrobe Assistant
              </h3>
              <p className="text-sm text-gray-600 mb-3 transition-colors duration-300 group-hover:text-gray-700">
                Organize your closet and create new outfit combinations with AI
                assistance.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-[#004AAD] hover:text-[#973cff] transition-all duration-300 text-sm font-semibold group-hover:translate-x-1 magnetic-link"
              >
                Learn more <ArrowRight className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Demo Section */}
        <div 
          ref={sectionRef}
          className={`mt-12 w-full flex flex-col lg:flex-row items-center px-4 lg:px-8 py-8 lg:py-12 gap-12 lg:gap-2 transition-all duration-1000 demo-container ${
            isVisible ? '' : ''
          }`}
          style={{backgroundColor: '#F4FFD1'}}
        >
          
          <div className="w-full lg:w-3/3 mb-8 lg:mb-0 transform transition-all duration-700">   
  <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] video-glow overflow-hidden">     
    <iframe        
      title="vimeo-player"       
      src="https://player.vimeo.com/video/1093285476?h=3e899faaff&autoplay=1&loop=1&muted=1&controls=0&background=1"        
      frameBorder="0"        
      allowFullScreen       
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"       
      style={{         
        width: '110%',         
        height: '110%'       
      }}     
    />   
  </div> 
</div>
          <div className={`w-full lg:w-2/3 text-center lg:text-right px-4 lg:mr-[2rem] -mt-[46px] lg:mt-[-50px] transform transition-all duration-800 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4  transition-all duration-300 hover:scale-105">
              Here is Racan Ai Demo
            </h3>
            <button
              onClick={() => window.location.href = 'https://chat-with-racan.vercel.app'}
              className="inline-block bg-[#004AAD] text-white px-6 py-3 text-sm md:text-base hover:bg-[#973cff] mt-[0px] lg:mt-[20px] transition-all duration-300 lg:mr-[12rem] transform hover:scale-105 hover:shadow-lg active:scale-95 hover:-translate-y-1 button-morph cursor-pointer border-none"
              style={{borderRadius: '0px'}}
            >
              Try Racan AI
            </button>
          </div>
        </div>

        {/* News & Blogs Section */}
        <div ref={newsRef} className="mt-16 px-4">
          <div className={`flex flex-col md:flex-row md:items-center md:justify-between mb-8 transform transition-all duration-700 ${
            newsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 hover:text-[#004AAD] transition-colors duration-300 typewriter-effect" style={{ fontFamily: 'Poppins, sans-serif' }}>
                News & Blogs
              </h2>
              <p className="text-sm text-gray-600 max-w-lg font-normal transition-colors duration-300 hover:text-gray-800 slide-in-text" style={{ fontFamily: 'Azeret Mono, monospace' }}>
                Stay updated with the latest from Racan AI. Discover new features, success stories, and fashion insights.
              </p>
            </div>
            <div className={`flex gap-2 justify-end transform transition-all duration-500 delay-200 ${
              newsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-black border-opacity-[100] flex items-center justify-center hover:bg-[#F4FFD1] hover:border-opacity-80 transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95 morphing-button"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600 transition-transform duration-300 hover:scale-110" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-black border-opacity-[100] flex items-center justify-center hover:bg-[#F4FFD1] hover:border-opacity-80 transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95 morphing-button"
              >
                <ChevronRight className="w-4 h-4 text-gray-600 transition-transform duration-300 hover:scale-110" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="news-scroll-container flex overflow-x-auto gap-3 pb-4" 
                 style={{ 
                   scrollbarWidth: 'none', 
                   msOverflowStyle: 'none',
                   scrollPadding: '0',
                   paddingLeft: '0',
                   paddingRight: '12px'
                 }}>
              {newsItems.map((item, index) => (
                <div key={item.id} className={`w-80 md:w-72 lg:w-80 flex-shrink-0 transform transition-all duration-700 news-card ${
                  newsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`} style={{ transitionDelay: `${index * 150}ms` }}>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block border border-black border-opacity-[0.30] rounded-[2px] overflow-hidden bg-white hover:shadow-xl transition-all duration-500 h-full group hover:scale-[1.02] hover:-translate-y-2 news-card-hover"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 rotating-icon">
                        <ArrowRight className="w-4 h-4 text-[#004AAD]" />
                      </div>
                    </div>
                    <div className="p-4 transform transition-all duration-300 group-hover:translate-y-[-2px]">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#004AAD] transition-colors duration-300 glitch-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'Azeret Mono, monospace' }}>
                        {item.description}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(2rem);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes morph {
          0%, 100% { border-radius: 50%; }
          50% { border-radius: 20%; }
        }

     
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes slide-in {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes rotate-icon {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          animation-delay: 0.2s;
        }

        .animate-title-reveal {
          animation: fade-in-up 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.3s;
        }

        .floating-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #004AAD, #973cff);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
          opacity: 0.6;
        }

        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2s infinite;
        }

        .feature-card:hover {
          box-shadow: 0 20px 40px rgba(0, 74, 173, 0.15);
        }

        .morphing-button:hover {
          animation: morph 0.6s ease-in-out;
        }

        .glitch-text:hover {
          animation: glitch 0.3s infinite;
        }

        .animate-text-wave {
          animation: wave 2s ease-in-out infinite;
        }

        .typewriter-effect {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 2s steps(40, end), fade-in-up 0.5s;
        }

        .slide-in-text {
          animation: slide-in 1s ease-out forwards;
          animation-delay: 0.5s;
        }

        .rotating-icon:hover .lucide-arrow-right {
          animation: rotate-icon 0.5s ease-in-out;
        }

        .video-glow:hover {
          filter: drop-shadow(0 0 20px rgba(0, 74, 173, 0.3));
        }

        .button-morph {
          position: relative;
          overflow: hidden;
        }

        .button-morph:hover {
          border-radius: 25px !important;
        }

        .button-morph:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .button-morph:hover:before {
          left: 100%;
        }

        .news-card-hover:hover {
          background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
        }

        .magnetic-link {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .magnetic-link:hover {
          transform: translateX(3px) scale(1.05);
        }

        .demo-container {
          position: relative;
        }

        .demo-container:before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #004AAD, #973cff, #004AAD);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .demo-container:hover:before {
          opacity: 0.1;
        }

        .news-scroll-container::-webkit-scrollbar {
          display: none;
        }
        
        .group:hover .line-clamp-2,
        .group:hover .line-clamp-3 {
          transform: translateY(-1px);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Cookie Popup */}
      {showCookiePopup && (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-4 md:left-auto md:right-4 md:max-w-md bg-black text-white p-4 md:rounded shadow-lg z-50 border border-gray-700 cookie-popup">
          <h3 className="text-lg font-semibold mb-2">Cookie settings</h3>
          <p className="text-sm text-gray-300 mb-4">
            We use cookies to deliver and improve our services, analyze site usage, and if you agree, to customize or personalize your experience and market our services to you. You can read our Cookie Policy{' '}
            <span className="underline cursor-pointer">here</span>.
          </p>
          <div className="space-y-2">
            <button
              onClick={handleCustomizeCookies}
              className="w-full py-2 px-4 border border-gray-600 text-white rounded hover:bg-gray-800 transition-colors duration-300 text-sm"
            >
              Customize Cookie Settings
            </button>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleRejectCookies}
                className="flex-1 py-2 px-4 bg-transparent border border-gray-600 text-white rounded hover:bg-gray-800 transition-colors duration-300 text-sm"
              >
                Reject All Cookies
              </button>
              <button
                onClick={handleAcceptCookies}
                className="flex-1 py-2 px-4 bg-white text-black rounded hover:bg-gray-200 transition-colors duration-300 text-sm font-medium"
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Customize Modal */}
      {showCustomizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Cookie Preferences</h3>
                <button
                  onClick={() => setShowCustomizeModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium text-gray-900">Necessary Cookies</h4>
                    <p className="text-sm text-gray-500">Required for the website to function properly</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="h-4 w-4 rounded border-gray-300 text-[#004AAD] focus:ring-[#004AAD] cursor-not-allowed opacity-50"
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                    <p className="text-sm text-gray-500">Help us improve our website by collecting usage information</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.analytics}
                      onChange={() => handleTogglePreference('analytics')}
                      className="h-4 w-4 rounded border-gray-300 text-[#004AAD] focus:ring-[#004AAD] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                    <p className="text-sm text-gray-500">Used to deliver relevant ads and marketing campaigns</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.marketing}
                      onChange={() => handleTogglePreference('marketing')}
                      className="h-4 w-4 rounded border-gray-300 text-[#004AAD] focus:ring-[#004AAD] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Personalization Cookies */}
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium text-gray-900">Personalization Cookies</h4>
                    <p className="text-sm text-gray-500">Remember your preferences and provide personalized features</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.personalization}
                      onChange={() => handleTogglePreference('personalization')}
                      className="h-4 w-4 rounded border-gray-300 text-[#004AAD] focus:ring-[#004AAD] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowCustomizeModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 bg-[#004AAD] text-white text-sm font-medium rounded hover:bg-[#973cff] transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Features;