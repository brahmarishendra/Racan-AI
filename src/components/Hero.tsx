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

        .main-container {
          background: #f8f9fa;
          min-height: 100vh;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content-card {
          background: white;
          border-radius: 1px;
          padding: 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 100%;
          max-width: 1200px;
          height: auto;
          max-height: 80vh;
        }

        .main-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 500px;
        }

        .left-content {
          padding: 40px;
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
          border-radius: 1px;
          overflow: hidden;
          position: relative;
          background: white;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .fashion-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fashion-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fashion-card.large {
          grid-row: span 2;
        }

        .stats-section {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 30px;
        }

        .stat-item {
          text-align: left;
        }

        .stat-number {
          font-size: 24px;
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
          top: 15px;
          right: 15px;
          display: flex;
          gap: 6px;
        }

        .floating-dot {
          width: 6px;
          height: 6px;
          border-radius: 1px;
          background: #ff3366;
        }

        .floating-dot:nth-child(2) {
          background: #973cff;
        }

        .floating-dot:nth-child(3) {
          background: #00d4aa;
        }

        .info-card {
          position: absolute;
          background: white;
          padding: 8px 12px;
          border-radius: 1px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-size: 9px;
          color: #6c757d;
        }

        .info-card-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 2px;
          font-size: 10px;
        }

        @media (max-width: 1024px) {
          .content-card {
            max-width: 900px;
            height: auto;
          }
          
          .main-content {
            height: 450px;
          }
          
          .left-content {
            padding: 30px;
          }
        }

        @media (max-width: 768px) {
          .main-container {
            padding: 8px;
          }
          
          .content-card {
            max-height: none;
          }
          
          .main-content {
            grid-template-columns: 1fr;
            height: auto;
          }
          
          .left-content {
            padding: 30px 20px;
          }
          
          .right-content {
            height: 300px;
          }
          
          .stats-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          
          .fashion-grid {
            padding: 8px;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .main-container {
            padding: 5px;
          }
          
          .left-content {
            padding: 20px 15px;
          }
          
          .right-content {
            height: 250px;
          }
          
          .stat-number {
            font-size: 20px;
          }
          
          .stat-label {
            font-size: 8px;
          }
        }
      `}</style>
      
      <section className="main-container">
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
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                  color: '#6c757d',
                  lineHeight: '1.6',
                  marginBottom: '30px',
                  maxWidth: '350px'
                }}>
                  Experience the future of fashion with AI-powered Fashion assistant Ecommerce, 
                  personalized recommendations that match your unique taste.
                </p>

                <a
                  href="https://chat-with-racan.vercel.app"
                  style={{
                    background: '#ff3366',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '1px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
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
                    width: '50px',
                    height: '50px',
                    border: '2px solid #ddd',
                    borderRadius: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: '#6c757d'
                  }}>
                    #1 SPACE
                  </div>
                  <div style={{ fontSize: '10px', color: '#6c757d' }}>
                    COLLABORATIVE CREATIVE NETWORK
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Fashion Images */}
            <div className="right-content">
              <div className="floating-elements">
                <div className="floating-dot"></div>
                <div className="floating-dot"></div>
                <div className="floating-dot"></div>
              </div>
              
              <div className="fashion-grid">
                {/* Large Fashion Image */}
                <div className="fashion-card large">
                  <img 
                    src="https://i.pinimg.com/736x/54/a1/e3/54a1e32c53c93895bc44239a351dc2bf.jpg" 
                    alt="Fashion Model 1"
                  />
                </div>
                
                {/* Top Right Fashion Image */}
                <div className="fashion-card">
                  <img 
                    src="https://i.pinimg.com/736x/d1/a7/90/d1a790aae1206557418eba5e0638223e.jpg" 
                    alt="Fashion Model 2"
                  />
                </div>
                
                {/* Bottom Right - AI POWERED Video */}
                <div className="fashion-card">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    style={{ filter: 'brightness(0.8)' }}
                  >
                    <source 
                      src="https://v1.pinimg.com/videos/mc/720p/11/37/4c/11374cc3bc5445df07f758ae4dc481aa.mp4" 
                      type="video/mp4" 
                    />
                  </video>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255, 51, 102, 0.8), rgba(151, 60, 255, 0.8))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', marginBottom: '4px' }}>AI</div>
                      <div style={{ fontSize: '10px', opacity: '0.9' }}>POWERED</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Info Cards */}
              <div className="info-card" style={{
                bottom: '15px',
                left: '15px'
              }}>
                <div className="info-card-title">STYLE MATCH</div>
                <div>98% ACCURACY</div>
              </div>
              
              <div className="info-card" style={{
                top: '45%',
                right: '15px'
              }}>
                <div className="info-card-title">WARDROBE</div>
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