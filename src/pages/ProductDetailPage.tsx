import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, ShieldCheck, ArrowLeft, Heart, Share2, Star, Plus, Minus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductGrid from '../components/product/ProductGrid';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { formatCurrency, calculateDiscountPrice } from '../utils/formatCurrency';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const productId = parseInt(id || '0');
  const product = getProductById(productId);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium">
            Return to Products
          </Link>
        </div>
      </Layout>
    );
  }
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const price = product.discount 
    ? calculateDiscountPrice(product.price, product.discount) 
    : product.price;
  
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);
    
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link 
              to={`/category/${product.category.toLowerCase()}`} 
              className="text-gray-500 hover:text-primary-600"
            >
              {product.category}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">{product.name}</span>
          </nav>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
            {/* Product Images */}
            <div className="lg:col-span-3">
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                <img 
                  src={product.images ? product.images[currentImageIndex] : product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
                
                {product.discount && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="accent" className="font-semibold">
                      {product.discount}% OFF
                    </Badge>
                  </div>
                )}
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-md overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-primary-500' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - view ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="lg:col-span-2">
              <div className="flex flex-col h-full">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : i < product.rating 
                              ? 'fill-yellow-200 text-yellow-400' 
                              : 'fill-transparent text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {product.rating.toFixed(1)} ({Math.floor(product.rating * 10)}) reviews
                  </span>
                </div>
                
                <div className="mb-6">
                  {product.discount ? (
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatCurrency(price)}
                      </span>
                      <span className="ml-2 text-lg text-gray-500 line-through">
                        {formatCurrency(product.price)}
                      </span>
                      <Badge variant="accent" className="ml-2">
                        Save {formatCurrency(product.price - price)}
                      </Badge>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(product.price)}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 mb-6">
                  {product.description}
                </p>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-2 text-gray-600 hover:text-primary-600 focus:outline-none"
                      disabled={quantity === 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-medium">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-2 text-gray-600 hover:text-primary-600 focus:outline-none"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="ml-4 text-sm">
                    <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    fullWidth
                    disabled={!product.inStock}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      icon={<Heart size={18} />}
                      aria-label="Add to wishlist"
                    >
                      Wishlist
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      icon={<Share2 size={18} />}
                      aria-label="Share product"
                    >
                      Share
                    </Button>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex items-center text-sm">
                      <Truck size={18} className="text-primary-600 mr-2" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <ShieldCheck size={18} className="text-primary-600 mr-2" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;