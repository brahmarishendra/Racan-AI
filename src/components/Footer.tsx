import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 text-gray-900 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img 
              src="https://i.postimg.cc/CMnkxnGs/image-1.png" 
              alt="Racan Logo" 
              className="w-32 mb-4"
            />
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Redefining fashion with AI-powered recommendations and personalized style assistance.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/racan.ai?utm_source=ig_web_button_share_sheet&igsh=MXR2czM5N2JoYnJlbg==" className="text-gray-400 hover:text-gray-900 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Home</a></li>
              <li><a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Features</a></li>
              <li><a href="#products" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Products</a></li>
              <li><a href="https://racan-ai.vercel.app/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">About Us</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Contact Us</h3>
            <div className="flex items-center space-x-3 mb-4">
              <Mail size={18} className="text-gray-400" />
              <a href="mailto:info@racan.ai" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <b>ssbkfdurga17@gmail.com</b>
              </a>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              <b>
                Racan, Vadodara <br />
                Parul University<br />
                India
              </b>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Racan AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;