import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';


const Features: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const newsItems = [
    {
      id: 1,
      title: "🚀 Racan AI x DreamX Is Hiring: Frontend Developer Intern",
      description: "We're on the lookout for passionate Frontend Development Interns to collaborate with us on our cutting-edge DreamX product and the Racan AI.",
      image: "https://i.postimg.cc/MKgw8rCf/Whats-App-Image-2025-06-25-at-22-33-39-2e1c8160.jpg",
      link: "https://techcrunch.com/ai-fashion"
    },
    {
      id: 2,
      title: "A great Our story always starts with modern dresses",
      description: "In the fast-paced world of fashion, it's easy to get lost in the trends. But at VINDOF, we believe in something different.",
      image: "https://vindof.com/cdn/shop/articles/vindof-casualwear-blog.jpg?v=1749550789&width=1000",
      link: "https://vindof.com/blogs/news/a-great-our-story-always-starts-with-modern-dresses"
    },
    {
      id: 3,
      title: "Smart Wardrobe Integration: The Future is Here",
      description: "Learn how Racan AI seamlessly connects with your existing wardrobe to create endless styling possibilities.",
      image: "https://cdn.shopify.com/s/files/1/0708/3340/6189/files/image_49_1.png?v=1736421252",
      link: "https://www.vogue.com/article/smart-wardrobe-technology"
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % newsItems.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);

  const features = [
    {
      id: "01",
      title: "AI-Powered Styling",
      description: "Get personalized outfit recommendations based on your style preferences.",
      image: "https://i.postimg.cc/VvypZYJt/ddf.png",
      color: "blue"
    },
    {
      id: "02",
      title: "Character Selection",
      description: "Pick your character and get style recommendations that match their vibe.",
      image: "https://majestic-halva-16882d.netlify.app/image-9.png",
      color: "purple"
    },
    {
      id: "03",
      title: "Smart Wardrobe Assistant",
      description: "Organize your closet and create new outfit combinations with AI assistance.",
      image: "https://majestic-halva-16882d.netlify.app/image-10.png",
      color: "pink"

    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      <section
        id="features"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="py-24 bg-[#011F18] overflow-hidden relative group"
      >
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Dynamic Mouse Tracking Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.2), transparent 40%)`,
            transition: 'opacity 0.3s ease'
          }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-8 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-blue-400 font-bold text-xs tracking-widest uppercase">Features</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.9] max-w-4xl">
              The only AI styling engine <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">developed for you.</span>
            </h2>
          </motion.div>

          {/* Feature Cards Section (Dark Mode) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="group/card relative flex flex-col"
              >
                {/* Number Label */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-lg font-bold text-gray-500 font-mono group-hover/card:text-blue-400 transition-colors">{feature.id}</span>
                  <div className="h-px bg-white/10 flex-grow group-hover/card:bg-[#D4FF00] transition-colors"></div>
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-white/5 backdrop-blur-xl  border border-white/10 p-8 transition-colors duration-500 hover:bg-white/10 hover:border-blue-500/20 h-full flex flex-col relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

                  <div className="aspect-[4/3]  overflow-hidden mb-8 relative z-10">
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6 flex-grow relative z-10">{feature.description}</p>

                  <a href="#" className="inline-flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors relative z-10">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Light Mode Section for Demo */}
      <section className="py-24 bg-[#011F18] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* Demo Section (Restyled 40/60 Split) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-2xl bg-white"
          >
            {/* Left Content Column */}
            <div className="w-full md:w-[40%] bg-[#001529] p-12 flex flex-col justify-center text-white">
              <h3 className="text-3xl md:text-4xl font-black mb-6">Experience <span className="text-blue-400">Racan AI</span> in Action</h3>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">Watch how our deep-learning styling engine transforms a simple prompt into a perfectly curated fashion look.</p>
              <button
                onClick={() => window.location.href = 'https://chat-with-racan.vercel.app'}
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-all transform hover:-translate-y-1 shadow-xl cursor-pointer border-none w-fit"
              >
                Try Racan AI Demo
              </button>
            </div>

            {/* Right Video Column */}
            <div className="w-full md:w-[60%] bg-black relative min-h-[400px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source
                  src="https://images.pexels.com/videos/3120935/free-video-3120935.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Futuristic Section */}


      {/* Light Mode Section for News & Blogs */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* News & Blogs (Light Mode) */}
          <div>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-4 block">Inside Perspective</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900">Latest from the Runway</h2>
              </div>
              <div className="flex gap-4">
                <button onClick={prevSlide} className="p-4 rounded-full border border-gray-200 hover:bg-gray-50 transition-all bg-white"><ChevronLeft className="w-6 h-6" /></button>
                <button onClick={nextSlide} className="p-4 rounded-full border border-gray-200 hover:bg-gray-50 transition-all bg-white"><ChevronRight className="w-6 h-6" /></button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {newsItems.map((item, idx) => (
                <a
                  key={item.id}
                  href={item.link}
                  className={`group bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${idx === currentSlide ? 'ring-2 ring-blue-500 md:ring-0' : ''}`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
