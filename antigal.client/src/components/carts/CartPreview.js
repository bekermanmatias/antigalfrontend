// src/components/cart/CartPreview.js
import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext'; // Importamos el contexto

const CartPreview = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext); // Accedemos al contexto del carrito

  // Calcular el subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxRate = 0.1; // 10% de impuestos
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  return (
    <div className="cart-preview">
      <h2 className="cart-title">Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">No hay productos en el carrito.</p>
      ) : (
        <ul className="cart-items-list">
          {cartItems.map((item) => (
            console.log(item),
            <li key={item.id} className="cart-item">
              <div className="cart-item-details">
                <img src={item.images} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">
                    ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="cart-item-actions">
                <div className="cart-item-quantity">
                  <button
                    className="quantity-button"
                    onClick={() => addToCart(item, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button className="quantity-button" onClick={() => addToCart(item, 1)}>
                    +
                  </button>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-summary">
        <p className="cart-subtotal">Subtotal: ${subtotal.toFixed(2)}</p>
        <p className="cart-taxes">Impuestos (10%): ${taxes.toFixed(2)}</p>
        <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CartPreview;
