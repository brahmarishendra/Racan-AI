import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Linkedin, Globe, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setIsVisible(true);
          }
          if (entry.target === teamRef.current && entry.isIntersecting) {
            setTeamVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (teamRef.current) observer.observe(teamRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (teamRef.current) observer.unobserve(teamRef.current);
    };
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Kesari Brahmarishendra",
      role: "UI Developer",
      image: "https://i.postimg.cc/Hxh5hDFw/1740918461489.jpg",
      linkedin: "https://www.linkedin.com/in/kesari-brahmarishendra-8a54b0260/",
    },
    {
      id: 2,
      name: "Ganji Lokesh",
      role: "Co-founder",
      image: "https://i.postimg.cc/pXkFjC7K/Whats-App-Image-2025-03-08-at-23-17-43-05d1786f.jpg",
      linkedin: "#",
    },
    {
      id: 3,
      name: "Vaishnavi Rajesh",
      role: "Partner & Marketing",
      image: "https://i.postimg.cc/C1LdPJHg/Whats-App-Image-2025-03-08-at-15-53-37-b38eef7f.jpg",
      linkedin: "#",
    },
    {
      id: 4,
      name: "Amy Zanatta",
      role: "Fashion Stylist",
      image: "https://stylewithingrace.com/wp-content/uploads/elementor/thumbs/New-About-Page-Photo-2024-qids6gfvk1z8f2xb7tj04r4thwq0qcxwrfafs3japs.png",
      website: "https://stylewithingrace.com/",
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={sectionRef}
        className="relative pt-32 pb-16 bg-gradient-to-br from-[#004AAD]/5 to-[#973cff]/5 overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-br from-[#004AAD]/10 to-[#973cff]/10 rounded-full blur-3xl -top-48 -left-48"></div>
          <div className="absolute w-80 h-80 bg-gradient-to-br from-[#973cff]/10 to-[#004AAD]/10 rounded-full blur-3xl -bottom-40 -right-40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className={`transform transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <button 
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center gap-2 text-[#004AAD] hover:text-[#973cff] transition-colors duration-300 mb-8"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#004AAD] mb-6">
                About <span className="bg-gradient-to-r from-[#004AAD] to-[#973cff] bg-clip-text text-transparent">Racan AI</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                We're revolutionizing the fashion industry with AI-powered recommendations 
                that understand your unique style, preferences, and personality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section - Dark Background */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`transform transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About Racan</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  To democratize fashion by making personalized style accessible to everyone through 
                  cutting-edge AI technology. We believe that everyone deserves to look and feel their best, 
                  regardless of their fashion expertise or budget.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our AI-powered platform learns from your preferences, body type, and lifestyle to 
                  provide recommendations that are not just trendy, but truly suited to you.
                </p>
              </div>
              <div className={`transform transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}>
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Fashion AI Technology"
                    className="w-full h-80 object-cover rounded-sm shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004AAD]/20 to-transparent rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with Grid Background */}
      <section ref={teamRef} className="py-16 md:py-24 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 74, 173, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 74, 173, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`group text-center transform transition-all duration-700 hover:scale-105 ${
                    teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Profile Image */}
                  <div className="relative mb-6 mx-auto">
                    <div className="w-40 h-40 md:w-48 md:h-48 mx-auto overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400';
                        }}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Hover border effect */}
                      <div className="absolute inset-0 border-4 border-[#004AAD] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Name and Role */}
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#004AAD] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg mb-4 group-hover:text-gray-800 transition-colors duration-300">
                      {member.role}
                    </p>
                    
                    {/* Social Link */}
                    <div className="flex justify-center">
                      {member.linkedin && member.linkedin !== "#" ? (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-600 hover:bg-[#004AAD] hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      ) : member.website ? (
                        <a
                          href={member.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-600 hover:bg-[#004AAD] hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      ) : (
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 text-gray-400 rounded-full">
                          <ExternalLink className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#004AAD] to-[#973cff]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Style?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Join thousands of users who have already discovered their perfect style with Racan AI.
            </p>
            <a
              href="https://chat-with-racan.vercel.app"
              className="inline-block bg-white text-[#004AAD] px-8 py-4 rounded-sm text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Try Racan AI Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;