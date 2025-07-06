import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
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

  const faqs = [
    {
      id: 1,
      question: "What is Racan AI and how does it work?",
      answer: "Racan AI is an advanced AI-powered fashion assistant and ecommerce platform that provides personalized outfit recommendations. Our artificial intelligence analyzes your style preferences, body type, skin tone, and lifestyle to suggest clothing that matches your unique fashion identity. The AI fashion technology learns from your choices and feedback to continuously improve recommendations, ensuring you always get personalized styling advice that suits your needs."
    },
    {
      id: 2,
      question: "How accurate are the AI fashion recommendations?",
      answer: "Our AI fashion assistant boasts a 98% accuracy rate in style recommendations. The system uses advanced machine learning algorithms trained on millions of fashion combinations, trend data, and user preferences. The AI continuously learns from user feedback and fashion industry trends to maintain high accuracy. Most users find that recommendations improve significantly after just a few interactions with the platform."
    },
    {
      id: 3,
      question: "Is Racan AI free to use?",
      answer: "Yes, Racan AI offers free access to basic styling recommendations and wardrobe management features. Our free tier includes AI-powered outfit suggestions, basic style analysis, and access to our fashion community. Premium features such as advanced personalization, exclusive designer collections, priority customer support, and enhanced ecommerce integration are available through our subscription plans."
    },
    {
      id: 4,
      question: "Can I shop for clothes directly through Racan AI?",
      answer: "Absolutely! Racan AI includes a comprehensive ecommerce platform where you can purchase recommended items directly through our network of trusted fashion partners and retailers. We've partnered with leading brands and emerging designers to offer you curated collections that match your AI-generated style profile. The smart shopping feature ensures you only see items that complement your existing wardrobe and personal style."
    },
    {
      id: 5,
      question: "How does the smart wardrobe management work?",
      answer: "Our smart wardrobe assistant helps you organize and maximize your existing clothing collection. You can upload photos of your current wardrobe, and the AI will categorize items, suggest new combinations, and identify gaps in your collection. The system tracks what you wear, suggests outfit rotations, and helps you make informed decisions about future purchases to avoid redundant items."
    },
    {
      id: 6,
      question: "What makes Racan AI different from other fashion apps?",
      answer: "Racan AI stands out through its advanced AI technology that considers multiple factors including body type, skin tone, lifestyle, budget, and personal preferences. Unlike other fashion apps that offer generic suggestions, our AI creates a unique style profile for each user. We also combine AI recommendations with expert fashion curation, ensuring both technological accuracy and professional styling standards."
    },
    {
      id: 7,
      question: "How does Racan AI protect my personal data?",
      answer: "We prioritize your privacy and data security with enterprise-grade protection measures. All personal style data and preferences are encrypted and stored securely. We never share your personal information with third parties without explicit consent. Our privacy policy is transparent about data usage, and you maintain full control over your information with options to modify or delete your data at any time."
    },
    {
      id: 8,
      question: "Can Racan AI work for all body types and styles?",
      answer: "Yes, Racan AI is designed to work for all body types, sizes, and style preferences. Our AI fashion technology is trained on diverse datasets representing various body types, cultural styles, and fashion preferences. Whether you prefer minimalist, bohemian, professional, or avant-garde styles, the AI adapts to your unique preferences and provides relevant recommendations that enhance your natural beauty and confidence."
    },
    {
      id: 9,
      question: "How quickly does the AI learn my preferences?",
      answer: "The AI fashion assistant begins providing personalized recommendations immediately based on your initial style quiz and preferences. However, the system becomes increasingly accurate with each interaction. Most users notice significant improvement in recommendation quality within the first week of use. The AI continuously learns from your feedback, purchases, and style choices to refine its understanding of your fashion preferences."
    },
    {
      id: 10,
      question: "Does Racan AI work for special occasions and events?",
      answer: "Absolutely! Racan AI excels at providing occasion-specific styling recommendations. Whether you need outfits for business meetings, casual outings, formal events, weddings, or seasonal celebrations, the AI considers the event type, dress code, weather, and your personal style to suggest appropriate attire. You can specify the occasion when requesting recommendations for perfectly tailored suggestions."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white relative overflow-hidden"
      aria-labelledby="faq-title"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-[#004AAD]/5 to-[#973cff]/5 rounded-full blur-3xl -top-48 -left-48"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-[#973cff]/5 to-[#004AAD]/5 rounded-full blur-3xl -bottom-40 -right-40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="flex items-center justify-center mb-6">
              <HelpCircle className="w-12 h-12 text-[#004AAD] mr-4" />
              <h2 id="faq-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#004AAD]">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Get answers to common questions about Racan AI's fashion technology, features, and how our AI-powered styling platform 
              can transform your fashion experience. Find everything you need to know about personalized styling and smart wardrobe management.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className={`bg-gray-50 rounded-xl border border-gray-200 overflow-hidden transform transition-all duration-700 hover:shadow-lg ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:bg-gray-100"
                  aria-expanded={openFAQ === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openFAQ === faq.id ? (
                      <ChevronUp className="w-6 h-6 text-[#004AAD]" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                </button>
                
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className={`text-center mt-16 bg-gradient-to-br from-[#004AAD] to-[#973cff] rounded-2xl p-8 text-white transform transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '1000ms' }}>
            <h3 className="text-2xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Our fashion experts and technical support team are here to help you get the most out of Racan AI. 
              Contact us for personalized assistance with your fashion journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ssbkfdurga17@gmail.com"
                className="inline-block bg-white text-[#004AAD] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Contact Support
              </a>
              <a
                href="https://chat-with-racan.vercel.app"
                className="inline-block border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#004AAD] transition-all duration-300"
              >
                Try Racan AI Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;