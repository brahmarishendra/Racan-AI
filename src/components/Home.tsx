import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Features from './Features';
import Products from './Products';
import Footer from './Footer';
import HowItWorks from './HowItWorks';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import FAQ from './FAQ';

function App() {
  // Add structured data for the homepage
  React.useEffect(() => {
    // Update page title dynamically
    document.title = 'Racan AI - AI Fashion Assistant & Ecommerce Platform';
    
    // Add FAQ structured data
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Racan AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Racan AI is an AI-powered fashion assistant and ecommerce platform that provides personalized outfit recommendations based on your style preferences, body type, and lifestyle. Our advanced artificial intelligence technology analyzes your fashion choices to deliver smart wardrobe solutions."
          }
        },
        {
          "@type": "Question",
          "name": "How does AI-powered styling work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our AI analyzes your preferences, body measurements, skin tone, and style history to recommend outfits that match your unique taste and look great on you. The system learns from your choices to provide increasingly personalized fashion recommendations."
          }
        },
        {
          "@type": "Question",
          "name": "Is Racan AI free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Racan AI offers free access to basic styling recommendations and wardrobe management features. Premium features and advanced ecommerce integration may require a subscription for enhanced personalization."
          }
        },
        {
          "@type": "Question",
          "name": "Can I shop for clothes through Racan AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Racan AI includes an integrated ecommerce platform where you can purchase recommended items directly through our fashion partners. We curate products from trusted retailers to ensure quality and style consistency."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate are the AI fashion recommendations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our AI fashion recommendations achieve 98% accuracy in style matching based on user feedback and preferences. The system continuously learns and improves its suggestions based on your interactions and fashion choices."
          }
        },
        {
          "@type": "Question",
          "name": "What makes Racan AI different from other fashion apps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Racan AI combines advanced artificial intelligence with character-based styling, smart wardrobe management, and seamless ecommerce integration. Our unique approach considers your personality, lifestyle, and body type for truly personalized fashion recommendations."
          }
        }
      ]
    };
    
    // Add FAQ structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqStructuredData);
    document.head.appendChild(script);
    
    // Cleanup function
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      {/* SEO-friendly semantic HTML structure */}
      <header>
        <Navbar />
      </header>
      
      <main>
        <section aria-label="Hero section">
          <Hero />
        </section>
        
        <section aria-label="About Racan AI">
          <About />
        </section>

        <section aria-label="How it works">
          <HowItWorks />
        </section>
        
        <section aria-label="Features and capabilities">
          <Features />
        </section>

        <section aria-label="Why choose us">
          <WhyChooseUs />
        </section>

        <section aria-label="Customer testimonials">
          <Testimonials />
        </section>
        
        <section aria-label="Products and services">
          <Products />
        </section>

        <section aria-label="Frequently asked questions">
          <FAQ />
        </section>
      </main>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

// SEO metadata for the homepage
export const metadata = {
  title: 'Racan AI - AI Fashion Assistant & Ecommerce Platform',
  description: 'Transform your style with Racan AI. Get personalized outfit recommendations and smart wardrobe management with our AI fashion assistant.',
  keywords: 'AI fashion assistant, fashion AI, personalized styling, smart wardrobe, fashion ecommerce, outfit recommendations, style AI, fashion technology, virtual stylist, AI shopping assistant',
  openGraph: {
    title: 'Racan AI - AI Fashion Assistant & Ecommerce Platform',
    description: 'Transform your style with Racan AI. Get personalized outfit recommendations and smart wardrobe management with our AI fashion assistant.',
    images: ['https://racan-ai.vercel.app/logo.png'],
    url: 'https://racan-ai.vercel.app/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Racan AI - AI Fashion Assistant & Ecommerce Platform',
    description: 'Transform your style with Racan AI. Get personalized outfit recommendations and smart wardrobe management with our AI fashion assistant.',
    images: ['https://racan-ai.vercel.app/logo.png'],
  },
  alternates: {
    canonical: 'https://racan-ai.vercel.app/',
  },
};

export default App;