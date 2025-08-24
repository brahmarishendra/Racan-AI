import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 md:py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric floating elements */}
        <div className="absolute w-12 h-12 opacity-5 top-16 left-20" style={{
          background: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div className="absolute w-8 h-8 opacity-10 bottom-20 right-32" style={{
          background: 'linear-gradient(135deg, #4B5563 0%, #6B7280 100%)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          animation: 'float 6s ease-in-out infinite',
          animationDelay: '1s'
        }}></div>
        
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1200 400">
          <defs>
            <linearGradient id="footerGrid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B7280" />
              <stop offset="50%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#4B5563" />
            </linearGradient>
          </defs>
          <g className="animate-pulse">
            <path d="M100,100 Q300,50 500,100 T900,100" stroke="url(#footerGrid)" strokeWidth="1" fill="none" />
            <path d="M150,200 Q350,150 550,200 T950,200" stroke="url(#footerGrid)" strokeWidth="1" fill="none" />
            <circle cx="100" cy="100" r="1.5" fill="#6B7280" className="animate-ping" />
            <circle cx="500" cy="100" r="1.5" fill="#9CA3AF" className="animate-ping" style={{animationDelay: '1s'}} />
            <circle cx="900" cy="100" r="1.5" fill="#4B5563" className="animate-ping" style={{animationDelay: '2s'}} />
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
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Redefining fashion with AI-powered recommendations and personalized style assistance.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/racan.ai?utm_source=ig_web_button_share_sheet&igsh=MXR2czM5N2JoYnJlbg==" className="text-gray-400 hover:text-gray-300 transition-colors duration-300 transform hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors duration-300 transform hover:scale-110">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors duration-300 transform hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors duration-300 transform hover:scale-110">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Features</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Products</a></li>
              <li><a href="https://racan-ai.vercel.app/about" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">About Us</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="flex items-center space-x-3 mb-3">
              <Mail size={18} className="text-gray-400" />
              <a href="mailto:ssbkfdurga17@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300">
               <b> racan8@zohomail.in </b>
              </a>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
            <b>
              Racan, Vadodara <br />
              Parul University<br />
              India
              </b>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
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
