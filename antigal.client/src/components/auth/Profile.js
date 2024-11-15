// src/pages/Profile.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div>Cargando perfil...</div>;
  }

  if (!isAuthenticated) {
    return <div>No estás autenticado.</div>;
  }

  return (
    <div className="profile-page">
      <h2>Perfil de Usuario</h2>
      <img src={user.picture} alt={user.name} />
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
    