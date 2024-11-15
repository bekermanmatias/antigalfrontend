import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from '../validations/validationSchemas';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  // Función para mostrar mensajes de éxito o error con toast
  const showToast = (message, type = 'success') => {
    type === 'success' ? toast.success(message) : toast.error(message);
  };

  // Enviar datos del formulario de contacto
  const onSubmit = async (data) => {
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, DOMPurify.sanitize(value)])
    );

    try {
      const response = await fetch(`http://localhost:5000/contacto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...sanitizedData, fecha: new Date().toISOString() }),
      });

      if (response.ok) {
        showToast('¡Tu mensaje ha sido enviado exitosamente!');
        // Solo restablece los campos de "asunto" y "mensaje"
        reset({
          nombre: data.nombre,
          email: data.email,
          asunto: '',
          mensaje: '',
        });
      } else {
        const errorData = await response.json();
        showToast(errorData.message || 'Hubo un error al enviar tu mensaje.', 'error');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      showToast('Hubo un error al enviar tu mensaje. Inténtalo de nuevo más tarde.', 'error');
    }
  };

  return (
    <div className="contacto">
      <div className="contacto-container">
        <h1>Contacto</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              {...register('nombre')}
              placeholder="Ingresa tu nombre"
              className={errors.nombre ? 'error' : ''}
            />
            {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              placeholder="Ingresa tu correo electrónico"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="asunto">Asunto:</label>
            <input
              type="text"
              id="asunto"
              {...register('asunto')}
              placeholder="Asunto de tu mensaje"
              className={errors.asunto ? 'error' : ''}
            />
            {errors.asunto && <span className="error-message">{errors.asunto.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              {...register('mensaje')}
              placeholder="Escribe tu mensaje aquí"
              className={errors.mensaje ? 'error' : ''}
              rows="5"
            ></textarea>
            {errors.mensaje && <span className="error-message">{errors.mensaje.message}</span>}
          </div>

          <button type="submit" className="cta-button primary">
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;