// src/components/common/CartWidget.js
import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';  // Importar el contexto del carrito
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate

const CartWidget = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate(); // Inicializar el hook useNavigate

  // Calcular el total de productos en el carrito
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleClick = () => {
    navigate('/cart'); // Navegar a la página del carrito
  };

  return (
    <div className="cart-widget" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src="/icons/carrito.svg" alt="carrito" width={40} className="carrito" />
      {totalItems > 0 && (
        <span className="cart-count">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartWidget;

