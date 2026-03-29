import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const PromotionSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="bg-primary-50 rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Summer Sale
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Enjoy up to 40% off on selected items from our premium collection. Limited time offer!
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  as={Link}
                  to="/collections/sale"
                >
                  Shop the Sale
                </Button>
                <Button 
                  variant="outline" 
                  as={Link}
                  to="/collections/new"
                >
                  New Arrivals
                </Button>
              </div>
              <div className="mt-8 flex items-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600">40%</div>
                  <div className="text-sm text-gray-500">Off</div>
                </div>
                <div className="mx-6 h-10 w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600">14</div>
                  <div className="text-sm text-gray-500">Days Left</div>
                </div>
                <div className="mx-6 h-10 w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600">250+</div>
                  <div className="text-sm text-gray-500">Products</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Summer collection" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;