import React, { useState } from 'react';
import './assets/ProductList.css'; 

const ProductList = ({ products, onProductSelect }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productName, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productName]: newQuantity,
    }));
  };

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <ul className="product-list">
        {products.map((product, index) => (
          <li className="product-item" key={index}>
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-price">${product.price.toFixed(2)}</span>
            </div>
            <div className="quantity-container">
              <input
                className="quantity-input"
                type="number"
                min="0"
                value={quantities[product.name] || ''}
                onChange={(e) =>
                  handleQuantityChange(product.name, parseInt(e.target.value))
                }
              />
              <button
                className="add-to-cart-button"
                onClick={() =>
                  onProductSelect(product, quantities[product.name] || 1)
                }
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;