import React, { useEffect, useRef, useState } from 'react';
import { Shield, Zap, Users, Award, Heart, Sparkles } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const reasons = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Advanced AI Technology",
      description: "Our cutting-edge artificial intelligence algorithms provide 98% accuracy in fashion recommendations, learning from millions of style combinations to deliver personalized outfit suggestions.",
      stats: "98% Accuracy"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "150K+ Happy Users",
      description: "Join thousands of fashion enthusiasts who have transformed their style with Racan AI. Our growing community trusts us for personalized fashion advice and smart wardrobe management.",
      stats: "150K+ Users"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy & Security",
      description: "Your personal style data and preferences are protected with enterprise-grade security. We prioritize your privacy while delivering exceptional AI-powered fashion recommendations.",
      stats: "100% Secure"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Expert Fashion Curation",
      description: "Our team of professional stylists and fashion experts work alongside AI technology to ensure every recommendation meets the highest standards of style and quality.",
      stats: "Expert Curated"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Personalized Experience",
      description: "Every user receives a unique fashion journey tailored to their body type, lifestyle, and personal preferences. Our AI learns and adapts to your evolving style choices.",
      stats: "100% Personal"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Continuous Innovation",
      description: "We constantly update our AI models with the latest fashion trends, seasonal styles, and user feedback to provide cutting-edge fashion technology and styling solutions.",
      stats: "Always Updated"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#004AAD] text-white relative overflow-hidden"
      aria-labelledby="why-choose-title"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 id="why-choose-title" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Why Choose Racan AI?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover what makes Racan AI the leading choice for AI-powered fashion assistance. 
              From advanced technology to personalized service, we're revolutionizing how you experience fashion.
            </p>
          </div>

          {/* Reasons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className={`group transform transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 border border-white/20 h-full">
                  {/* Icon and Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-[#973cff] to-[#d70153] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {reason.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#EEFFC1]">{reason.stats}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4 group-hover:text-[#EEFFC1] transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-blue-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#EEFFC1] mb-2">150K+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#EEFFC1] mb-2">98%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#EEFFC1] mb-2">24/7</div>
              <div className="text-blue-100">AI Assistance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#EEFFC1] mb-2">100%</div>
              <div className="text-blue-100">Personalized</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;