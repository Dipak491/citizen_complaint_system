import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../ui/Button';

interface CartSummaryProps {
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { items, getCartTotal } = useCart();
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;
  
  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
  };
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            <span className="font-medium">{formatCurrency(shipping)}</span>
          )}
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estimated tax</span>
          <span className="font-medium">{formatCurrency(tax)}</span>
        </div>
        
        <div className="border-t border-gray-200 my-3 pt-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-900">Total</span>
            <span className="font-bold text-gray-900">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      {subtotal > 0 && (
        <>
          <Button 
            variant="primary" 
            fullWidth 
            className="mt-6" 
            onClick={handleCheckout}
          >
            Checkout
          </Button>
          
          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>We accept the following payment methods:</p>
            <div className="flex justify-center space-x-2 mt-2">
              <span className="px-2 py-1 border border-gray-300 rounded text-xs">Visa</span>
              <span className="px-2 py-1 border border-gray-300 rounded text-xs">Mastercard</span>
              <span className="px-2 py-1 border border-gray-300 rounded text-xs">PayPal</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;