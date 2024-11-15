// src/components/common/UserIconDos.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const UserIconDos = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  // Manejar clics fuera del menú
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Funciones de navegación
  const goToProfile = () => {
    navigate('/profile');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <article className='sessionContainer' ref={menuRef}>
      {isMenuOpen && (
        <ul className='user-menu'>
          {auth.accessToken ? (
            <>
              <li onClick={goToProfile}>Perfil</li>
              <li onClick={handleLogout}>Cerrar Sesión</li>
            </>
          ) : (
            <>
              <li onClick={() => navigate('/register')}>Registrarse</li>
              <li onClick={() => navigate('/login')}>Iniciar Sesión</li>
            </>
          )}
        </ul>
      )}
      <div className="user-icon-container">
        <img
          src="/icons/userIcon.svg"
          alt="user icon"
          onClick={toggleMenu}
          className="user-icon"
        />
      </div>
    </article>
  );
};

export default UserIconDos;