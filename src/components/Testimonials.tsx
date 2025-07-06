import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      location: "New York, NY",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "Racan AI has completely revolutionized my approach to fashion. The AI fashion assistant understands my style better than I do sometimes! The personalized recommendations have helped me discover amazing pieces that I never would have considered. It's like having a professional stylist available 24/7.",
      highlight: "Discovered my perfect style"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Professional",
      location: "San Francisco, CA",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "As someone who struggles with fashion choices, Racan AI has been a game-changer. The smart wardrobe management feature helps me organize my clothes efficiently, and the AI recommendations ensure I always look professional. The ecommerce integration makes shopping so much easier.",
      highlight: "Professional wardrobe made easy"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "College Student",
      location: "Austin, TX",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "I love how Racan AI considers my budget and lifestyle when making recommendations. The AI fashion technology is incredible - it learns from my preferences and suggests outfits that are both trendy and affordable. Perfect for a college student like me!",
      highlight: "Budget-friendly fashion solutions"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Creative Director",
      location: "Los Angeles, CA",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "The personalized styling feature is phenomenal. Racan AI understands the creative industry's fashion demands and suggests pieces that help me express my artistic personality while maintaining professionalism. The AI recommendations are always on point.",
      highlight: "Creative expression meets professionalism"
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Marketing Manager",
      location: "Chicago, IL",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "Racan AI's smart wardrobe assistant has saved me so much time and money. Instead of buying clothes I'll never wear, the AI helps me make informed decisions. The fashion ecommerce platform connects me with quality brands that match my style perfectly.",
      highlight: "Smart shopping decisions"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Entrepreneur",
      location: "Miami, FL",
      image: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "The AI fashion assistant adapts to different occasions seamlessly. Whether I need business attire for meetings or casual wear for networking events, Racan AI provides perfect recommendations. The technology behind this platform is truly impressive.",
      highlight: "Versatile occasion styling"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-br from-[#004AAD]/5 to-[#973cff]/5 relative overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-[#004AAD]/10 to-[#973cff]/10 rounded-full blur-3xl -top-48 -right-48"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-[#973cff]/10 to-[#004AAD]/10 rounded-full blur-3xl -bottom-40 -left-40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 id="testimonials-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#004AAD] mb-6">
              What Our Users Say
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover how Racan AI has transformed the fashion journey for thousands of users worldwide. 
              Read real stories from fashion enthusiasts who have experienced the power of AI-driven personalized styling.
            </p>
          </div>

          {/* Main Testimonial Display */}
          <div className={`relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '300ms' }}>
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-br from-[#004AAD] to-[#973cff] rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 mt-8">
              {/* User Image */}
              <div className="lg:w-1/4 flex-shrink-0">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={`${testimonials[currentTestimonial].name} - Racan AI user testimonial`}
                  className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg"
                  loading="lazy"
                />
              </div>

              {/* Testimonial Content */}
              <div className="lg:w-3/4 text-center lg:text-left">
                {/* Rating */}
                <div className="flex justify-center lg:justify-start mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                {/* User Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </h3>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                  </p>
                </div>

                {/* Highlight */}
                <div className="inline-block bg-gradient-to-r from-[#004AAD] to-[#973cff] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {testimonials[currentTestimonial].highlight}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-2 mb-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-[#004AAD] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Additional Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${600 + index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name} testimonial`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  "{testimonial.text.substring(0, 120)}..."
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className={`text-center mt-16 transform transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '1000ms' }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Thousands of Satisfied Users
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the future of fashion with Racan AI. Start your personalized styling journey today 
              and discover why users love our AI fashion assistant.
            </p>
            <a
              href="https://chat-with-racan.vercel.app"
              className="inline-block bg-gradient-to-r from-[#004AAD] to-[#973cff] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Your Fashion Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;