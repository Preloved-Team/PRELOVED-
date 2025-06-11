import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from '../../Firebase';
import './AddProduct.css';

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

    const user = auth.currentUser;

    if (!user) {
      alert("❌ You must be logged in to add a product.");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        ...product,
        sellerId: user.uid,         // ✅ Now protected
        timestamp: Date.now(),
        disabled: false
      });

      alert("✅ Product added successfully!");

      setProduct({
        name: "",
        price: "",
        category: "",
        condition: "",
        description: "",
        image: ""
      });
    } catch (error) {
      alert("❌ Error adding product: " + error.message);
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
          placeholder='Product Price'
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value='' disabled>Select category</option>
          <option value="Clothing_Accessories">Clothing & Accessories</option>
          <option value="Electronics_Gadgets">Electronics & Gadgets</option>
          <option value="Home_Living">Home & Living</option>
          <option value="Kids_Baby_Items">Kids & Baby Items</option>
          <option value="Vehicles_Automotive">Vehicles & Automotive</option>
        </select>

        <select
          name="condition"
          value={product.condition}
          onChange={handleChange}
          required
        >
          <option value='' disabled>Select condition</option>
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Gently Used">Gently Used</option>
          <option value="Excellent">Excellent</option>
        </select>

        <input
          name="image"
          type="url"
          placeholder="Image URL: https://example.com/image.jpg"
          value={product.image}
          onChange={handleChange}
          required
        />

        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
