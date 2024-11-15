// src/components/common/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.accessToken) {
    // Usuario no autenticado
    return <Navigate to="/login" />;
  }

  if (roles.length > 0) {
    // Verificar si el usuario tiene alguno de los roles requeridos
    const userRoles = auth.user.roles || []; // Asumiendo que el JWT incluye los roles en el campo 'roles'
    const hasRole = roles.some(role => userRoles.includes(role));
    if (!hasRole) {
      // Usuario no tiene los roles necesarios
      return <Navigate to="/unauthorized" />;
    }
  }

  // Usuario autenticado (y autorizado, si se especifican roles)
  return children;
};

export default ProtectedRoute;
