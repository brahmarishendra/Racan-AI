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
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

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
      const cardWidth = 320 + 12;
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
      const cardWidth = 320 + 12;
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
    if (key === 'necessary') return;
    setCookiePreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section id="features" className="py-16 md:py-24 bg-white -mt-[20px] overflow-hidden relative border-t border-gray-100">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-gray-50/20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16 tracking-tight">
          Our Features
        </h2>

        <div 
          ref={featuresRef}
          className="grid md:grid-cols-3 gap-8 mt-16 px-4"
        >
          {/* AI-Powered Styling */}
          <div 
            className={`group bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-500 overflow-hidden transform hover:scale-105 hover:shadow-xl ${
              featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`} 
            style={{ transitionDelay: '0ms' }}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="https://i.postimg.cc/VvypZYJt/ddf.png"
                alt="AI-Powered Styling"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI-Powered Styling
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Get personalized outfit recommendations based on your style
                preferences.
              </p>
              <button className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors duration-300 font-medium group">
                Learn more 
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Character Selection */}
          <div 
            className={`group bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-500 overflow-hidden transform hover:scale-105 hover:shadow-xl ${
              featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`} 
            style={{ transitionDelay: '200ms' }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="https://majestic-halva-16882d.netlify.app/image-9.png"
                alt="Character Selection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Character Selection
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Pick your character and get style recommendations that match
                their vibe.
              </p>
              <button className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors duration-300 font-medium group">
                Learn more 
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Smart Wardrobe Assistant */}
          <div 
            className={`group bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-500 overflow-hidden transform hover:scale-105 hover:shadow-xl ${
              featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`} 
            style={{ transitionDelay: '400ms' }}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="https://majestic-halva-16882d.netlify.app/image-10.png"
                alt="Smart Wardrobe Assistant"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Smart Wardrobe Assistant
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Organize your closet and create new outfit combinations with AI
                assistance.
              </p>
              <button className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors duration-300 font-medium group">
                Learn more 
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Demo Section */}
        <div 
          ref={sectionRef}
          className={`mt-16 w-full flex flex-col lg:flex-row items-center px-4 lg:px-8 py-12 lg:py-16 gap-12 lg:gap-2 transition-all duration-1000 ${
            isVisible ? '' : ''
          }`}
        >
          
          <div className="w-full lg:w-3/3 mb-8 lg:mb-0 transform transition-all duration-700">   
            <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] overflow-hidden bg-white border border-gray-100">     
              <iframe        
                title="vimeo-player"       
                src="https://player.vimeo.com/video/1093285476?h=3e899faaff&autoplay=1&loop=1&muted=1&controls=0&background=1"        
                frameBorder="0"        
                allowFullScreen       
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover rounded-xl"       
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
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 transition-all duration-300">
              Here is Racan AI Demo
            </h3>
            <button
              onClick={() => window.location.href = 'https://chat-with-racan.vercel.app'}
              className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full text-sm md:text-base hover:bg-gray-800 mt-[0px] lg:mt-[20px] transition-all duration-300 lg:mr-[12rem] transform hover:scale-105 hover:shadow-lg font-medium cursor-pointer border-none"
            >
              <span>Try Racan AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* News & Blogs Section */}
        <div ref={newsRef} className="mt-20 px-4">
          <div className={`flex flex-col md:flex-row md:items-center md:justify-between mb-12 transform transition-all duration-700 ${
            newsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                News & Blogs
              </h2>
              <p className="text-gray-600 max-w-lg leading-relaxed">
                Stay updated with the latest from Racan AI. Discover new features, success stories, and fashion insights.
              </p>
            </div>
            <div className={`flex gap-3 justify-end transform transition-all duration-500 delay-200 ${
              newsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-md"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-md"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="news-scroll-container flex overflow-x-auto gap-6 pb-4" 
                 style={{ 
                   scrollbarWidth: 'none', 
                   msOverflowStyle: 'none',
                   scrollPadding: '0',
                   paddingLeft: '0',
                   paddingRight: '12px'
                 }}>
              {newsItems.map((item, index) => (
                <div key={item.id} className={`w-80 md:w-72 lg:w-80 flex-shrink-0 transform transition-all duration-700 ${
                  newsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`} style={{ transitionDelay: `${index * 150}ms` }}>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-xl hover:border-gray-200 transition-all duration-500 h-full group hover:scale-[1.02] hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <ArrowRight className="w-4 h-4 text-gray-900" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3 leading-relaxed">
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

      {/* Cookie Popup */}
      {showCookiePopup && (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-auto md:right-6 md:max-w-md bg-white text-gray-900 p-6 md:rounded-xl shadow-2xl z-50 border border-gray-200">
          <h3 className="text-lg font-bold mb-3">Cookie settings</h3>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            We use cookies to deliver and improve our services, analyze site usage, and if you agree, to customize or personalize your experience and market our services to you. You can read our Cookie Policy{' '}
            <span className="underline cursor-pointer text-gray-900">here</span>.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleCustomizeCookies}
              className="w-full py-3 px-4 border border-gray-200 text-gray-900 rounded-full hover:bg-gray-50 transition-colors duration-300 text-sm font-medium"
            >
              Customize Cookie Settings
            </button>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRejectCookies}
                className="flex-1 py-3 px-4 bg-transparent border border-gray-200 text-gray-900 rounded-full hover:bg-gray-50 transition-colors duration-300 text-sm font-medium"
              >
                Reject All Cookies
              </button>
              <button
                onClick={handleAcceptCookies}
                className="flex-1 py-3 px-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-300 text-sm font-medium"
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
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Cookie Preferences</h3>
                <button
                  onClick={() => setShowCustomizeModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-900">Necessary Cookies</h4>
                    <p className="text-sm text-gray-500">Required for the website to function properly</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-not-allowed opacity-50"
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                    <p className="text-sm text-gray-500">Help us improve our website by collecting usage information</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.analytics}
                      onChange={() => handleTogglePreference('analytics')}
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                    <p className="text-sm text-gray-500">Used to deliver relevant ads and marketing campaigns</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.marketing}
                      onChange={() => handleTogglePreference('marketing')}
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Personalization Cookies */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-900">Personalization Cookies</h4>
                    <p className="text-sm text-gray-500">Remember your preferences and provide personalized features</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.personalization}
                      onChange={() => handleTogglePreference('personalization')}
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => setShowCustomizeModal(false)}
                  className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .news-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Features;