// src/components/common/NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = ({ vertical = false, onLinkClick = () => {} }) => {
  return (
    <nav className={vertical ? 'nav-vertical' : 'nav-horizontal'}>
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : undefined}
            onClick={onLinkClick}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/products" 
            className={({ isActive }) => isActive ? 'active' : undefined}
            onClick={onLinkClick}
          >
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/sobre-nosotros" 
            className={({ isActive }) => isActive ? 'active' : undefined}
            onClick={onLinkClick}
          >
            Sobre Nosotros
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/tienda-fisica" 
            className={({ isActive }) => isActive ? 'active' : undefined}
            onClick={onLinkClick}
          >
            Tienda Física
          </NavLink>
        </li>
        <li>
          {/* Actualizar el enlace a "Contacto" */}
          <NavLink 
            to="/contacto" 
            className={({ isActive }) => isActive ? 'active' : undefined}
            onClick={onLinkClick}  // Eliminar el manejador que muestra la alerta
          >
            Contacto
          </NavLink>
        </li>
      </ul>
    </nav>  
  );
};

// Definir los tipos de prop
NavBar.propTypes = {
  vertical: PropTypes.bool,
  onLinkClick: PropTypes.func,
};

export default NavBar;
