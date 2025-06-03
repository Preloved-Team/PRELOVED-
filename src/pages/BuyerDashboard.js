<<<<<<< HEAD
import Navbar from '../components/navbar/navbar';
import './BuyerDashboard.css';
import Popular from '../components/Popular/Popular';
import Top from '../components/AdminBodySection/TopSection/Top';
import Footer from '../components/footer/Footer';
=======
<<<<<<< HEAD
import Login from './Login';
import Navbar from '../components/navbar/navbar';
import Cart from './Cart';
import { Routes, Route } from 'react-router-dom';
import ShopCategory from './ShopCategory';
import Product from './Product';
import logo from '../components/Assets/dodge_challenger.jpg'
import './BuyerDashboard.css';
import Notification from '../components/Notification';

>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5

const BuyerDashboard = () => {
  return (
    <div>
<<<<<<< HEAD
      <Top/>
    <div>
      <Navbar/>
      <Popular/>
      <Footer/>
    </div>
      
    </div>
=======
      <Routes>
        <Route path="menClothing & Accessories" element={<ShopCategory category="Clothing & Accessories" />} />
        <Route path="Electronics & Gadgets" element={<ShopCategory category="Electronics & Gadgets" />} />
        <Route path="Home & Living" element={<ShopCategory category="Home & Living" />} />
        <Route path="Kids & Baby Items" element={<ShopCategory category="Kids & Baby Items" />} />
        <Route path="Vehicles & Automotive" element={<ShopCategory category="Vehicles & Automotive" />} />
        <Route path="product/:productID" element={<Product />} />
        <Route path="product" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
      </Routes>
      <div className='dashboard-content'>
        <h1>SHUBHAM'S APP</h1>
        <Notification message="You have 2 unread messages from sellers." />
        <Notification message="Your order #1234 has been shipped!" />
        <img src={logo} alt="App logo" className='dashboard-content' />
      </div>
    </div>
    
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5
  );
};

export default BuyerDashboard;
<<<<<<< HEAD
=======
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyerDashboard.css';

