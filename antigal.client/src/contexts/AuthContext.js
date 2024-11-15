// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: null,
    refreshToken: null, // Opcional: Si implementas Refresh Tokens
    user: null,
  });

  // Al cargar la aplicación, verificar si hay un token almacenado
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken'); // Opcional
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        // Verificar si el token no ha expirado
        if (decoded.exp * 1000 > Date.now()) {
          setAuth({
            accessToken,
            refreshToken,
            user: decoded,
          });
        } else {
          // Token expirado
          logout();
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        logout();
      }
    }
  }, []);

  const login = (accessToken, refreshToken = null) => {
    const decoded = jwtDecode(accessToken);
    setAuth({
      accessToken,
      refreshToken,
      user: decoded,
    });
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  };

  const logout = () => {
    setAuth({
      accessToken: null,
      refreshToken: null,
      user: null,
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};