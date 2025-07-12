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
  const scrollTextRef = useRef<HTMLDivElement>(null);

  // Scrolling text animation
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTextRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        scrollTextRef.current.style.transform = `translateX(${rate}px) rotate(-15deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <section id="features" className="py-16 md:py-24 bg-[#FF8A50] -mt-[20px] overflow-hidden relative">
      {/* Rest of the JSX code remains the same */}
    </section>
  );
};

export default Features;