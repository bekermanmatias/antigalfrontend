// src/components/common/ErrorAnimation.js
import React from 'react';

const ErrorAnimation = () => {
  return (
    <div className="error-animation">
      {/* Usamos el archivo webm desde la carpeta public */}
      <video autoPlay loop muted>
        <source src="/icons/errorAnimation.webm" type="video/webm" />
        Tu navegador no soporta este video.
      </video>
    </div>
  );
};

export default ErrorAnimation;
