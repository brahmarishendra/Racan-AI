import React, { useEffect, useRef, useState } from 'react';
import { Brain, Shield, Zap, Users, Award, Sparkles } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

  const benefits = [
    {
      id: 1,
      icon: Brain,
      title: "Advanced AI Technology",
      description: "Our cutting-edge artificial intelligence uses machine learning algorithms to understand fashion trends, personal preferences, and style compatibility. The AI fashion assistant continuously learns from global fashion data to provide increasingly accurate recommendations.",
      stats: "98% accuracy rate",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      icon: Sparkles,
      title: "Personalized Styling",
      description: "Every recommendation is tailored specifically to your body type, skin tone, lifestyle, and personal preferences. Our personalized styling approach ensures that each suggestion enhances your natural beauty and fits your unique fashion identity.",
      stats: "100% personalized",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      icon: Zap,
      title: "Instant Recommendations",
      description: "Get fashion advice in seconds, not hours. Our AI fashion assistant processes your style preferences instantly, providing immediate outfit suggestions for any occasion, weather, or mood. No more spending hours deciding what to wear.",
      stats: "< 3 seconds response",
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: 4,
      icon: Shield,
      title: "Privacy & Security",
      description: "Your personal style data and preferences are protected with enterprise-grade security. We prioritize your privacy while delivering personalized fashion recommendations, ensuring your information remains secure and confidential.",
      stats: "Bank-level security",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 5,
      icon: Users,
      title: "Community & Trends",
      description: "Connect with a vibrant community of fashion enthusiasts and stay updated with the latest trends. Our platform combines AI insights with real user feedback to keep you at the forefront of fashion innovation.",
      stats: "150K+ active users",
      color: "from-indigo-500 to-blue-600"
    },
    {
      id: 6,
      icon: Award,
      title: "Expert Curation",
      description: "Our team of fashion experts and stylists work alongside AI technology to ensure quality recommendations. This human-AI collaboration guarantees that every suggestion meets professional styling standards.",
      stats: "Expert verified",
      color: "from-red-500 to-pink-600"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-900 text-white relative overflow-hidden"
      aria-labelledby="why-choose-title"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
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
              Why Choose <span className="bg-gradient-to-r from-[#004AAD] to-[#973cff] bg-clip-text text-transparent">Racan AI</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover what makes Racan AI the leading choice for fashion enthusiasts worldwide. Our innovative approach to AI-powered styling 
              combines cutting-edge technology with personalized fashion expertise to transform your wardrobe experience.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.id}
                className={`group relative transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(benefit.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Benefit Card */}
                <div className="bg-gray-800 rounded-xl p-6 h-full border border-gray-700 hover:border-gray-600 transition-all duration-500 relative overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-4 relative z-10`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                      {benefit.description}
                    </p>
                    
                    {/* Stats Badge */}
                    <div className={`inline-block bg-gradient-to-r ${benefit.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {benefit.stats}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  {hoveredCard === benefit.id && (
                    <div className="absolute inset-0 border-2 border-gradient-to-r from-[#004AAD] to-[#973cff] rounded-xl pointer-events-none"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Statistics Section */}
          <div className={`bg-gray-800 rounded-2xl p-8 border border-gray-700 transform transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">150K+</div>
                <div className="text-gray-400 text-sm">Active Users</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
                <div className="text-gray-400 text-sm">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">2M+</div>
                <div className="text-gray-400 text-sm">Outfits Created</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400 text-sm">AI Assistance</div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className={`text-center mt-16 transform transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '800ms' }}>
            <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-6 max-w-4xl mx-auto">
              "Racan AI has completely transformed how I approach fashion. The personalized recommendations are incredibly accurate, 
              and I've discovered styles I never would have tried on my own. It's like having a personal stylist available 24/7."
            </blockquote>
            <cite className="text-gray-400">- Sarah M., Fashion Enthusiast</cite>
          </div>

          {/* Call to Action */}
          <div className={`text-center mt-12 transform transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '1000ms' }}>
            <a
              href="https://chat-with-racan.vercel.app"
              className="inline-block bg-gradient-to-r from-[#004AAD] to-[#973cff] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Experience Racan AI Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;