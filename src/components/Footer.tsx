import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img 
              src="https://i.postimg.cc/CMnkxnGs/image-1.png" 
              alt="Racan AI Logo - AI Fashion Assistant" 
              className="w-32 mb-4"
            />
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Redefining fashion with AI-powered recommendations and personalized style assistance. 
              Transform your wardrobe with intelligent fashion technology that understands your unique style.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/racan.ai?utm_source=ig_web_button_share_sheet&igsh=MXR2czM5N2JoYnJlbg==" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Follow Racan AI on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/racanai" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Follow Racan AI on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@racanai" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Subscribe to Racan AI on YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/racan-ai" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Connect with Racan AI on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://twitter.com/racan_ai" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Follow Racan AI on Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors duration-300">AI Features</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors duration-300">Fashion Products</a></li>
              <li><a href="https://racan-ai.vercel.app/about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="https://chat-with-racan.vercel.app" className="text-gray-400 hover:text-white transition-colors duration-300">Try AI Assistant</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">AI Fashion Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Personalized Styling</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Smart Wardrobe</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Fashion Ecommerce</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Style Recommendations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">AI Fashion Technology</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-400 flex-shrink-0" />
                <a 
                  href="mailto:ssbkfdurga17@gmail.com" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  ssbkfdurga17@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-gray-400 flex-shrink-0 mt-1" />
                <div className="text-gray-400 text-sm">
                  <p>Racan AI Headquarters</p>
                  <p>Parul University</p>
                  <p>Vadodara, Gujarat</p>
                  <p>India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+91-XXX-XXX-XXXX</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Cookie Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">AI Ethics</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Fashion Blog</a>
            </div>
            <div className="text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Racan AI. All rights reserved.</p>
              <p className="mt-1">AI-Powered Fashion Assistant & Smart Wardrobe Technology</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;