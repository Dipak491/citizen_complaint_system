import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { items, clearCart } = useCart();
  
  const handleCheckout = () => {
    // In a real app, this would navigate to checkout
    console.log('Proceeding to checkout');
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button variant="primary">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Items ({items.length})
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-accent-600"
                >
                  Clear cart
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
              
              <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
                <Link to="/products" className="text-primary-600 hover:text-primary-700 inline-flex items-center text-sm font-medium">
                  <ArrowRight size={16} className="mr-2 rotate-180" />
                  Continue Shopping
                </Link>
                
                <Link to="/checkout">
                  <Button variant="primary" className="inline-flex items-center">
                    Proceed to Checkout
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <CartSummary onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;