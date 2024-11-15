// src/components/cart/OrderSummary.js
import React from 'react';

const OrderSummary = ({ subtotal, shipping, taxes, total }) => {
  return (
    <div className="order-summary">
      <h2>Resumen del Pedido</h2>
      <div className="summary-item">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span>Envío</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span>Impuestos (10%)</span>
        <span>${taxes.toFixed(2)}</span>
      </div>
      <hr />
      <div className="summary-item total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
