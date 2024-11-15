// src/pages/RecuperarContrasenia.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { recoverPasswordSchema } from '../../validations/validationSchemas';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';

const RecuperarContrasenia = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverPasswordSchema),
  });

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  const onSubmit = async (data) => {
    const sanitizedEmail = sanitizeInput(data.email);

    try {
      const response = await fetch('https://www.antigal.somee.com/api/auth/recuperar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: sanitizedEmail }),
      });

      if (response.ok) {
        toast.success('Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico.');
        navigate('/login');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al solicitar recuperación de contraseña.');
      }
    } catch (err) {
      console.error('Error al solicitar recuperación de contraseña:', err);
      toast.error('Error al solicitar recuperación de contraseña. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="auth-page fondoAuth">
      <div className="auth-container">
        <img src="./icons/iconoAntigal.png" alt="Logo" />
        <h2>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              placeholder="Ingresa tu correo electrónico"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <button type="submit" className="cta-button primary">
            Enviar Enlace
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecuperarContrasenia;
