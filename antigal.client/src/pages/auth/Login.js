import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../validations/validationSchemas';
import DOMPurify from 'dompurify';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // Función para mostrar mensajes de éxito o error
  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  // Enviar datos del formulario de inicio de sesión
  const onSubmit = async (data) => {
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, DOMPurify.sanitize(value)])
    );

    try {
      const response = await fetch('https://www.antigal.somee.com/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        const { accessToken, refreshToken } = await response.json();
        login(accessToken, refreshToken); // Manejo de sesión si se usan tokens de actualización
        showToast('¡Inicio de sesión exitoso!');
        navigate('/');
      } else {
        const errorData = await response.json();
        showToast(errorData.message || 'Credenciales inválidas', 'error');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      showToast('Error al iniciar sesión. Inténtalo de nuevo más tarde.', 'error');
    }
  };

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="auth-page fondoAuth">
      <div className="auth-container">
        <img src="./icons/iconoAntigal.png" alt="Logo" />
        <h2>Inicio de Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="userName">Nombre de Usuario:</label>
            <input
              type="text"
              id="userName"
              {...register('userName')}
              placeholder="Ingresa tu nombre de usuario"
              autoComplete="username"
            />
            {errors.userName && <p className="error-message">{errors.userName.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
              <div
                onClick={togglePasswordVisibility}
                className="toggle-password ojo"
                aria-label="Mostrar u ocultar contraseña"
              >
                {showPassword ? (
                  <img src="/icons/ojo-cerrado.png" alt="Ocultar contraseña" />
                ) : (
                  <img src="/icons/ojoAbierto.png" alt="Mostrar contraseña" />
                )}
              </div>
            </div>
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <button type="submit" className="cta-button primary">
            Iniciar Sesión
          </button>
        </form>
        <div className="auth-links">
          <Link to="/recuperarContrasenia">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
