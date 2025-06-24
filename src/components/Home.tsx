import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import VideoSection from './VideoSection';
import About from './About';
import Features from './Features';
import Products from './Products';
import Footer from './Footer';
import Signup from './Signup';
import Login from './Login';

 
function App() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <VideoSection />
      <About />
      <Features />
      <Products />
      <Footer />
    </div>
  );
}

export const metadata = {
  title: 'Racan AI Fashion Assistant',
  description: 'Experience the future of fashion with AI recommendations.',
  openGraph: {
    images: ['https://racan-ai.vercel.app/logo.png'],
  },
};


export default App;