import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellerDashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'electronics',
    stock: 1,
    images: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewImages, setPreviewImages] = useState([]);
  const navigate = useNavigate();

  // Fetch seller's items on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/seller/items');
        setItems(response.data);
      } catch (err) {
        setError('Failed to fetch items');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Create preview URLs
    const imagePreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
    
    setNewItem(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('name', newItem.name);
      formData.append('description', newItem.description);
      formData.append('price', newItem.price);
      formData.append('category', newItem.category);
      formData.append('stock', newItem.stock);
      
      // Append each image file
      newItem.images.forEach(image => {
        formData.append('images', image);
      });
      
      const response = await axios.post('/api/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setItems(prev => [...prev, response.data]);
      resetForm();
    } catch (err) {
      setError('Failed to add item');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: 'electronics',
      stock: 1,
      images: []
    });
    setPreviewImages([]);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`/api/items/${itemId}`);
      setItems(prev => prev.filter(item => item._id !== itemId));
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  return (
    <div className="seller-dashboard">
      <h1>Seller Dashboard</h1>
      <div className="dashboard-container">
        {/* Add New Item Form */}
        <div className="add-item-section">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                value={newItem.price}
                onChange={handleInputChange}
                min="0.01"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={newItem.category}
                onChange={handleInputChange}
              >
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
                <option value="books">Books</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={newItem.stock}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Images (Max 5)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
              <div className="image-previews">
                {previewImages.map((preview, index) => (
                  <img key={index} src={preview} alt={`Preview ${index}`} />
                ))}
              </div>
            </div>
            
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Item'}
            </button>
          </form>
        </div>
        
        {/* Current Items List */}
        <div className="current-items-section">
          <h2>Your Listed Items</h2>
          {error && <div className="error-message">{error}</div>}
          
          {isLoading && items.length === 0 ? (
            <p>Loading your items...</p>
          ) : items.length === 0 ? (
            <p>You haven't listed any items yet.</p>
          ) : (
            <div className="items-grid">
              {items.map(item => (
                <div key={item._id} className="item-card">
                  <div className="item-image">
                    {item.images.length > 0 && (
                      <img src={item.images[0]} alt={item.name} />
                    )}
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>
                    <p>Stock: {item.stock}</p>
                    <div className="item-actions">
                      <button onClick={() => navigate(`/edit-item/${item._id}`)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteItem(item._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;