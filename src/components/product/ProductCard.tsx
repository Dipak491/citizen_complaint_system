import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency, calculateDiscountPrice } from '../../utils/formatCurrency';
import Badge from '../ui/Badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all overflow-hidden">
      {/* Product image and actions overlay */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Discount badge */}
        {product.discount && (
          <div className="absolute top-2 left-2">
            <Badge variant="accent" className="font-semibold">
              {product.discount}% OFF
            </Badge>
          </div>
        )}
        
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-md text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
        
        {/* Quick actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col gap-2">
            <button 
              className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-primary-500 hover:text-white transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </button>
            <Link 
              to={`/products/${product.id}`} 
              className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-primary-500 hover:text-white transition-colors"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </Link>
            {product.inStock && (
              <button 
                onClick={handleAddToCart}
                className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-primary-500 hover:text-white transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingCart size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-700 mb-1 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400' 
                      : i < product.rating 
                        ? 'text-yellow-300' 
                        : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                  00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
                  1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
                  1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">
                ({product.rating.toFixed(1)})
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              {product.discount ? (
                <>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(calculateDiscountPrice(product.price, product.discount))}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 line-through">
                    {formatCurrency(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            
            {product.featured && (
              <Badge variant="primary" className="text-2xs">Featured</Badge>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;