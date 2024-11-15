// src/components/cart/ContinuePurchaseButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContinuePurchaseButton = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/checkout'); // Cambia '/checkout' por la ruta real de tu checkout
  };

  return (
    <button className="continue-purchase-button" onClick={handleContinue}>
      Continuar con la Compra
    </button>
  );
};

export default ContinuePurchaseButton;
