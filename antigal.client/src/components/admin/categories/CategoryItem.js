// src/components/admin/categories/CategoryItem.js
import React, { useState, useEffect } from 'react';

const CategoryItem = ({ category, onEdit, onDelete }) => {
  const { idCategoria, nombre, descripcion, imagenUrl } = category;

  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (imagenUrl) {
      setImageSrc(imagenUrl);
    } else {
      setImageSrc('');
    }
  }, [imagenUrl]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="category-item">
      <div className="category-img">
        {imageSrc && !imageError ? (
          <img src={imageSrc} alt={nombre} onError={handleImageError} />
        ) : (
          <div className="no-image">Sin Imagen</div>
        )}
      </div>
      <div className="category-info">
        <h2>{nombre}</h2>
        <p>{descripcion}</p>
        <div className="category-buttons">
          <button className="mod-btn" onClick={() => onEdit(category)}>
            Modificar
          </button>
          <button className="delete-btn" onClick={() => onDelete(idCategoria)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
