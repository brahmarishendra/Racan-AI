import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';


const Features: React.FC = () => {
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
      category: "Hiring",
      title: "🚀 Racan AI x DreamX Is Hiring: Frontend Developer Intern",
      description: "We're on the lookout for passionate Frontend Development Interns to collaborate with us on our cutting-edge DreamX product and the Racan AI.",
      image: "https://i.postimg.cc/MKgw8rCf/Whats-App-Image-2025-06-25-at-22-33-39-2e1c8160.jpg",
      link: "https://techcrunch.com/ai-fashion"
    },
    {
      id: 2,
      category: "Fashion",
      title: "A great Our story always starts with modern dresses",
      description: "In the fast-paced world of fashion, it's easy to get lost in the trends. But at VINDOF, we believe in something different.",
      image: "https://vindof.com/cdn/shop/articles/vindof-casualwear-blog.jpg?v=1749550789&width=1000",
      link: "https://vindof.com/blogs/news/a-great-our-story-always-starts-with-modern-dresses"
    },
    {
      id: 3,
      category: "Tech",
      title: "Smart Wardrobe Integration: The Future is Here",
      description: "Learn how Racan AI seamlessly connects with your existing wardrobe to create endless styling possibilities.",
      image: "https://cdn.shopify.com/s/files/1/0708/3340/6189/files/image_49_1.png?v=1736421252",
      link: "https://www.vogue.com/article/smart-wardrobe-technology"
    }
  ];


  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'right'
        ? scrollLeft + clientWidth / 2
        : scrollLeft - clientWidth / 2;

      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

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

      {/* Light Mode Section for News & Blogs */}
      <section className="py-24 bg-[#f5f6eaff] overflow-hidden hide-scrollbar">
        <div className="max-w-7xl mx-auto px-4">
          {/* News & Blogs (Light Mode) */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div>
                <span className="text-black font-black text-xs uppercase tracking-widest mb-2 block">INSIDE PERSPECTIVE</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Latest from the Runway</h2>
              </div>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '#'}
                  className="bg-black text-white px-6 py-2 rounded-md font-bold text-[10px] tracking-widest uppercase hover:bg-gray-900 transition-all shadow-lg"
                >
                  VIEW ALL
                </motion.button>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => scroll('left')}
                    className="p-3 rounded-md border border-gray-300 transition-all bg-white text-black shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => scroll('right')}
                    className="p-3 rounded-md border border-gray-300 transition-all bg-white text-black shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <div
              ref={scrollContainerRef}
              className="overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0"
            >
              <motion.div
                className="flex gap-8"
              >
                {newsItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group flex-shrink-0 w-[85vw] md:w-[calc(33.333%-1.33rem)] snap-center flex flex-col"
                  >
                    <div className="aspect-[4/3] overflow-hidden mb-6">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                      <span className="bg-black text-white px-4 py-1.5 rounded-md font-bold text-[10px] tracking-widest uppercase shadow-md">{item.category}</span>
                      {/*
                         <h4 className="text-2xl font-black text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">{item.title}</h4> 
                         */}
                      <p className="text-base text-gray-600 font-medium leading-relaxed line-clamp-2">{item.title}</p>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="bg-black text-white px-5 py-2 rounded-md font-bold text-[10px] tracking-widest uppercase hover:bg-gray-900 transition-all mt-2 shadow-md flex items-center gap-2"
                      >
                        READ MORE <ArrowRight className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
