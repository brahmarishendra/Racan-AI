import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Linkedin, Globe, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  // SEO optimization for About page
  useEffect(() => {
    // Update page title and meta description
    document.title = 'About Racan AI - Meet Our Team & Mission | AI Fashion Assistant';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Racan AI\'s mission to revolutionize fashion with AI technology. Meet our team of experts dedicated to providing personalized style recommendations and smart wardrobe solutions.');
    }
    
    // Add page-specific structured data
    const aboutPageStructuredData = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Racan AI",
      "description": "Learn about Racan AI's mission to revolutionize fashion with AI technology and meet our expert team.",
      "url": "https://racan-ai.vercel.app/about",
      "mainEntity": {
        "@type": "Organization",
        "name": "Racan AI",
        "description": "AI-powered fashion assistant revolutionizing the fashion industry",
        "foundingDate": "2024",
        "employee": [
          {
            "@type": "Person",
            "name": "Kesari Brahmarishendra",
            "jobTitle": "UI Developer",
            "url": "https://www.linkedin.com/in/kesari-brahmarishendra-8a54b0260/"
          },
          {
            "@type": "Person",
            "name": "Ganji Lokesh",
            "jobTitle": "Co-founder"
          },
          {
            "@type": "Person",
            "name": "Vaishnavi Rajesh",
            "jobTitle": "Partner & Marketing"
          },
          {
            "@type": "Person",
            "name": "Amy Zanatta",
            "jobTitle": "Fashion Stylist",
            "url": "https://stylewithingrace.com/"
          }
        ]
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(aboutPageStructuredData);
    document.head.appendChild(script);
    
    // Add breadcrumb structured data
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://racan-ai.vercel.app/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About Us",
          "item": "https://racan-ai.vercel.app/about"
        }
      ]
    };
    
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbData);
    document.head.appendChild(breadcrumbScript);
    
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(breadcrumbScript);
      // Reset title when leaving page
      document.title = 'Racan AI - AI-Powered Fashion Assistant & Ecommerce Platform';
    };
  }, []);

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
      {/* SEO-friendly semantic structure */}
      <header>
        <Navbar />
      </header>
      
      <main>
        {/* Hero Section */}
        <section 
          ref={sectionRef}
          className="relative pt-32 pb-16 bg-gradient-to-br from-[#004AAD]/5 to-[#973cff]/5 overflow-hidden"
          aria-labelledby="about-hero-title"
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
                <nav aria-label="Breadcrumb" className="mb-8">
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="inline-flex items-center gap-2 text-[#004AAD] hover:text-[#973cff] transition-colors duration-300"
                    aria-label="Go back to home page"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                  </button>
                </nav>
                
                <h1 id="about-hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#004AAD] mb-6">
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
        <section className="py-16 md:py-24 bg-gray-900" aria-labelledby="mission-title">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className={`transform transition-all duration-1000 delay-200 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}>
                  <h2 id="mission-title" className="text-3xl md:text-4xl font-bold text-white mb-6">About Racan</h2>
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
                      alt="Fashion AI Technology - AI-powered styling and recommendations"
                      className="w-full h-80 object-cover rounded-sm shadow-2xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#004AAD]/20 to-transparent rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef} className="py-16 md:py-24 relative overflow-hidden" aria-labelledby="team-title">
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
                <h2 id="team-title" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Meet Our Team
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {teamMembers.map((member, index) => (
                  <article
                    key={member.id}
                    className={`group text-center transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                      teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {/* Profile Image */}
                    <div className="relative mb-4 mx-auto">
                      <div className="w-32 h-32 md:w-40 md:h-40 mx-auto overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 relative" style={{ borderRadius: '1px' }}>
                        <img
                          src={member.image}
                          alt={`${member.name} - ${member.role} at Racan AI`}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400';
                          }}
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Hover border effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderRadius: '1px' }}></div>
                      </div>
                    </div>
                    
                    {/* Name and Role */}
                    <div className="text-left">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 group-hover:text-[#004AAD] transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base mb-3 group-hover:text-gray-800 transition-colors duration-300">
                        {member.role}
                      </p>
                      
                      {/* Social Links */}
                      <div className="flex justify-start">
                        {member.linkedin && member.linkedin !== "#" ? (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 bg-gray-900 text-white hover:bg-[#004AAD] transition-all duration-300 transform hover:scale-110"
                            aria-label={`View ${member.name}'s LinkedIn profile`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </a>
                        ) : member.website ? (
                          <a
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 bg-gray-900 text-white hover:bg-[#004AAD] transition-all duration-300 transform hover:scale-110"
                            aria-label={`Visit ${member.name}'s website`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </a>
                        ) : (
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500" aria-hidden="true">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#004AAD] to-[#973cff]" aria-labelledby="cta-title">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 id="cta-title" className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Style?
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Join thousands of users who have already discovered their perfect style with Racan AI.
              </p>
              <a
                href="https://chat-with-racan.vercel.app"
                className="inline-block bg-white text-[#004AAD] px-8 py-4 rounded-sm text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                aria-label="Try Racan AI Fashion Assistant"
              >
                Try Racan AI Now
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AboutUs;