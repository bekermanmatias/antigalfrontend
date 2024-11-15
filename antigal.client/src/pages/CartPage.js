// src/pages/CartPage.js
import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/carts/CartItem';
import OrderSummary from '../components/carts/OrderSummary';
import ContinuePurchaseButton from '../components/carts/ContinuePurchaseButton';
import EmptyCart from '../components/carts/EmptyCart'; 

const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  // Calcular el subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 10; // Costo de envío fijo (puedes modificarlo según tus reglas)
  const taxes = subtotal * 0.1; // 10% de impuestos
  const total = subtotal + shipping + taxes;

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Tu Carrito</h1>
      <div className="cart-page-container">
        {/* Columna de Productos */}
        <div className="cart-products">
          {cartItems.length === 0 ? (
            <EmptyCart /> // Usar el componente EmptyCart
          ) : (
            cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>
        <div className="cart-summary">
          <OrderSummary subtotal={subtotal} shipping={shipping} taxes={taxes} total={total} />
          {cartItems.length > 0 && <ContinuePurchaseButton />}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
