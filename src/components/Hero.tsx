import React from 'react';

function Hero() {
  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .hero-container {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%);
          background-size: 400% 400%;
          animation: gradientShift 20s ease infinite;
          min-height: 100vh;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(0, 212, 170, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .content-card {
          border-radius: 24px;
          padding: 0;
          overflow: hidden;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        .main-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 320px;
          max-width: 100%;
          margin: 0;
          padding: 0;
          gap: 25px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .left-content {
          padding: 50px 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          position: relative;
        }

        .left-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 212, 170, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%);
          pointer-events: none;
        }

        .right-content {
          background: rgba(15, 23, 42, 0.3);
          backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .fashion-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          height: 100%;
          gap: 10px;
          padding: 10px;
        }

        .fashion-card {
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .fashion-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 212, 170, 0.2);
        }

        .fashion-card img, .fashion-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fashion-card.large {
          grid-row: span 2;
          border-radius: 12px;
        }

        .ai-overlay {
          position: absolute;
          inset: 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          font-weight: bold;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(5px);
        }

        .stats-section {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-top: 35px;
        }

        .stat-item {
          text-align: left;
        }

        .stat-number {
          font-size: 26px;
          font-weight: 700;
          color: #00d4aa;
          line-height: 1;
        }

        .stat-label {
          font-size: 10px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
          max-width: 200px;
        }

        .floating-elements {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          gap: 4px;
        }

        .floating-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00d4aa;
          animation: float 3s ease-in-out infinite;
        }

        .floating-dot:nth-child(2) {
          background: #0ea5e9;
          animation-delay: 0.5s;
        }

        .floating-dot:nth-child(3) {
          background: #a855f7;
          animation-delay: 1s;
        }

        .dream-store-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .dream-store-link:hover {
          transform: translateY(-2px);
        }

        .dream-store-image {
          width: clamp(40px, 8vw, 50px);
          height: clamp(40px, 8vw, 50px);
          border-radius: 50px;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
          transition: all 0.3s ease;
          border: 2px solid rgba(0, 212, 170, 0.3);
        }

        .dream-store-link:hover .dream-store-image {
          box-shadow: 0 8px 20px rgba(0, 212, 170, 0.5);
          transform: scale(1.05);
        }

        .gradient-text {
          background: linear-gradient(135deg, #00d4aa 0%, #0ea5e9 50%, #a855f7 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }

        .cta-button {
          background: linear-gradient(135deg, #00d4aa 0%, #0ea5e9 100%);
          color: white;
          padding: clamp(10px, 1.8vw, 14px) clamp(20px, 3.5vw, 28px);
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          font-size: clamp(0.85rem, 1.8vw, 0.95rem);
          display: inline-block;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 212, 170, 0.3);
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 212, 170, 0.4);
        }

        /* Desktop-specific spacing adjustments */
        @media (min-width: 1024px) {
          .main-content {
            gap: 25px;
            grid-template-columns: 1fr 1fr;
            min-height: 320px;
          }

          .hero-container {
            margin-bottom: 20px;
            padding: 0 40px;
          }

          .left-content {
            padding: 50px 60px;
          }

          .stats-section {
            gap: 30px;
            margin-top: 35px;
          }
        }

        /* Tablet Styles */
        @media (max-width: 1024px) and (min-width: 769px) {
          .hero-container {
            min-height: 90vh;
            padding: 0 30px;
            margin-top: 85px;
            margin-bottom: 20px;
          }
          
          .content-card {
            max-width: 95vw;
            margin: 0 auto;
          }

          .main-content {
            min-height: 300px;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }

          .left-content {
            padding: 35px 40px;
          }

          .stats-section {
            gap: 20px;
            margin-top: 25px;
          }
          
          .stat-number {
            font-size: 22px;
          }
          
          .stat-label {
            font-size: 9px;
          }

          .fashion-grid {
            gap: 8px;
            padding: 8px;
          }
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .hero-container {
            min-height: 100vh;
            padding: 0 15px;
            margin-top: 60px;
            margin-bottom: 20px;
          }
          
          .content-card {
            margin-top: 0;
            max-width: 100vw;
            margin: 0;
            border-radius: 16px;
          }
          
          .main-content {
            grid-template-columns: 1fr;
            min-height: auto;
            gap: 0;
          }
          
          .left-content {
            padding: 30px 20px;
            order: 1;
            text-align: center;
            align-items: center;
          }
          
          .right-content {
            order: 2;
            min-height: 180px;
          }
          
          .fashion-grid {
            padding: 6px;
            gap: 6px;
          }
          
          .stats-section {
            flex-direction: column;
            align-items: center;
            gap: 15px;
            margin-top: 20px;
          }
          
          .stat-item {
            width: 100%;
            text-align: center;
          }
          
          .stat-number {
            font-size: 18px;
          }
          
          .stat-label {
            font-size: 8px;
            max-width: 100%;
          }

          .dream-store-link {
            justify-content: center;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .hero-container {
            padding: 0 10px;
            margin-top: 80px;
            margin-bottom: 20px;
          }
          
          .left-content {
            padding: 25px 15px;
          }
          
          .right-content {
            min-height: 160px;
          }
          
          .fashion-grid {
            padding: 4px;
            gap: 4px;
          }

          .content-card {
            border-radius: 12px;
          }
        }
      `}</style>
      
      <section className="hero-container">
        <div className="content-card">
          {/* Main Content */}
          <div className="main-content">
            
            {/* Left Content */}
            <div className="left-content">
              <div className="animate-fade-in-up">
                <h1 style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                  fontWeight: '700',
                  lineHeight: '1.1',
                  color: '#e2e8f0',
                  marginBottom: '18px',
                  letterSpacing: '-0.02em'
                }}>
                  Redefine Your<br />
                  Style With<br />
                  <span className="gradient-text">Racan AI</span>
                </h1>
              </div>

              <div className="animate-fade-in-up animation-delay-300">
                <div style={{
                  fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                  color: '#00d4aa',
                  marginBottom: '5px',
                  fontWeight: '600'
                }}>
                  AI-powered assistant + Fashion
                </div>
                <div style={{
                  fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                  color: '#00d4aa',
                  marginBottom: '20px',
                  fontWeight: '600'
                }}>
                  Ecommerce
                </div>
              </div>

              <div className="animate-fade-in-up animation-delay-600">
                <p style={{
                  fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
                  color: '#94a3b8',
                  lineHeight: '1.5',
                  marginBottom: '25px',
                  maxWidth: '350px'
                }}>
                  Experience the future of fashion with AI-powered Fashion assistant Ecommerce, 
                  personalized recommendations that match your unique taste.
                </p>

                <button
                  onClick={() => window.location.href = 'https://chat-with-racan.vercel.app'}
                  className="cta-button"
                >
                  Try Racan →
                </button>
              </div>

              {/* Stats Section */}
              <div className="stats-section animate-fade-in-up animation-delay-600">
                <div className="stat-item">
                  <div className="stat-number">150K+</div>
                  <div className="stat-label">
                    USERS TRANSFORMED
                  </div>
                </div>
                
                <a 
                  href="https://dreamxworld.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="dream-store-link"
                >
                  <img
                    src="https://i.postimg.cc/15mjf5Cn/Instagram-post-1.png"
                    alt="Dream Store"
                    className="dream-store-image"
                  />
                  <div style={{ fontSize: 'clamp(12px, 1.3vw, 9px)', color: '#94a3b8' }}>
                    Partner with DreamX Store
                  </div>
                </a>
              </div>
            </div>

            {/* Right Content - Fashion Images/Video */}
            <div className="right-content">
              <div className="floating-elements">
                <div className="floating-dot"></div>
                <div className="floating-dot"></div>
                <div className="floating-dot"></div>
              </div>
              
              <div className="fashion-grid">
                {/* Large Fashion Video */}
                <div className="fashion-card large">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  >
                    <source src="https://packaged-media.redd.it/eocwyp64008f1/pb/m2-res_640p.mp4?m=DASHPlaylist.mpd&v=1&e=1750406400&s=786f2e47ec0a6a250d567c672b5f266cf682a784" type="video/mp4" />
                  </video>
                </div>
                
                {/* Top Right Fashion Image */}
                <div className="fashion-card">
                  <img 
                    src="https://i.pinimg.com/736x/d1/a7/90/d1a790aae1206557418eba5e0638223e.jpg" 
                    alt="Fashion Model 2"
                  />
                </div>
                
                {/* Bottom Right - AI Element with Overlay */}
                <div className="fashion-card" style={{ 
                  background: 'rgba(15, 23, 42, 0.8)',
                  position: 'relative'
                }}>
                  <img 
                    src="https://i.pinimg.com/736x/54/a1/e3/54a1e32c53c93895bc44239a351dc2bf.jpg" 
                    alt="Fashion Model 1"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="ai-overlay">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', marginBottom: '3px', color: '#00d4aa' }}>AI</div>
                      <div style={{ fontSize: '8px', opacity: '0.9', color: '#e2e8f0' }}>POWERED</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional floating elements */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: 'clamp(7px, 1.3vw, 8px)',
                color: '#94a3b8'
              }}>
                <div style={{ fontWeight: '600', color: '#00d4aa', marginBottom: '1px' }}>STYLE MATCH</div>
                <div>98% ACCURACY</div>
              </div>
              
              <div style={{
                position: 'absolute',
                top: '45%',
                right: '12px',
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: 'clamp(7px, 1.3vw, 8px)',
                color: '#94a3b8'
              }}>
                <div style={{ fontWeight: '600', color: '#00d4aa', marginBottom: '1px' }}>WARDROBE</div>
                <div>SMART AI</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;