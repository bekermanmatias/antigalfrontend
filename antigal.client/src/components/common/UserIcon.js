// src/components/common/UserIcon.js
import React, { useState } from 'react';

const UserIcon = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = false; // Aquí manejarás la lógica de autenticación

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="user-icon-container">
      <img
        src="/icons/userIcon.svg"
        alt="user icon"
        onClick={toggleMenu}
        className="user-icon"
        style={{ cursor: 'pointer' }}
      />
      {isMenuOpen && (
        <ul className="user-menu">
          {isAuthenticated ? (
            <>
              <li>Perfil</li>
              <li>Cerrar Sesión</li>
            </>
          ) : (
            <>
              <li>Ingresar</li>
              <li>Registrarse</li>
            </>
          )}
        </ul>
      )}    
    </div>
    
  );
};

export default UserIcon;