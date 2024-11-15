// src/pages/Logout.js
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
  const { logout } = useAuth0();

  useEffect(() => {
    logout({
      returnTo: window.location.origin,
    });
  }, [logout]);

  return (
    <div>
      <p>Cerrando sesión...</p>
    </div>
  );
};

export default Logout;
