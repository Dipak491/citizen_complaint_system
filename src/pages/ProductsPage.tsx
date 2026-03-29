import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import { products, getCategories, getProductsByCategory } from '../data/products';
import { Filter, SlidersHorizontal, X } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  
  const categories = getCategories();
  
  useEffect(() => {
    // Initialize state based on URL params
    if (category) {
      setSelectedCategory(category);
      setFilteredProducts(getProductsByCategory(category));
    } else {
      setFilteredProducts(products);
    }
  }, [category]);
  
  useEffect(() => {
    // Apply filters and sorting
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, priceRange, sortBy]);
  
  const handleCategoryChange = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    
    if (categoryName) {
      navigate(`/category/${categoryName.toLowerCase()}`);
    } else {
      navigate('/products');
    }
  };
  
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(event.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
  };
  
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 1500]);
    setSortBy('featured');
    navigate('/products');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} items found
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <Button 
              variant="outline"
              size="sm"
              className="md:hidden flex items-center mr-4"
              onClick={toggleFilters}
              icon={<Filter size={16} />}
            >
              Filters
            </Button>
            
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <SlidersHorizontal size={18} className="mr-2" />
                  Filters
                </h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  Clear all
                </button>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="category-all"
                      name="category"
                      type="radio"
                      checked={selectedCategory === null}
                      onChange={() => handleCategoryChange(null)}
                      className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <label htmlFor="category-all" className="ml-2 text-sm text-gray-700">
                      All Categories
                    </label>
                  </div>
                  
                  {categories.map((categoryName) => (
                    <div key={categoryName} className="flex items-center">
                      <input
                        id={`category-${categoryName.toLowerCase()}`}
                        name="category"
                        type="radio"
                        checked={selectedCategory?.toLowerCase() === categoryName.toLowerCase()}
                        onChange={() => handleCategoryChange(categoryName)}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor={`category-${categoryName.toLowerCase()}`} className="ml-2 text-sm text-gray-700">
                        {categoryName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">${priceRange[0]}</span>
                    <span className="text-sm text-gray-500">${priceRange[1]}</span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      step="10"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters Drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleFilters}></div>
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-lg p-4 transform transition-transform duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  <button onClick={toggleFilters} className="text-gray-500">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center">
                    <SlidersHorizontal size={18} className="mr-2" />
                    Filter Options
                  </h4>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-primary-600"
                  >
                    Clear all
                  </button>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="mobile-category-all"
                        name="mobile-category"
                        type="radio"
                        checked={selectedCategory === null}
                        onChange={() => handleCategoryChange(null)}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor="mobile-category-all" className="ml-2 text-sm text-gray-700">
                        All Categories
                      </label>
                    </div>
                    
                    {categories.map((categoryName) => (
                      <div key={categoryName} className="flex items-center">
                        <input
                          id={`mobile-category-${categoryName.toLowerCase()}`}
                          name="mobile-category"
                          type="radio"
                          checked={selectedCategory?.toLowerCase() === categoryName.toLowerCase()}
                          onChange={() => handleCategoryChange(categoryName)}
                          className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <label htmlFor={`mobile-category-${categoryName.toLowerCase()}`} className="ml-2 text-sm text-gray-700">
                          {categoryName}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">${priceRange[0]}</span>
                      <span className="text-sm text-gray-500">${priceRange[1]}</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min="0"
                        max="1500"
                        step="10"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1500"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button variant="primary" fullWidth onClick={toggleFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Products */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} columns={3} />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or browse our other categories.
                </p>
                <Button variant="primary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;