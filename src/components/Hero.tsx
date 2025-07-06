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
          padding: 20px;
        }

        .content-card {
          background: white;
          border-radius: 24px;
          padding: 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          max-width: 1400px;
          margin: 0 auto;
        }

        .navbar-section {
          background: white;
          padding: 16px 32px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          color: #6c757d;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .nav-link.active {
          background: #ff3366;
          color: white;
        }

        .nav-link:hover {
          background: #f8f9fa;
          color: #333;
        }

        .main-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 600px;
        }

        .left-content {
          padding: 60px;
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
          gap: 16px;
          padding: 16px;
        }

        .fashion-card {
          border-radius: 16px;
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

        .fashion-card.large {
          grid-row: span 2;
        }

        .stats-section {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-top: 40px;
        }

        .stat-item {
          text-align: left;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: #333;
          line-height: 1;
        }

        .stat-label {
          font-size: 12px;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
        }

        .floating-elements {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 8px;
        }

        .floating-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ff3366;
        }

        .floating-dot:nth-child(2) {
          background: #973cff;
        }

        .floating-dot:nth-child(3) {
          background: #00d4aa;
        }

        @media (max-width: 768px) {
          .main-content {
            grid-template-columns: 1fr;
          }
          
          .left-content {
            padding: 40px 30px;
          }
          
          .navbar-section {
            padding: 16px 20px;
          }
          
          .nav-links {
            gap: 16px;
          }
          
          .stats-section {
            gap: 20px;
          }
        }
      `}</style>
      
      <section className="main-container">
        <div className="content-card">
          
          {/* Navbar Section */}
          <div className="navbar-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: '#333', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                RA
              </div>
              
              <div className="nav-links">
                <a href="#" className="nav-link">HOME</a>
                <a href="#" className="nav-link">ARTISTS</a>
                <a href="#" className="nav-link active">FEATURES</a>
                <a href="#" className="nav-link">EVENTS</a>
                <a href="#" className="nav-link">FORUM</a>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                padding: '8px 24px',
                border: '2px dashed #ddd',
                borderRadius: '20px',
                fontSize: '12px',
                color: '#6c757d',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                DISCOVER ALL OUR PRODUCTS
              </div>
              <button style={{
                background: '#333',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            
            {/* Left Content */}
            <div className="left-content">
              <div className="animate-fade-in-up">
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '700',
                  lineHeight: '1.1',
                  color: '#333',
                  marginBottom: '24px',
                  letterSpacing: '-0.02em'
                }}>
                  Redefine Your<br />
                  Style With<br />
                  <span style={{ color: '#ff3366' }}>Racan</span>
                </h1>
              </div>

              <div className="animate-fade-in-up animation-delay-300">
                <div style={{
                  fontSize: '1.25rem',
                  color: '#333',
                  marginBottom: '8px',
                  fontWeight: '600'
                }}>
                  AI-powered assistant + Fashion
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  color: '#333',
                  marginBottom: '32px',
                  fontWeight: '600'
                }}>
                  Ecommerce
                </div>
              </div>

              <div className="animate-fade-in-up animation-delay-600">
                <p style={{
                  fontSize: '1rem',
                  color: '#6c757d',
                  lineHeight: '1.6',
                  marginBottom: '40px',
                  maxWidth: '400px'
                }}>
                  Experience the future of fashion with AI-powered Fashion assistant Ecommerce, 
                  personalized recommendations that match your unique taste.
                </p>

                <a
                  href="https://chat-with-racan.vercel.app"
                  style={{
                    background: '#ff3366',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
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
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    border: '2px solid #ddd',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: '#6c757d'
                  }}>
                    #1 SPACE
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>
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
                
                {/* Bottom Right - Abstract/Tech Element */}
                <div className="fashion-card" style={{ 
                  background: 'linear-gradient(135deg, #ff3366, #973cff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>AI</div>
                    <div style={{ fontSize: '12px', opacity: '0.8' }}>POWERED</div>
                  </div>
                </div>
              </div>
              
              {/* Additional floating elements */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'white',
                padding: '12px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '10px',
                color: '#6c757d'
              }}>
                <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>STYLE MATCH</div>
                <div>98% ACCURACY</div>
              </div>
              
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                background: 'white',
                padding: '12px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '10px',
                color: '#6c757d'
              }}>
                <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>WARDROBE</div>
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