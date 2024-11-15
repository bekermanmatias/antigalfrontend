// src/components/admin/categories/CategoryForm.js
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

const CategoryForm = ({ show, onClose, onSave, category }) => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [imagenFile, setImagenFile] = useState(null); // Para almacenar el archivo seleccionado
  const [imagePreview, setImagePreview] = useState(''); // Para la previsualización de la imagen

  // Ref para el input de imagen
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (category) {
      setNombre(category.nombre);
      setDescripcion(category.descripcion);
      setImagen(category.imagen || '');
      setImagenFile(null); // Resetear el archivo
      setImagePreview(category.imagen || '');
    } else {
      setNombre('');
      setDescripcion('');
      setImagen('');
      setImagenFile(null);
      setImagePreview('');
    }
  }, [category]);

  // Validaciones del formulario
  const validateForm = () => {
    if (nombre.trim() === '' || descripcion.trim() === '') {
      Swal.fire('Error', 'Los campos Nombre y Descripción son obligatorios.', 'error');
      return false;
    }
    return true;
  };

  // Manejador de cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar el tipo y tamaño del archivo
      if (!file.type.startsWith('image/')) {
        Swal.fire('Error', 'Solo se permiten archivos de imagen.', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        Swal.fire('Error', 'La imagen no debe exceder los 5MB.', 'error');
        return;
      }
      setImagenFile(file);

      // Crear una previsualización de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Si se elimina la imagen seleccionada
      setImagenFile(null);
      setImagePreview(imagen || '');
    }
  };

  // Manejador de eliminación de la imagen seleccionada
  const handleRemoveImage = () => {
    setImagenFile(null);
    setImagePreview(imagen || '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    
    // Incluir 'idCategoria' si se está editando
    if (category) {
      formData.append('idCategoria', category.idCategoria);
    }

    formData.append('category', JSON.stringify({ nombre, descripcion }));
    if (imagenFile) {
      formData.append('imagen', imagenFile);
    }

    onSave(formData);
    onClose();

    // Resetear el formulario
    setNombre('');
    setDescripcion('');
    setImagen('');
    setImagenFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Manejadores para cerrar el modal al hacer clic fuera o en la "X"
  const handleOverlayClick = (event) => {
    if (event.target.className === 'form-overlay') {
      onClose();
    }
  };

  const handleFormClick = (event) => {
    event.stopPropagation();
  };

  // Condición para mostrar o no el formulario
  if (!show) {
    return null;
  }

  return (
    <div className="form-overlay" onClick={handleOverlayClick}>
      <div className="form-container" onClick={handleFormClick}>
        <div className="form-header">
          <h2>{category ? 'Editar Categoría' : 'Crear Nueva Categoría'}</h2>
          <button type="button" className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form className="category-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">
              Nombre de la categoría<span className="required">*</span>:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">
              Descripción<span className="required">*</span>:
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagen">Subir Imagen:</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button type="button" className="remove-image-button" onClick={handleRemoveImage}>
                  &times;
                </button>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              {category ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
