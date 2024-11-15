// src/components/cart/CartItem.js
import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      addToCart(item, -1);
    }
  };

  const handleIncrease = () => {
    addToCart(item, 1);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <img src={item.images} alt={item.name} className="cart-item-image" />
        <div className="cart-item-info">
          <h3 className="cart-item-name">{item.name}</h3>
          <p className="cart-item-brand">{item.brand}</p>
          <p className="cart-item-price">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="cart-item-actions">
        <button className="delete-button" onClick={handleRemove}>
          <img src="/icons/delete.svg" alt="Eliminar" width={20} />
        </button>
        <div className="quantity-controls">
          <button className="quantity-button" onClick={handleDecrease} disabled={item.quantity <= 1}>
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button className="quantity-button" onClick={handleIncrease}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
