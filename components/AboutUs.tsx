import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs: React.FC = () => {
  // SEO and Head updates
  useEffect(() => {
    document.title = 'About Racan AI - Meet Our Team & Mission | AI Fashion Assistant';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Racan AI\'s mission to revolutionize fashion with AI technology. Meet our team of experts dedicated to providing personalized style recommendations.');
    }

    const aboutPageStructuredData = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Racan AI",
      "description": "Learn about Racan AI's mission and meet our expert team.",
      "url": "https://racan-ai.vercel.app/about",
      "mainEntity": {
        "@type": "Organization",
        "name": "Racan AI",
        "employee": [
          { "@type": "Person", "name": "Kesari Brahmarishendra", "jobTitle": "Co-founder" },
          { "@type": "Person", "name": "Th Trisa Singha", "jobTitle": "Project Manager" },
          { "@type": "Person", "name": "Sai Deepak Ambati", "jobTitle": "AI Automation" },
          { "@type": "Person", "name": "Amy Zanatta", "jobTitle": "Fashion Stylist" }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(aboutPageStructuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      document.title = 'Racan AI - AI-Powered Fashion Assistant & Ecommerce Platform';
    };
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Kesari Brahmarishendra",
      role: "Co-founder",
      image: "https://i.postimg.cc/Hxh5hDFw/1740918461489.jpg",
    },
    {
      id: 2,
      name: "Th Trisa Singha",
      role: "Project Manager",
      image: "https://i.postimg.cc/3wgq1VBG/Risa.png",
    },
    {
      id: 3,
      name: "Sai Deepak Ambati",
      role: "AI Automation & Workflow",
      image: "https://i.postimg.cc/25C9649n/Whats-App-Image-2025-09-16-at-22-48-59-3206fc85.jpg",
    },
    {
      id: 4,
      name: "Amy Zanatta",
      role: "Fashion Stylist",
      image: "https://stylewithingrace.com/wp-content/uploads/2024/01/New-About-Page-Photo-2024.png",
    }
  ];

  return (
    <div className="bg-[#CBFE00] text-black selection:bg-black selection:text-[#CBFE00] min-h-screen font-sans">
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        /* Selective Navbar Overrides for About Us Page */
        header.bg-transparent nav a, 
        header.bg-transparent nav button {
          color: black !important;
        }
        header.bg-transparent nav a:hover, 
        header.bg-transparent nav button:hover {
          color: black !important;
          opacity: 0.7;
        }
        /* Override underlines for these specific nav items to be black */
        header.bg-transparent nav span.bg-\[\#D4FF00\] {
          background-color: black !important;
        }
        /* Override active/dropdown states for these specific nav items to be black */
        header.bg-transparent nav .text-\[\#D4FF00\],
        header.bg-transparent nav .text-\[\#D4FF00\] svg {
          color: black !important;
        }
      `}</style>
      <Navbar />

      <main className="pt-32 px-6 lg:px-12 max-w-[1600px] mx-auto overflow-x-hidden">
        {/* Hero Section */}
        <section className="mb-32 max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.2] tracking-tight mb-12">
            Your style is your signature. We help you turn uncertainty into expression.
            We bring AI-driven precision and human intuition, so you can own your look and walk with absolute confidence.
          </h1>
        </section>

        {/* Theme Image Section */}
        <section className="mb-48 relative h-[60vh] md:h-[80vh] overflow-hidden group">
          <div className="w-full h-full">
            <img
              src="https://i.pinimg.com/originals/d6/0b/f6/d60bf60d6b626116dadf3cf6f255381b.gif"
              alt="Racan AI Brand Theme"
              className="w-full h-full object-cover transition-all duration-1000"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-12 left-12 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2">The Aesthetic</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Style with Racan AI</h2>
          </div>
        </section>

        {/* Team Grid */}
        <section className="mb-48">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-black/5 mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="text-base font-bold mb-1">{member.name}</h3>
                <p className="text-[11px] font-normal uppercase tracking-wider text-black">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Content Blocks */}
        <section className="py-32 border-t border-black/10">
          <div className="grid md:grid-cols-2 gap-24">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-12">
                From trends <br /> to timelessness
              </h2>
            </div>
            <div className="space-y-24">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] mb-8">Style starts with measuring essence</p>
                <p className="text-xl md:text-3xl leading-[1.3] text-black font-normal tracking-tight">
                  We take a deep, data-driven approach to deciphering your unique aesthetic DNA. Our AI doesn't just suggest outfits; it predicts the moments where you'll feel your most powerful.
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] mb-8">Curated with Intention</p>
                <p className="text-xl md:text-3xl leading-[1.3] text-black font-normal tracking-tight">
                  The Racan AI experience is a collaborative journey. We provide the vision, ensuring every recommendation feels like a deliberate reflection of your identity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-32 border-t border-black/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="max-w-md">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-8">
              Vision. Built. Together. <br />
              Own your expression, lead with style.
            </h2>
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:gap-4 transition-all group border-none bg-transparent cursor-pointer p-0">
              Transform Your Look <ArrowUpRight className="w-3 h-3 group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </section>

        {/* Contact Footer Section */}
        <div className="py-24 -mx-6 lg:-mx-12 bg-black mt-20">
          <a href="mailto:contact@racanai.com" className="block text-center whitespace-nowrap">
            <h1 className="text-[12vw] font-black text-[#CBFE00] leading-none tracking-tighter hover:italic transition-all cursor-pointer">
              Contact Us
            </h1>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
