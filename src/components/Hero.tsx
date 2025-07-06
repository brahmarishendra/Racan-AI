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
          background: #f8f9fa;
          min-height: 70vh;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content-card {
          background: white;
          border-radius: 24px;
          padding: 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .main-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 500px;
        }

        .left-content {
          padding: 40px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .right-content {
          background: #f8f9fa;
          position: relative;
          overflow: hidden;
        }

        .fashion-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          height: 100%;
          gap: 12px;
          padding: 12px;
        }

        .fashion-card {
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          background: white;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
          background: linear-gradient(135deg, rgba(255, 51, 102, 0.8), rgba(151, 60, 255, 0.8));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          font-weight: bold;
        }

        .stats-section {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 32px;
        }

        .stat-item {
          text-align: left;
        }

        .stat-number {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          line-height: 1;
        }

        .stat-label {
          font-size: 10px;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
          max-width: 200px;
        }

        .floating-elements {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          gap: 6px;
        }

        .floating-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff3366;
        }

        .floating-dot:nth-child(2) {
          background: #973cff;
        }

        .floating-dot:nth-child(3) {
          background: #00d4aa;
        }

        /* Tablet Styles */
        @media (max-width: 1024px) {
          .hero-container {
            min-height: 60vh;
            padding: 16px;
          }
          
          .main-content {
            min-height: 450px;
          }
          
          .left-content {
            padding: 32px 40px;
          }
          
          .stats-section {
            gap: 20px;
            margin-top: 24px;
          }
          
          .stat-number {
            font-size: 24px;
          }
          
          .stat-label {
            font-size: 9px;
          }
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .hero-container {
            min-height: auto;
            padding: 12px;
          }
          
          .main-content {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          
          .left-content {
            padding: 32px 24px;
            order: 1;
          }
          
          .right-content {
            order: 2;
            min-height: 300px;
          }
          
          .fashion-grid {
            padding: 8px;
            gap: 8px;
          }
          
          .stats-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-top: 20px;
          }
          
          .stat-item {
            width: 100%;
          }
          
          .stat-number {
            font-size: 20px;
          }
          
          .stat-label {
            font-size: 8px;
            max-width: 100%;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .hero-container {
            padding: 8px;
          }
          
          .left-content {
            padding: 24px 20px;
          }
          
          .right-content {
            min-height: 250px;
          }
          
          .fashion-grid {
            padding: 6px;
            gap: 6px;
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
                  fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                  fontWeight: '700',
                  lineHeight: '1.1',
                  color: '#333',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em'
                }}>
                  Redefine Your<br />
                  Style With<br />
                  <span style={{ color: '#ff3366' }}>Racan</span>
                </h1>
              </div>

              <div className="animate-fade-in-up animation-delay-300">
                <div style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                  color: '#333',
                  marginBottom: '6px',
                  fontWeight: '600'
                }}>
                  AI-powered assistant + Fashion
                </div>
                <div style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                  color: '#333',
                  marginBottom: '24px',
                  fontWeight: '600'
                }}>
                  Ecommerce
                </div>
              </div>

              <div className="animate-fade-in-up animation-delay-600">
                <p style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  color: '#6c757d',
                  lineHeight: '1.6',
                  marginBottom: '32px',
                  maxWidth: '380px'
                }}>
                  Experience the future of fashion with AI-powered Fashion assistant Ecommerce, 
                  personalized recommendations that match your unique taste.
                </p>

                <a
                  href="https://chat-with-racan.vercel.app"
                  style={{
                    background: '#ff3366',
                    color: 'white',
                    padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#d70153';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#ff3366';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Try Racan →
                </a>
              </div>

              {/* Stats Section */}
              <div className="stats-section animate-fade-in-up animation-delay-600">
                <div className="stat-item">
                  <div className="stat-number">150K+</div>
                  <div className="stat-label">
                    ART COMMUNITY, WHERE ARTISTS FROM<br />
                    AROUND THE WORLD UNITE TO CELEBRATE<br />
                    CREATIVITY, EXCHANGE IDEAS, AND ELEVATE<br />
                    THEIR CRAFT THROUGH SHARED INSPIRATION.
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: 'clamp(40px, 8vw, 50px)',
                    height: 'clamp(40px, 8vw, 50px)',
                    border: '2px solid #ddd',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(8px, 1.5vw, 10px)',
                    color: '#6c757d'
                  }}>
                    #1 SPACE
                  </div>
                  <div style={{ fontSize: 'clamp(8px, 1.5vw, 10px)', color: '#6c757d' }}>
                    COLLABORATIVE CREATIVE NETWORK
                  </div>
                </div>
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
                {/* Large Fashion Video/GIF */}
                <div className="fashion-card large">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  >
                    <source src="https://v1.pinimg.com/videos/mc/720p/11/37/4c/11374cc3bc5445df07f758ae4dc481aa.mp4" type="video/mp4" />
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
                  background: '#f0f0f0',
                  position: 'relative'
                }}>
                  <img 
                    src="https://i.pinimg.com/736x/54/a1/e3/54a1e32c53c93895bc44239a351dc2bf.jpg" 
                    alt="Fashion Model 1"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="ai-overlay">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', marginBottom: '4px' }}>AI</div>
                      <div style={{ fontSize: '10px', opacity: '0.9' }}>POWERED</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional floating elements */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                background: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: 'clamp(8px, 1.5vw, 9px)',
                color: '#6c757d'
              }}>
                <div style={{ fontWeight: '600', color: '#333', marginBottom: '2px' }}>STYLE MATCH</div>
                <div>98% ACCURACY</div>
              </div>
              
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '16px',
                background: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: 'clamp(8px, 1.5vw, 9px)',
                color: '#6c757d'
              }}>
                <div style={{ fontWeight: '600', color: '#333', marginBottom: '2px' }}>WARDROBE</div>
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