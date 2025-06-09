import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../Firebase';
import AddProductStyle from './AddProduct.css';

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    condition: "",
    description: "",
    image: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, "products"), product);
      alert("Product added successfully! ");
      
      setProduct({
        name: "",
        price: 0,
        category: "",
        condition: "new",
        description: "",
        image: ""
      });
    } catch (error) {
      alert("Error adding product: " + error.message);
    }
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
  setProduct(prev => ({
    ...prev,
    [name]: name === "price" ? Number(value) : value
  }));
};


  return (
    <div className="product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Product Name'
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            placeholder='Product price'
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />


          <select
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value='' disabled>Select category</option>
            <option value="Clothing_Accessories">Clothing_Accessories</option>
            <option value="Electronics_Gadgets">Electronics_Gadgets</option>
            <option value="Home_Living">Home_Living</option>
            <option value="Kids_Baby_Items">Kids_Baby_Items</option>
            <option value="Vehicles_Automotive">Vehicles_Automotive</option>
          </select>

          <select
            name="condition"
            value={product.condition}
            onChange={handleChange}
          >
            <option value='' disabled>Select condition</option>
            <option value="good">Good</option>
            <option value="very_good">Very_Good</option>
            <option value="like_new">Like_New</option>
            <option value="excellent">Excellent</option>
          </select>

          <input
            name="image"
            type="url"
            placeholder="Image URL: https://example.com/image.jpg"
            value={product.imageUrl}
            onChange={handleChange}
            required
          />

        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;