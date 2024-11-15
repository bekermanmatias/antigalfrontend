import React, { useState } from 'react';

const PasswordInput = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="form-group">
      <label htmlFor="password">Contraseña:</label>
      <div className="password-input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          {...register('password')}
          placeholder="Ingresa tu contraseña"
          className={errors.password ? 'error' : ''}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="toggle-password"
          aria-label="Mostrar u ocultar contraseña"
        >
          {showPassword ? (
            <img src="/icons/ojo-cerrado.png" alt="Ocultar contraseña" />
          ) : (
            <img src="/icons/eojoAbierto.png" alt="Mostrar contraseña" />
          )}
        </button>
      </div>
      {errors.password && <p className="error-message">{errors.password.message}</p>}
    </div>
  );
};

export default PasswordInput;
