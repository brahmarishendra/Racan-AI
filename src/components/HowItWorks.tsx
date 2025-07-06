import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Camera, Palette, ShoppingBag, ArrowRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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
      id: 1,
      icon: Camera,
      title: "Upload Your Style",
      description: "Share photos of your current wardrobe or describe your fashion preferences. Our AI fashion assistant analyzes your style choices, body type, and color preferences to understand your unique fashion identity.",
      details: "The AI fashion technology examines fabric textures, color combinations, and style patterns to create a comprehensive style profile that serves as the foundation for personalized recommendations."
    },
    {
      id: 2,
      icon: Sparkles,
      title: "AI Analysis & Learning",
      description: "Our advanced artificial intelligence processes your style data using machine learning algorithms. The AI fashion assistant learns from thousands of fashion trends, seasonal collections, and style combinations.",
      details: "The smart wardrobe system analyzes fashion trends, weather patterns, occasion requirements, and personal preferences to generate intelligent outfit suggestions that match your lifestyle."
    },
    {
      id: 3,
      icon: Palette,
      title: "Personalized Recommendations",
      description: "Receive curated outfit suggestions tailored specifically for you. Our AI fashion assistant considers your body type, skin tone, lifestyle, and personal style preferences for every recommendation.",
      details: "Each personalized styling suggestion includes detailed explanations of why certain pieces work together, helping you understand fashion principles while building confidence in your style choices."
    },
    {
      id: 4,
      icon: ShoppingBag,
      title: "Smart Shopping & Wardrobe",
      description: "Shop recommended items directly through our ecommerce platform or organize your existing wardrobe. The smart wardrobe management system helps you maximize your fashion investment.",
      details: "Our fashion ecommerce integration connects you with trusted retailers and emerging designers, ensuring you have access to quality pieces that complement your AI-generated style profile."
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
              Experience the future of fashion with our AI-powered styling process. From style analysis to personalized recommendations, 
              discover how artificial intelligence transforms your fashion journey into a seamless, personalized experience.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`group relative transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Step Card */}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#004AAD] to-[#973cff] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.id}
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#004AAD] transition-colors duration-300">
                      <step.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#004AAD] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Learn More Arrow */}
                  <div className="flex items-center text-[#004AAD] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Connecting Line (for larger screens) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#004AAD] to-[#973cff] transform -translate-y-1/2 z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#973cff] rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detailed Step Information */}
          <div className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transform transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3">
                <div className="w-24 h-24 bg-gradient-to-br from-[#004AAD] to-[#973cff] rounded-2xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
                  {React.createElement(steps[activeStep].icon, { 
                    className: "w-12 h-12 text-white" 
                  })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center lg:text-left">
                  {steps[activeStep].title}
                </h3>
              </div>
              <div className="lg:w-2/3">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {steps[activeStep].details}
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className={`text-center mt-16 transform transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '800ms' }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Style?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of fashion enthusiasts who have discovered their perfect style with Racan AI. 
              Start your personalized fashion journey today with our AI fashion assistant.
            </p>
            <a
              href="https://chat-with-racan.vercel.app"
              className="inline-block bg-gradient-to-r from-[#004AAD] to-[#973cff] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Your Style Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;