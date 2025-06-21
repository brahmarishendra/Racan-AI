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

        .cube-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .cube-container * {
          position: absolute;
          transform-style: preserve-3d;
        }
        .cube-container *::before, .cube-container *::after {
          position: absolute;
          content: '';
        }

        .scene {
          top: 50%; 
          left: 50%;
          width: 1px; 
          height: 1px;
          transform: rotateX(54.7deg) rotateZ(-45deg);
          --animation: 4s linear(0 0%, 0.22 2.1%, 0.86 6.5%, 1.11 8.6%, 1.3 10.7%, 1.35 11.8%, 1.37 12.9%, 1.37 13.7%, 1.36 14.5%, 1.32 16.2%, 1.03 21.8%, 0.94 24%, 0.89 25.9%, 0.88 26.85%, 0.87 27.8%, 0.87 29.25%, 0.88 30.7%, 0.91 32.4%, 0.98 36.4%, 1.01 38.3%, 1.04 40.5%, 1.05 42.7%, 1.05 44.1%, 1.04 45.7%, 1 53.3%, 0.99 55.4%, 0.98 57.5%, 0.99 60.7%, 1 68.1%, 1.01 72.2%, 1 86.7%, 1 100%) infinite;
        }

        .cube {
          color: #000000;
          transform-origin: 0.5px 0.5px 0.5px;
          transform-style: preserve-3d;
        }
        .cube, .cube::before,
        .cube__side, .cube__side:before {
          width: 100px; 
          aspect-ratio: 1/1;
          border: 1px solid currentColor;
          box-sizing: border-box;
        }
        .cube::before {
          top: -1px; 
          left: -1px;
          translate: 0 0 1px;
        }
        .cube__side:before {
          top: -1px; 
          left: -1px;
          translate: 0 0 -1px;
        }

        .cube__side {
          top: -1px; 
          left: -1px;
        }
        .cube__side:nth-child(1) {
          translate: 0 0 100px;
        }
        .cube__side:nth-child(2) {
          transform-origin: top left;
          transform: rotateY(-90deg);
        }
        .cube__side:nth-child(3) {
          transform-origin: bottom right;
          transform: rotateY(90deg);
        }
        .cube__side:nth-child(4) {
          transform-origin: bottom right;
          transform: rotateX(-90deg);
        }
        .cube__side:nth-child(5) {
          transform-origin: top left;
          transform: rotateX(90deg);
        }

        .cube1 {
          animation: cube1 var(--animation);
        }
        @keyframes cube1 {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(90deg); }
          100% { transform: rotateY(90deg) rotateX(90deg); }
        }

        .cube2 {
          animation: cube2 var(--animation);
        }
        @keyframes cube2 {
          0% { transform: rotateY(270deg); }
          50% { transform: rotateY(360deg); }
          100% { transform: rotateY(360deg) rotateZ(90deg); }
        }

        .cube3 {
          animation: cube3 var(--animation);
        }
        @keyframes cube3 {
          0% { transform: rotateX(90deg); }
          50% { transform: rotateX(90deg) rotateZ(90deg); }
          100% { transform: rotateX(90deg) rotateZ(90deg) rotateX(90deg); }
        }

        .cube4 {
          animation: cube4 var(--animation);
        }
        @keyframes cube4 {
          0% { transform: rotateX(90deg) rotateY(-90deg); }
          50% { transform: rotateX(90deg) rotateY(-90deg) rotateX(90deg); }
          100% { transform: rotateX(90deg) rotateY(-180deg) rotateX(90deg); }
        }

        .cube5 {
          animation: cube5 var(--animation);
        }
        @keyframes cube5 {
          0% { transform: rotateY(180deg); }
          50% { transform: rotateY(270deg); }
          100% { transform: rotateY(270deg) rotateX(90deg); }
        }

        .cube6 {
          animation: cube6 var(--animation);
        }
        @keyframes cube6 {
          0% { transform: rotateY(180deg) rotateX(90deg); }
          50% { transform: rotateY(180deg) rotateX(90deg) rotateZ(90deg); }
          100% { transform: rotateY(180deg) rotateX(90deg) rotateZ(90deg) rotateX(90deg); }
        }

        .cube7 {
          animation: cube7 var(--animation);
        }
        @keyframes cube7 {
          0% { transform: rotateX(-180deg); }
          50% { transform: rotateX(-180deg) rotateY(90deg); }
          100% { transform: rotateX(-180deg) rotateY(90deg) rotateX(90deg); }
        }

        .cube8 {
          animation: cube8 var(--animation);
        }
        @keyframes cube8 {
          0% { transform: rotateY(90deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(180deg) rotateZ(90deg); }
        }

        .cube1 .ball {
          transform: translatez(50px) rotateX(-45deg) rotateY(-45deg);
        }
        .cube2 .ball {
          transform: translatez(50px) rotateX(-45deg) rotateY(45deg);
        }
        .cube3 .ball {
          transform: translatez(50px) rotateX(-135deg) rotateY(135deg);
        }
        .cube4 .ball {
          transform: translatez(50px) rotateX(45deg) rotateY(-45deg);
        }
        .cube5 .ball {
          transform: translatez(50px) rotateX(135deg) rotateY(-45deg);
        }
        .cube6 .ball {
          transform: translatez(50px) rotateX(135deg) rotateY(-45deg);
        }
        .cube7 .ball {
          transform: translatez(50px) rotateX(135deg) rotateY(135deg);
        }
        .cube8 .ball {
          transform: translatez(50px) rotateX(45deg) rotateY(-45deg);
        }

        .ball,
        .ball::before,
        .ball::after {
          top: 0%; 
          left: 0%;
          width: 100%; 
          height: 100%;
          border-radius: 50%;
          background-color: currentColor;
          transform-origin: center center;
        }
        .cube1 .ball,
        .cube4 .ball,
        .cube5 .ball,
        .cube7 .ball {
          color: #84a59d;
        }
        .cube2 .ball,
        .cube3 .ball,
        .cube6 .ball,
        .cube8 .ball {
          color: #f28482;
        }

        .ball::before {
          transform: rotateY(90deg);
        }
        .ball::after {
          transform: rotateX(125deg) rotateY(25deg);
        }
      `}</style>
      
      <section className="relative bg-white pt-10 mt-[75px] mb-[0px] pb-[20px] lg:min-h-screen lg:pt-20 lg:mt-[50px] lg:mb-[10px] bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: 'url(https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/b5f129130689145.618a82f1c96b1.jpg)'}}>
        <div className="w-full flex flex-col lg:flex-row items-center justify-center mt-[15px] lg:mt-[30px] mb-[10px] lg:mb-[10px] px-4 lg:px-0 gap-5 lg:gap-[20px]">
          <div className="w-full lg:w-1/2 px-2 lg:px-20 lg:ml-[75px] flex flex-col justify-center min-h-[400px] lg:min-h-[452px]">
            <h1 className="text-[28px] sm:text-[30px] lg:text-[32px] text-gray-900 font-semibold leading-tight animate-fade-in-up">
              Redefine Your Style With Racan
              <br />
              <span className="text-[#ffffff]">
                AI-powered assistant + Fashion
              </span>
              <br />
              Ecommerce
            </h1>
            <p className="font-mono text-gray-800 text-[16px] sm:text-[17px] lg:text-[18px] mt-6 max-w-xl animate-fade-in-up animation-delay-300">
              Experience the future of fashion with AI-powered Fashion assistant Ecommerce, personalized recommendations that match your unique taste.
            </p>
            <a
              href="https://chat-with-racan.vercel.app" 
              className="inline-block bg-[#ff3366] text-white px-8 py-3 rounded-full text-base lg:text-lg hover:bg-[#d70153] hover:scale-105 hover:shadow-lg transition-all duration-300 mt-8 w-fit animate-fade-in-up animation-delay-600"
            >
              Try Racan
            </a>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[400px] lg:w-[466.89px] h-[350px] sm:h-[400px] lg:h-[452.12px] group">
              <div className="cube-container w-full h-full">
                <div className="scene">
                  <div className="cube cube1">
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="ball"></div>
                  </div>
                  <div className="cube cube2">
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="ball"></div>
                  </div>
                  <div className="cube cube3">
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="ball"></div>
                  </div>
                  <div className="cube cube4">
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="ball"></div>
                  </div>
                  <div className="cube cube5">
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="ball"></div>
                  </div>
                  <div className="cube cube6">
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="ball"></div>
                  </div>
                  <div className="cube cube7">
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="ball"></div>
                  </div>
                  <div className="cube cube8">
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="cube__side"></div>
                    <div className="ball"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;