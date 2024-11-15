// src/components/admin/products/AdminProductItem.js
import React, { useState, useEffect } from 'react';

const AdminProductItem = ({ product, onEdit, onDelete }) => {
  const {
    idProducto,
    nombre,
    precio,
    imagenUrls, // Cambiado de 'imagen' a 'imagenes'
    descripcion,
    marca,
    stock,
    disponible,
    codigoBarras,
  } = product;

  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (imagenUrls && imagenUrls.length > 0) {
      // Si la imagen es una URL (cadena), úsala directamente
      // Si es un objeto File, crea una URL para previsualización
      if (typeof imagenUrls === 'string') {
        setImageSrc(imagenUrls);
      } else {
        const objectUrl = URL.createObjectURL(imagenUrls);
        setImageSrc(objectUrl);

        // Limpia la URL creada para evitar fugas de memoria
        return () => URL.revokeObjectURL(objectUrl);
      }
    } else {
      setImageSrc('');
    }
  }, [imagenUrls]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-item">
      <div className="product-img">
        {imagenUrls && !imageError ? (
          <img src={imagenUrls.$values[0]} alt={nombre} onError={handleImageError} />
        ) : (
          <div className="no-image">Sin Imagen</div>
        )}
      </div>
      <div className="product-info">
        <div className="top-section">
          <h2>{nombre}</h2>
          <p>{descripcion}</p>
        </div>
        <div className="bottom-section">
          <p>Precio: ${precio.toFixed(2)}</p>
          <p>Stock: {stock}</p>
          <p>Marca: {marca}</p>
          <p>Código de Barras: {codigoBarras}</p>
          <p>Disponible: {disponible ? 'Sí' : 'No'}</p>
        </div>
        <div className="product-button">
          <button className="mod-btn" onClick={() => onEdit(product)}>
            Modificar
          </button>
          <button className="delete-btn" onClick={() => onDelete(idProducto)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductItem;
