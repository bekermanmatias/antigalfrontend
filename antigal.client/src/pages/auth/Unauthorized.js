// src/pages/Unauthorized.js
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="unauthorized-page">
      <h2>Acceso Denegado</h2>
      <p>No tienes permisos para acceder a esta página.</p>
      <Link to="/">Volver al Inicio</Link>
    </div>
  );
};

export default Unauthorized;
