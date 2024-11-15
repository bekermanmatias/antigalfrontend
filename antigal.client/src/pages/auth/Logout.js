// src/pages/auth/Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí puedes limpiar la sesión o los datos del usuario
    localStorage.removeItem("token"); // Ejemplo: eliminando el token de autenticación
    navigate("/login"); // Redirigir al usuario a la página de inicio de sesión
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
