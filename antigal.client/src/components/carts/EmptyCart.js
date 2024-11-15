// src/components/cart/EmptyCart.js
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player'; 

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <Player
        autoplay
        loop
        src="/json/empty-cart-animation.json"
        className="empty-cart-image"
      />
      <h2>Tu carrito está vacío</h2>
      <p>¡Agrega algunos productos para comenzar tu compra!</p>
    </div>
  );
};

export default EmptyCart;
