// src/pages/Login.js
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return (
    <div>
      <p>Redirigiendo al inicio de sesión...</p>
    </div>
  );
};

export default Login;
