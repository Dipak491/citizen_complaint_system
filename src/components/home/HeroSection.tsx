import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/5868272/pexels-photo-5868272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Hero background" 
          className="w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-90"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-xl">
          <span className="inline-block bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-4 animate-fade-in">
            New Collection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-in">
            Elevate Your Lifestyle
          </h1>
          <p className="text-lg text-gray-300 mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
            Discover premium products that combine elegant design with exceptional functionality. Shop our latest collection today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <Button 
              variant="primary" 
              size="lg"
              className="px-8"
              as={Link}
              to="/products"
            >
              Shop Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900"
              as={Link}
              to="/collections/featured"
            >
              Featured Items
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;