import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ScrollReveal from './ScrollReveal';
import About from './About';
import Features from './Features';
import Products from './Products';
import Footer from './Footer';

function App() {
  // Add structured data for the homepage
  React.useEffect(() => {
    // Update page title dynamically
    document.title = 'Racan AI - AI-Powered Fashion Assistant & Ecommerce Platform';

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
            "text": "Racan AI is an AI-powered fashion assistant and ecommerce platform that provides personalized outfit recommendations based on your style preferences, body type, and lifestyle."
          }
        },
        {
          "@type": "Question",
          "name": "How does AI-powered styling work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our AI analyzes your preferences, body measurements, skin tone, and style history to recommend outfits that match your unique taste and look great on you."
          }
        },
        {
          "@type": "Question",
          "name": "Is Racan AI free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Racan AI offers free access to basic styling recommendations. Premium features and ecommerce integration may require a subscription."
          }
        },
        {
          "@type": "Question",
          "name": "Can I shop for clothes through Racan AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Racan AI includes an integrated ecommerce platform where you can purchase recommended items directly through our fashion partners."
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

        <ScrollReveal
          text="The biggest AI fashion platform that learns your style, analyzes your body measurements, and recommends outfits that make you look your absolute best, every single day."
        />

        <section aria-label="About Racan AI">
          <About />
        </section>

        <section aria-label="Features and capabilities">
          <Features />
        </section>

        <section aria-label="Products and services">
          <Products />
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
  title: 'Racan AI - AI-Powered Fashion Assistant & Ecommerce Platform',
  description: 'Transform your style with Racan AI - the revolutionary AI-powered fashion assistant and ecommerce platform. Get personalized outfit recommendations and discover your perfect fashion identity.',
  keywords: 'AI fashion assistant, fashion AI, personalized styling, smart wardrobe, fashion ecommerce, outfit recommendations, style AI, fashion technology, virtual stylist, AI shopping assistant',
  openGraph: {
    title: 'Racan AI - AI-Powered Fashion Assistant & Ecommerce Platform',
    description: 'Transform your style with Racan AI - the revolutionary AI-powered fashion assistant and ecommerce platform.',
    images: ['https://racan-ai.vercel.app/logo.png'],
    url: 'https://racan-ai.vercel.app/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Racan AI - AI-Powered Fashion Assistant & Ecommerce Platform',
    description: 'Transform your style with Racan AI - the revolutionary AI-powered fashion assistant and ecommerce platform.',
    images: ['https://racan-ai.vercel.app/logo.png'],
  },
  alternates: {
    canonical: 'https://racan-ai.vercel.app/',
  },
};

export default App;