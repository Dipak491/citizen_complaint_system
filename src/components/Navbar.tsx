import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  setActiveTab: (tab: 'products' | 'cart' | 'invoices') => void;
  activeTab: 'products' | 'cart' | 'invoices';
}

const Navbar: React.FC<NavbarProps> = ({ setActiveTab, activeTab }) => {
  const { items } = useCart();
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Package size={24} />
            <span className="text-xl font-bold">Cosmo Billing</span>
          </div>
          
          <div className="flex space-x-6">
            <button 
              onClick={() => setActiveTab('products')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition ${
                activeTab === 'products' 
                  ? 'bg-white text-purple-600 font-medium' 
                  : 'hover:bg-purple-700'
              }`}
            >
              <span>Products</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('cart')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition ${
                activeTab === 'cart' 
                  ? 'bg-white text-purple-600 font-medium' 
                  : 'hover:bg-purple-700'
              }`}
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="bg-pink-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                  {itemCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setActiveTab('invoices')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition ${
                activeTab === 'invoices' 
                  ? 'bg-white text-purple-600 font-medium' 
                  : 'hover:bg-purple-700'
              }`}
            >
              <span>Invoices</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;