const ClothingAccessoriesSection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Denim Jacket',
      price: 59.99,
      category: 'Clothing',
      subcategory: 'Jackets',
      size: ['S', 'M', 'L', 'XL'],
      color: ['Blue', 'Black'],
      description: 'Classic denim jacket with modern fit',
      image: 'https://example.com/denim-jacket.jpg',
      stock: 15,
      rating: 4.5,
      reviews: 28
    },
    {
      id: 2,
      name: 'Leather Wallet',
      price: 29.99,
      category: 'Accessories',
      subcategory: 'Wallets',
      color: ['Brown', 'Black'],
      description: 'Genuine leather bifold wallet',
      image: 'https://example.com/leather-wallet.jpg',
      stock: 42,
      rating: 4.7,
      reviews: 56
    },
    {
      id: 3,
      name: 'Cotton T-Shirt',
      price: 19.99,
      category: 'Clothing',
      subcategory: 'T-Shirts',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      color: ['White', 'Black', 'Gray', 'Navy'],
      description: '100% cotton premium t-shirt',
      image: 'https://example.com/cotton-tshirt.jpg',
      stock: 87,
      rating: 4.3,
      reviews: 112
    },
    {
      id: 4,
      name: 'Silk Scarf',
      price: 39.99,
      category: 'Accessories',
      subcategory: 'Scarves',
      color: ['Red', 'Blue', 'Green', 'Gold'],
      description: 'Luxury silk scarf with hand-rolled edges',
      image: 'https://example.com/silk-scarf.jpg',
      stock: 23,
      rating: 4.8,
      reviews: 34
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortOption, setSortOption] = useState('featured');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Initialize filtered products
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Apply filters
  useEffect(() => {
    let results = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      results = results.filter(product => product.category === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubcategory !== 'All') {
      results = results.filter(product => product.subcategory === selectedSubcategory);
    }

    // Size filter
    if (selectedSize !== 'All') {
      results = results.filter(product => 
        product.size && product.size.includes(selectedSize)
      );
    }

    // Color filter
    if (selectedColor !== 'All') {
      results = results.filter(product => 
        product.color && product.color.includes(selectedColor)
      );
    }

    // Price range filter
    results = results.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting
    switch (sortOption) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming we had a date property
        // results.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        // 'featured' - keep original order
        break;
    }

    setFilteredProducts(results);
  }, [selectedCategory, selectedSubcategory, selectedSize, selectedColor, priceRange, sortOption, products]);

  // Get unique categories, subcategories, sizes, and colors
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const subcategories = ['All', ...new Set(products.map(p => p.subcategory))];
  
  const sizes = ['All'];
  products.forEach(p => {
    if (p.size) {
      p.size.forEach(size => {
        if (!sizes.includes(size)) sizes.push(size);
      });
    }
  });

  const colors = ['All'];
  products.forEach(p => {
    if (p.color) {
      p.color.forEach(color => {
        if (!colors.includes(color)) colors.push(color);
      });
    }
  });

  // Cart functions
  const addToCart = (product, selectedSize = null, selectedColor = null) => {
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1
    };
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, cartItem];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Wishlist functions
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Product detail modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState({
    size: null,
    color: null
  });

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedVariant({
      size: product.size?.[0] || null,
      color: product.color?.[0] || null
    });
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="clothing-accessories-section">
      <div className="filters-sidebar">
        <h3>Filters</h3>
        
        <div className="filter-group">
          <h4>Category</h4>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <h4>Subcategory</h4>
          <select 
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            {subcategories.map(subcategory => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <h4>Size</h4>
          <select 
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <h4>Color</h4>
          <select 
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <h4>Price Range</h4>
          <div className="price-range">
            <span>${priceRange[0]}</span>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            />
            <span>${priceRange[1]}</span>
          </div>
        </div>
        
        <button 
          className="clear-filters"
          onClick={() => {
            setSelectedCategory('All');
            setSelectedSubcategory('All');
            setSelectedSize('All');
            setSelectedColor('All');
            setPriceRange([0, 100]);
          }}
        >
          Clear All Filters
        </button>
      </div>
      
      <div className="products-main">
        <div className="sort-options">
          <span>Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div 
                  className="wishlist-icon"
                  onClick={() => toggleWishlist(product.id)}
                >
                  {wishlist.includes(product.id) ? '❤️' : '♡'}
                </div>
                <img 
                  src={product.image} 
                  alt={product.name}
                  onClick={() => openProductModal(product)}
                />
                <h3>{product.name}</h3>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <div className="product-rating">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                  <span>({product.reviews})</span>
                </div>
                <button 
                  className="add-to-cart"
                  onClick={() => openProductModal(product)}
                >
                  Quick View
                </button>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products match your filters.</p>
              <button 
                className="reset-filters"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedSubcategory('All');
                  setSelectedSize('All');
                  setSelectedColor('All');
                  setPriceRange([0, 100]);
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeProductModal}>×</button>
            
            <div className="modal-left">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
            
            <div className="modal-right">
              <h2>{selectedProduct.name}</h2>
              <div className="product-price">${selectedProduct.price.toFixed(2)}</div>
              <div className="product-rating">
                {'★'.repeat(Math.floor(selectedProduct.rating))}
                {'☆'.repeat(5 - Math.floor(selectedProduct.rating))}
                <span>({selectedProduct.reviews} reviews)</span>
              </div>
              
              <p className="product-description">{selectedProduct.description}</p>
              
              {selectedProduct.size && (
                <div className="variant-selector">
                  <h4>Size:</h4>
                  <div className="variant-options">
                    {selectedProduct.size.map(size => (
                      <button
                        key={size}
                        className={`variant-btn ${selectedVariant.size === size ? 'active' : ''}`}
                        onClick={() => setSelectedVariant(prev => ({ ...prev, size }))}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedProduct.color && (
                <div className="variant-selector">
                  <h4>Color:</h4>
                  <div className="variant-options">
                    {selectedProduct.color.map(color => (
                      <button
                        key={color}
                        className={`variant-btn ${selectedVariant.color === color ? 'active' : ''}`}
                        onClick={() => setSelectedVariant(prev => ({ ...prev, color }))}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="product-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => {
                    addToCart(selectedProduct, selectedVariant.size, selectedVariant.color);
                    closeProductModal();
                  }}
                  disabled={selectedProduct.stock <= 0}
                >
                  {selectedProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button 
                  className="wishlist-btn"
                  onClick={() => {
                    toggleWishlist(selectedProduct.id);
                    closeProductModal();
                  }}
                >
                  {wishlist.includes(selectedProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
              
              <div className="product-stock">
                {selectedProduct.stock > 0 
                  ? `${selectedProduct.stock} available in stock` 
                  : 'Currently out of stock'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothingAccessoriesSection;
>>>>>>> 3b7195c (The Work done in Week3 by Arsh.)
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5
