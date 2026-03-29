import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, CreditCard, Lock, Truck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Trust badges */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Lock className="h-8 w-8 mb-3 text-primary-500" />
              <h3 className="text-lg font-semibold text-white mb-1">Secure Payment</h3>
              <p className="text-sm">All transactions are encrypted and secure</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 mb-3 text-primary-500" />
              <h3 className="text-lg font-semibold text-white mb-1">Fast Delivery</h3>
              <p className="text-sm">Free shipping on orders over $50</p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="h-8 w-8 mb-3 text-primary-500" />
              <h3 className="text-lg font-semibold text-white mb-1">Easy Returns</h3>
              <p className="text-sm">30-day money back guarantee</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto pt-10 pb-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">LuxeShop</h2>
            <p className="mb-4 text-sm leading-relaxed">
              We offer premium products at competitive prices. Our mission is to provide an exceptional shopping experience with quality service.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary-500 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-primary-500 flex-shrink-0 mt-0.5" />
                <span>123 Commerce St, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary-500 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary-500 flex-shrink-0" />
                <span>support@luxeshop.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-white mb-2">Newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="rounded-l-md px-3 py-2 text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 flex-grow"
                />
                <button 
                  type="submit" 
                  className="bg-primary-600 text-white px-3 py-2 text-sm font-medium rounded-r-md hover:bg-primary-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2025 LuxeShop. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <img 
                src="https://images.pexels.com/photos/6214861/pexels-photo-6214861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Payment methods" 
                className="h-6"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;