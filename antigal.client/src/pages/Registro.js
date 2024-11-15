// src/pages/Register.js
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Register = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect({ screen_hint: 'signup' });
  }, [loginWithRedirect]);

  return <div>Redirigiendo al registro...</div>;
};

export default Register;
