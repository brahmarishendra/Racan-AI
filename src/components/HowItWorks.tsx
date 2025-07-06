import React, { useEffect, useRef, useState } from 'react';
import { Brain, Camera, Sparkles, ShoppingBag } from 'lucide-react';

const HowItWorks: React.FC = () => {
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

  const steps = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Upload Your Style",
      description: "Share photos of your current wardrobe or describe your fashion preferences. Our AI fashion assistant analyzes your style choices to understand your unique taste and preferences.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Analysis",
      description: "Our advanced artificial intelligence technology processes your style data, body measurements, and lifestyle preferences to create a personalized fashion profile with smart recommendations.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Get Recommendations",
      description: "Receive personalized outfit suggestions, wardrobe coordination tips, and style advice tailored specifically to your body type, skin tone, and fashion goals.",
      color: "from-pink-500 to-red-600"
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Shop & Style",
      description: "Browse curated fashion items from our ecommerce partners, purchase recommended pieces, and build your perfect wardrobe with confidence using our smart shopping features.",
      color: "from-red-500 to-orange-600"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      aria-labelledby="how-it-works-title"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-[#004AAD]/5 to-[#973cff]/5 rounded-full blur-3xl -top-48 -left-48"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-[#973cff]/5 to-[#004AAD]/5 rounded-full blur-3xl -bottom-40 -right-40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 id="how-it-works-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#004AAD] mb-6">
              How Racan AI Works
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Experience the future of fashion with our AI-powered styling process. From wardrobe analysis to personalized recommendations, 
              discover how artificial intelligence transforms your fashion journey in four simple steps.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative group transform transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full border-2 border-[#004AAD] flex items-center justify-center text-[#004AAD] font-bold text-sm z-10">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#004AAD] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#004AAD] to-[#973cff] transform -translate-y-1/2 z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#973cff] rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className={`text-center mt-16 transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <p className="text-lg text-gray-700 mb-8">
              Ready to revolutionize your fashion experience with AI-powered styling?
            </p>
            <a
              href="https://chat-with-racan.vercel.app"
              className="inline-block bg-[#004AAD] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#973cff] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              aria-label="Start your AI fashion journey with Racan AI"
            >
              Start Your AI Fashion Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;