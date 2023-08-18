import React from 'react';
import './assets/CheckoutButton.css'
const CheckoutButton = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Checkout</button>
    </div>
  );
};

export default CheckoutButton;