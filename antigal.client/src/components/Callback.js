// src/components/Callback.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Callback = () => {
  const { isLoading } = useAuth0();

  return (
    <div>
      {isLoading ? 'Procesando autenticación...' : 'Redirigiendo...'}
    </div>
  );
};

export default Callback;
