import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-16 relative overflow-hidden">
      {/* Portal-style background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Hexagonal floating elements */}
        <div className="absolute w-12 h-12 opacity-5 top-16 left-20" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div className="absolute w-8 h-8 opacity-10 bottom-20 right-32" style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          animation: 'float 6s ease-in-out infinite',
          animationDelay: '1s'
        }}></div>
        
        {/* Neural network lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 400">
          <defs>
            <linearGradient id="neuralFooter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="50%" stopColor="#764ba2" />
              <stop offset="100%" stopColor="#f093fb" />
            </linearGradient>
          </defs>
          <g className="animate-pulse">
            <path d="M100,100 Q300,50 500,100 T900,100" stroke="url(#neuralFooter)" strokeWidth="1" fill="none" />
            <path d="M150,200 Q350,150 550,200 T950,200" stroke="url(#neuralFooter)" strokeWidth="1" fill="none" />
            <circle cx="100" cy="100" r="1.5" fill="#667eea" className="animate-ping" />
            <circle cx="500" cy="100" r="1.5" fill="#764ba2" className="animate-ping" style={{animationDelay: '1s'}} />
            <circle cx="900" cy="100" r="1.5" fill="#f093fb" className="animate-ping" style={{animationDelay: '2s'}} />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img 
              src="https://i.postimg.cc/CMnkxnGs/image-1.png" 
              alt="Racan Logo" 
              className="w-32 mb-4 filter brightness-0 invert"
            />
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Redefining fashion with AI-powered recommendations and personalized style assistance.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/racan.ai?utm_source=ig_web_button_share_sheet&igsh=MXR2czM5N2JoYnJlbg==" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 transform hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Home</a></li>
              <li><a href="#features" className="text-slate-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Features</a></li>
              <li><a href="#products" className="text-slate-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Products</a></li>
              <li><a href="https://racan-ai.vercel.app/about" className="text-slate-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">About Us</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Help Center</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="flex items-center space-x-3 mb-3">
              <Mail size={18} className="text-slate-400" />
              <a href="mailto:ssbkfdurga17@gmail.com" className="text-slate-400 hover:text-white transition-colors duration-300">
               <b> ssbkfdurga17@gmail.com </b>
              </a>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
            <b>
              Racan, Vadodara <br />
              Parul University<br />
              India
              </b>
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Racan AI. All rights reserved.</p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;