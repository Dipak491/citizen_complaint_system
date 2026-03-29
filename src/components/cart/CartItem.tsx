import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency, calculateDiscountPrice } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(product.id);
  };
  
  const price = product.discount 
    ? calculateDiscountPrice(product.price, product.discount) 
    : product.price;
    
  const totalPrice = price * quantity;
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200 animate-fade-in">
      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <Link to={`/products/${product.id}`} className="text-sm font-medium text-gray-900 hover:text-primary-600">
          {product.name}
        </Link>
        <p className="text-xs text-gray-500 mt-0.5">
          Category: {product.category}
        </p>
        <div className="flex items-baseline mt-1">
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(price)}
          </span>
          {product.discount && (
            <span className="ml-2 text-xs text-gray-500 line-through">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center ml-4">
        <button 
          onClick={handleDecrement}
          className="text-gray-600 hover:text-primary-600 focus:outline-none p-1"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="mx-2 w-8 text-center text-sm font-medium">
          {quantity}
        </span>
        <button 
          onClick={handleIncrement}
          className="text-gray-600 hover:text-primary-600 focus:outline-none p-1"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="w-20 text-right font-medium text-sm">
        {formatCurrency(totalPrice)}
      </div>
      
      <button 
        onClick={handleRemove}
        className="ml-4 text-gray-400 hover:text-accent-600 focus:outline-none p-1"
        aria-label="Remove item"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CartItem;