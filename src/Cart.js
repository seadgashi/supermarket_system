import React from 'react';
import './assets/Cart.css';

const Cart = ({ selectedProducts, onProductRemove }) => {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul className="cart-list">
        {selectedProducts.map((product, index) => (
          <li className="cart-item" key={index}>
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-quantity">Quantity: {product.selectedQuantity}</span>
            </div>
            <button className="remove-button" onClick={() => onProductRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;