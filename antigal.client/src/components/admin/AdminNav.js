// src/components/admin/AdminNav.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
  return (
    <div className="admin-nav">
      <h2>Ventana del Administrador</h2>
      <nav className="admin-menu">
        <NavLink
          to="/admin/categories"
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          Categorías
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          Productos
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          Usuarios
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminNav;
