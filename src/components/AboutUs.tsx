import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Linkedin, Globe, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);
  const [valuesVisible, setValuesVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

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
          if (entry.target === valuesRef.current && entry.isIntersecting) {
            setValuesVisible(true);
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
    if (valuesRef.current) observer.observe(valuesRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (teamRef.current) observer.unobserve(teamRef.current);
      if (valuesRef.current) observer.unobserve(valuesRef.current);
    };
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Kesari Brahmarishendra",
      role: "UI Developer",
      image: "https://i.postimg.cc/Hxh5hDFw/1740918461489.jpg",
      linkedin: "https://www.linkedin.com/in/kesari-brahmarishendra-8a54b0260/",
      description: "Passionate UI developer with expertise in creating beautiful and functional user interfaces for modern web applications."
    },
    {
      id: 2,
      name: "Ganji Lokesh",
      role: "Co-founder",
      image: "https://i.postimg.cc/pXkFjC7K/Whats-App-Image-2025-03-08-at-23-17-43-05d1786f.jpg",
      linkedin: "#",
      description: "Visionary co-founder driving innovation in AI-powered fashion technology and strategic business development."
    },
    {
      id: 3,
      name: "Vaishnavi Rajesh",
      role: "Partner & Marketing",
      image: "https://i.postimg.cc/C1LdPJHg/Whats-App-Image-2025-03-08-at-15-53-37-b38eef7f.jpg",
      linkedin: "#",
      description: "Strategic marketing partner focused on building brand awareness, user engagement, and market expansion."
    },
    {
      id: 4,
      name: "Amy Zanatta",
      role: "Fashion Stylist",
      image: "https://stylewithingrace.com/wp-content/uploads/elementor/thumbs/New-About-Page-Photo-2024-qids6gfvk1z8f2xb7tj04r4thwq0qcxwrfafs3japs.png",
      website: "https://stylewithingrace.com/",
      description: "Professional fashion stylist bringing years of industry experience to enhance our AI-powered recommendations."
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Personalization",
      description: "Every recommendation is tailored to your unique style, preferences, and lifestyle needs."
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible with AI and fashion technology."
    },
    {
      icon: "💎",
      title: "Quality",
      description: "We believe in delivering exceptional quality in both our technology and fashion recommendations."
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

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`transform transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}>
                <h2 className="text-3xl md:text-4xl font-bold text-[#004AAD] mb-6">Our Mission</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  To democratize fashion by making personalized style accessible to everyone through 
                  cutting-edge AI technology. We believe that everyone deserves to look and feel their best, 
                  regardless of their fashion expertise or budget.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
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
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004AAD]/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#004AAD] mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The passionate individuals behind Racan AI, bringing together expertise in 
                technology, fashion, and user experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-[#004AAD]/10 group-hover:ring-[#973cff]/20 transition-all duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400';
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#004AAD] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                      {member.linkedin ? (
                        <Linkedin className="w-4 h-4 text-white" />
                      ) : (
                        <Globe className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#004AAD] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-[#973cff] font-medium text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {member.description}
                    </p>
                    
                    {member.linkedin && member.linkedin !== "#" && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#004AAD] hover:text-[#973cff] transition-colors duration-300 text-sm font-medium"
                      >
                        <Linkedin className="w-4 h-4" />
                        Connect
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    
                    {member.website && (
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#004AAD] hover:text-[#973cff] transition-colors duration-300 text-sm font-medium"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#004AAD] mb-4">
                Our Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do at Racan AI.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className={`text-center p-6 rounded-2xl bg-gradient-to-br from-[#004AAD]/5 to-[#973cff]/5 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 ${
                    valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#004AAD] to-[#973cff] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">{value.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
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
              className="inline-block bg-white text-[#004AAD] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
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