// src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto del carrito
export const CartContext = createContext();

// CartProvider: Proveedor del carrito para envolver la aplicación
export const CartProvider = ({ children }) => {
  // Estado inicial del carrito (se recupera de localStorage si existe)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Efecto para guardar los cambios del carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para añadir productos al carrito
  const addToCart = (product, quantity) => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya está en el carrito, solo se actualiza la cantidad
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Si el producto no está en el carrito, se agrega un nuevo objeto
      setCartItems(prevItems => [...prevItems, { ...product, quantity }]);
    }
  };

  // Función para eliminar todos los productos de un tipo específico del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
