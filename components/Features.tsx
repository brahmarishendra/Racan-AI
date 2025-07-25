import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';

const Features: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [newsVisible, setNewsVisible] = useState(false);
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
    <section id="features" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-gray-50 -mt-[20px] overflow-hidden relative">


      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-4">
          Our Features
        </h2>

        <div 
          ref={featuresRef}
          className="grid md:grid-cols-3 gap-6 mt-16 px-4"
        >
          {/* AI-Powered Styling - NO SHADOW */}
          <div 
            className={`group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 transition-all duration-700 overflow-hidden transform feature-card ${
              featuresVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-3'
            }`} 
            style={{ transitionDelay: '0ms' }}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="https://i.postimg.cc/VvypZYJt/ddf.png"
                alt="AI-Powered Styling"
                className="w-full h-full object-cover transform scale-110 transition-transform duration-700 rotate-2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-2 border-purple-400/50 rounded-full opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              </div>
            </div>
            <div className="p-6 transform transition-all duration-300 translate-y-[-2px]">
              <h3 className="text-lg font-bold text-purple-700 mb-3 transition-colors duration-300 animate-text-wave">
                AI-Powered Styling
              </h3>
              <p className="text-sm text-slate-700 mb-4 transition-colors duration-300 leading-relaxed">
                Get personalized outfit recommendations based on your style
                preferences.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-purple-700 transition-all duration-300 text-sm font-semibold translate-x-1 magnetic-link"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 translate-x-1 rotate-12" />
              </a>
            </div>
          </div>

          {/* Character Selection - NO SHADOW */}
          <div 
            className={`group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 transition-all duration-700 overflow-hidden transform feature-card ${
              featuresVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-[-3deg]'
            }`} 
            style={{ transitionDelay: '200ms' }}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="https://majestic-halva-16882d.netlify.app/image-9.png"
                alt="Character Selection"
                className="w-full h-full object-cover transform scale-110 transition-transform duration-700 rotate-[-2deg]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-2 border-blue-400/50 rounded-full opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              </div>
            </div>
            <div className="p-6 transform transition-all duration-300 translate-y-[-2px]">
              <h3 className="text-lg font-bold text-blue-700 mb-3 transition-colors duration-300 animate-text-wave">
                Character Selection
              </h3>
              <p className="text-sm text-slate-700 mb-4 transition-colors duration-300 leading-relaxed">
                Pick your character and get style recommendations that match
                their vibe.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-700 transition-all duration-300 text-sm font-semibold translate-x-1 magnetic-link"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 translate-x-1 rotate-12" />
              </a>
            </div>
          </div>

          {/* Smart Wardrobe Assistant - NO SHADOW */}
          <div 
            className={`group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 transition-all duration-700 overflow-hidden transform feature-card ${
              featuresVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-2'
            }`} 
            style={{ transitionDelay: '400ms' }}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="https://majestic-halva-16882d.netlify.app/image-10.png"
                alt="Smart Wardrobe Assistant"
                className="w-full h-full object-cover transform scale-110 transition-transform duration-700 rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-2 border-pink-400/50 rounded-full opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-pink-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              </div>
            </div>
            <div className="p-6 transform transition-all duration-300 translate-y-[-2px]">
              <h3 className="text-lg font-bold text-pink-700 mb-3 transition-colors duration-300 animate-text-wave">
                Smart Wardrobe Assistant
              </h3>
              <p className="text-sm text-slate-700 mb-4 transition-colors duration-300 leading-relaxed">
                Organize your closet and create new outfit combinations with AI
                assistance.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-pink-700 transition-all duration-300 text-sm font-semibold translate-x-1 magnetic-link"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 translate-x-1 rotate-12" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Demo Section */}
        <div 
          ref={sectionRef}
          className={`mt-16 w-full flex flex-col lg:flex-row items-center px-4 lg:px-8 py-12 lg:py-16 gap-12 lg:gap-2 transition-all duration-1000 backdrop-blur-sm rounded-2xl border border-slate-200/50 demo-container ${
            isVisible ? '' : ''
          }`}
          style={{ backgroundColor: '#EDEAF5' }}
        >
          
          <div className="w-full lg:w-3/3 mb-8 lg:mb-0 transform transition-all duration-700">   
  <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] video-glow overflow-hidden border border-slate-200/50">     
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
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 transition-all duration-300">
              Here is <span className="racan-ai-text">Racan AI</span> Demo
            </h3>
            <button
              onClick={() => window.location.href = 'https://chat-with-racan.vercel.app'}
              className="inline-block bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-3 text-sm md:text-base hover:from-purple-900 hover:to-slate-900 mt-[0px] lg:mt-[20px] transition-all duration-300 lg:mr-[12rem] transform hover:scale-105 active:scale-95 hover:-translate-y-1 button-morph cursor-pointer border-none rounded-full"
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
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                News & Blogs
              </h2>
              <p className="text-sm text-slate-600 max-w-lg font-normal transition-colors duration-300" style={{ fontFamily: 'Azeret Mono, monospace' }}>
                Stay updated with the latest from Racan AI. Discover new features, success stories, and fashion insights.
              </p>
            </div>
            <div className={`flex gap-2 justify-end transform transition-all duration-500 delay-200 ${
              newsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-slate-300 border-opacity-[100] flex items-center justify-center hover:bg-slate-100 hover:border-opacity-80 transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95 morphing-button"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600 transition-transform duration-300 hover:scale-110" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-slate-300 border-opacity-[100] flex items-center justify-center hover:bg-slate-100 hover:border-opacity-80 transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95 morphing-button"
              >
                <ChevronRight className="w-4 h-4 text-slate-600 transition-transform duration-300 hover:scale-110" />
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
                    className="block border border-slate-200 border-opacity-[0.50] rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 h-full group hover:scale-[1.02] hover:-translate-y-2 news-card-hover"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 rotating-icon">
                        <ArrowRight className="w-4 h-4 text-slate-900" />
                      </div>
                    </div>
                    <div className="p-4 transform transition-all duration-300 group-hover:translate-y-[-2px]">
                      <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 mb-3 line-clamp-3 group-hover:text-slate-700 transition-colors duration-300" style={{ fontFamily: 'Azeret Mono, monospace' }}>
                        {item.description}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Image Gallery Section */}
        <div className="mt-16 px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Interactive Gallery
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore our AI-powered fashion recommendations through this interactive showcase
            </p>
          </div>
          
          <div className="interactive-gallery-container relative h-96 overflow-hidden rounded-2xl border border-slate-200/50">
            <div className="gallery-track flex transition-transform duration-1000 ease-out h-full">
              <div className="gallery-item flex-shrink-0 w-80 h-full relative overflow-hidden rounded-xl mx-2">
                <img
                  src="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fashion AI 1"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-2">AI Style Match</h3>
                    <p className="text-sm opacity-90">Perfect outfit combinations</p>
                  </div>
                </div>
              </div>
              
              <div className="gallery-item flex-shrink-0 w-80 h-full relative overflow-hidden rounded-xl mx-2">
                <img
                  src="https://images.pexels.com/photos/7679471/pexels-photo-7679471.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fashion AI 2"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-2">Smart Wardrobe</h3>
                    <p className="text-sm opacity-90">Organize with intelligence</p>
                  </div>
                </div>
              </div>
              
              <div className="gallery-item flex-shrink-0 w-80 h-full relative overflow-hidden rounded-xl mx-2">
                <img
                  src="https://i.postimg.cc/VvypZYJt/ddf.png"
                  alt="Fashion AI 3"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-2">Character Styling</h3>
                    <p className="text-sm opacity-90">Personalized recommendations</p>
                  </div>
                </div>
              </div>
              
              <div className="gallery-item flex-shrink-0 w-80 h-full relative overflow-hidden rounded-xl mx-2">
                <img
                  src="https://majestic-halva-16882d.netlify.app/image-9.png"
                  alt="Fashion AI 4"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-2">Trend Analysis</h3>
                    <p className="text-sm opacity-90">Stay ahead of fashion</p>
                  </div>
                </div>
              </div>
              
              <div className="gallery-item flex-shrink-0 w-80 h-full relative overflow-hidden rounded-xl mx-2">
                <img
                  src="https://majestic-halva-16882d.netlify.app/image-10.png"
                  alt="Fashion AI 5"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-2">Color Coordination</h3>
                    <p className="text-sm opacity-90">Perfect color matches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Styles */}
      <style jsx>{`
        /* Racan AI Text Animation */
        @keyframes racanSlide {
          0% {
            transform: translate3d(-100px, 0px, 0px);
            opacity: 0;
          }
          100% {
            transform: translate3d(0px, 0px, 0px);
            opacity: 1;
          }
        }
        
        .racan-ai-text {
          display: inline-block;
          animation: racanSlide 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Interactive Gallery Animations */
        @keyframes gallerySlide {
          0% {
            transform: translate3d(0px, 0px, 0px);
          }
          100% {
            transform: translate3d(-1600px, 0px, 0px);
          }
        }
        
        .interactive-gallery-container {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .gallery-track {
          animation: gallerySlide 20s linear infinite;
          width: calc(320px * 10); /* 5 items * 2 for seamless loop */
        }
        
        .gallery-item {
          transition: all 0.3s ease;
        }
        
        .gallery-item:hover {
          transform: scale(1.05);
          z-index: 10;
        }

        .news-scroll-container::-webkit-scrollbar {
          display: none;
        }
        
        .group:hover .line-clamp-2,
        .group:hover .line-clamp-3 {
          transform: translateY(-1px);
        }

      `}</style>

      {/* Cookie Popup */}
      {showCookiePopup && (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-4 md:left-auto md:right-4 md:max-w-md bg-slate-900 text-white p-4 md:rounded-2xl shadow-lg z-50 border border-slate-700 cookie-popup">
          <h3 className="text-lg font-semibold mb-2">Cookie settings</h3>
          <p className="text-sm text-slate-300 mb-4">
            We use cookies to deliver and improve our services, analyze site usage, and if you agree, to customize or personalize your experience and market our services to you. You can read our Cookie Policy{' '}
            <span className="underline cursor-pointer">here</span>.
          </p>
          <div className="space-y-2">
            <button
              onClick={handleCustomizeCookies}
              className="w-full py-2 px-4 border border-slate-600 text-white rounded-full hover:bg-slate-800 transition-colors duration-300 text-sm"
            >
              Customize Cookie Settings
            </button>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleRejectCookies}
                className="flex-1 py-2 px-4 bg-transparent border border-slate-600 text-white rounded-full hover:bg-slate-800 transition-colors duration-300 text-sm"
              >
                Reject All Cookies
              </button>
              <button
                onClick={handleAcceptCookies}
                className="flex-1 py-2 px-4 bg-white text-slate-900 rounded-full hover:bg-slate-200 transition-colors duration-300 text-sm font-medium"
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Customize Modal */}
      {showCustomizeModal && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-slate-900">Cookie Preferences</h3>
                <button
                  onClick={() => setShowCustomizeModal(false)}
                  className="text-slate-400 hover:text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium text-slate-900">Necessary Cookies</h4>
                    <p className="text-sm text-slate-500">Required for the website to function properly</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600 cursor-not-allowed opacity-50"
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium text-slate-900">Analytics Cookies</h4>
                    <p className="text-sm text-slate-500">Help us improve our website by collecting usage information</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.analytics}
                      onChange={() => handleTogglePreference('analytics')}
                      className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium text-slate-900">Marketing Cookies</h4>
                    <p className="text-sm text-slate-500">Used to deliver relevant ads and marketing campaigns</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.marketing}
                      onChange={() => handleTogglePreference('marketing')}
                      className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Personalization Cookies */}
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium text-slate-900">Personalization Cookies</h4>
                    <p className="text-sm text-slate-500">Remember your preferences and provide personalized features</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.personalization}
                      onChange={() => handleTogglePreference('personalization')}
                      className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowCustomizeModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-purple-900 transition-colors"
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
