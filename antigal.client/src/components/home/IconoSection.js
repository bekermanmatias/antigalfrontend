// src/components/Home/IconoSeccion.js
import React from 'react';
import PropTypes from 'prop-types';

// Función para limpiar el título y generar una clase CSS válida
const generarClase = (titulo) => {
  return titulo
    .normalize('NFD') // Normaliza los acentos
    .replace(/[\u0300-\u036f]/g, '') // Remueve acentos
    .toLowerCase() // Convierte a minúsculas
    .replace(/\d+/g, '') // Remueve números
    .replace(/\s+/g, '') // Remueve espacios
    .replace(/[^\w-]+/g, ''); // Remueve caracteres especiales, dejando letras, números y guiones bajos
};

const IconoSeccion = ({ titulo, parrafo, iconoAlt, iconoSrc }) => {
  const claseCSS = generarClase(titulo);

  return (
    <div className={`${claseCSS}Contenedor`}>
      <article className='contenedorIconos'>
        <div className='circuloVerdeOscuro'></div>
        <img className='icono' src={iconoSrc} alt={iconoAlt} />
      </article>
      <h4 className='titulo'>{titulo}</h4>
      <p className='parrafo'>{parrafo}</p>
    </div>
  );
};

// Definir las propiedades que el componente recibe
IconoSeccion.propTypes = {
  titulo: PropTypes.string.isRequired, // El título de la sección
  parrafo: PropTypes.string.isRequired, // El texto del párrafo de la sección
  iconoAlt: PropTypes.string.isRequired, // El texto alternativo para la imagen
  iconoSrc: PropTypes.string.isRequired, // La ruta de la imagen
};

export default IconoSeccion;
