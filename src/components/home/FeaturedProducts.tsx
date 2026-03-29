import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../product/ProductGrid';
import { getFeaturedProducts } from '../../data/products';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="mt-2 text-gray-600 max-w-xl">
              Our selection of premium products, hand-picked for exceptional quality and design.
            </p>
          </div>
          <Link 
            to="/products" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4 md:mt-0"
          >
            View all products
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <ProductGrid products={featuredProducts} columns={4} />
      </div>
    </section>
  );
};

export default FeaturedProducts;