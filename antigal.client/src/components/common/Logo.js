// src/components/common/Logo.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = ({ toggleMenu, isMenuOpen }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isMenuOpen) {
      toggleMenu(); // Cierra el menú si está abierto
    }
    navigate('/'); 
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img className='logo' alt='logo de antigal' src='/images/AntigalLogo.png'/>
    </div>
  );
};

export default Logo;
