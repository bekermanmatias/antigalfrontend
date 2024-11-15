// src/components/admin/products/ProductForm.js
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import initialCategories from '../../../data/initialCategories'; 

const ProductForm = ({ show, onClose, onSave, product }) => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagenes, setImagenes] = useState([]); 
  const [descripcion, setDescripcion] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [marca, setMarca] = useState('');
  const [stock, setStock] = useState('');
  const [disponible, setDisponible] = useState(1);
  const [productoDestacado, setProductoDestacado] = useState(0); 

  // Estado para las categorías
  const [categorias, setCategorias] = useState([]);

  // Estado para detectar cambios (solo para edición)
  const [initialData, setInitialData] = useState({});

  // Ref para el input de imágenes
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategorias(JSON.parse(storedCategories));
    } else {
      setCategorias(initialCategories);
    }
  }, []);

  useEffect(() => {
    if (product) {
      setNombre(product.nombre || '');
      setPrecio(product.precio !== undefined ? product.precio.toString() : '');
      setCategoria(product.categoria || '');
      setDescripcion(product.descripcion || '');
      setCodigoBarras(product.codigoBarras || '');
      setMarca(product.marca || '');
      setStock(product.stock !== undefined ? product.stock.toString() : '');
      setDisponible(product.disponible !== undefined ? product.disponible : 1);
      setProductoDestacado(product.destacado || 0);
      setImagenes(product.imagenes || []);
      
      // Guardar datos iniciales para detectar cambios
      setInitialData({
        nombre: product.nombre || '',
        precio: product.precio !== undefined ? product.precio.toString() : '',
        categoria: product.categoria || '',
        descripcion: product.descripcion || '',
        codigoBarras: product.codigoBarras || '',
        marca: product.marca || '',
        stock: product.stock !== undefined ? product.stock.toString() : '',
        disponible: product.disponible !== undefined ? product.disponible : 1,
        destacado: product.destacado || 0,
      });
    } else {
      setNombre('');
      setPrecio('');
      setCategoria('');
      setDescripcion('');
      setCodigoBarras('');
      setMarca('');
      setStock('');
      setDisponible(1);
      setProductoDestacado(0);
      setImagenes([]);
      setInitialData({});
    }
  }, [product]);

  // Validaciones del formulario
  const validateForm = () => {
    if (
      nombre.trim() === '' ||
      precio.trim() === '' ||
      stock.trim() === '' ||
      descripcion.trim() === ''
    ) {
      Swal.fire('Error', 'Los campos Nombre, Precio, Stock y Descripción son obligatorios.', 'error');
      return false;
    }

    if (isNaN(precio) || parseFloat(precio) <= 0) {
      Swal.fire('Error', 'El precio debe ser un número positivo.', 'error');
      return false;
    }

    if (isNaN(stock) || parseInt(stock) < 0) {
      Swal.fire('Error', 'El stock debe ser un número entero no negativo.', 'error');
      return false;
    }

    if (codigoBarras && !/^\d+$/.test(codigoBarras)) {
      Swal.fire('Error', 'El código de barras debe contener solo números.', 'error');
      return false;
    }

    if (imagenes.length > 6) {
      Swal.fire('Error', 'No puedes subir más de 6 imágenes por producto.', 'error');
      return false;
    }

    return true;
  };

  // Función para detectar campos modificados (solo para edición)
  const getModifiedFields = () => {
    const modified = {};

    if (product) {
      if (nombre !== initialData.nombre) modified.nombre = nombre;
      if (precio !== initialData.precio) modified.precio = parseFloat(precio);
      if (categoria !== initialData.categoria) modified.categoria = categoria;
      if (descripcion !== initialData.descripcion) modified.descripcion = descripcion;
      if (codigoBarras !== initialData.codigoBarras) modified.codigoBarras = codigoBarras;
      if (marca !== initialData.marca) modified.marca = marca;
      if (stock !== initialData.stock) modified.stock = parseInt(stock);
      if (disponible !== initialData.disponible) modified.disponible = disponible;
      if (productoDestacado !== initialData.destacado) modified.destacado = productoDestacado;
    } else {
      // Para creación, todos los campos relevantes deben ser enviados
      modified.nombre = nombre;
      modified.precio = parseFloat(precio);
      modified.categoria = categoria;
      modified.descripcion = descripcion;
      modified.codigoBarras = codigoBarras;
      modified.marca = marca;
      modified.stock = parseInt(stock);
      modified.disponible = disponible;
      modified.destacado = productoDestacado;
    }

    return modified;
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let formData = new FormData();

    if (product) {
      const modifiedFields = getModifiedFields();

      if (Object.keys(modifiedFields).length === 0 && imagenes.length === 0) {
        Swal.fire('Información', 'No hay cambios para guardar.', 'info');
        return;
      }

      formData.append('idProducto', product.idProducto); // Asegúrate de enviar el ID del producto
      formData.append('fields', JSON.stringify(modifiedFields));

    } else {
      // Crear un objeto de producto
      const newProduct = {
        nombre,
        precio: parseFloat(precio),
        categoria,
        descripcion,
        codigoBarras,
        marca,
        stock: parseInt(stock),
        disponible,
        destacado: productoDestacado, 
      };

      // Crear FormData para enviar archivos y datos
      formData.append('producto', JSON.stringify(newProduct));
    }

    // Añadir cada imagen al FormData
    imagenes.forEach((imagen) => {
      formData.append('imagenes', imagen);
    });

    // Llamar a la función onSave pasada desde el padre
    await onSave(formData);
  };

  // Manejador para seleccionar imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imagenes.length > 6) {
      Swal.fire('Error', 'No puedes subir más de 6 imágenes por producto.', 'error');
      return;
    }
    setImagenes([...imagenes, ...files]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Manejador para eliminar una imagen seleccionada
  const handleRemoveImage = (index) => {
    setImagenes((prevImagenes) => prevImagenes.filter((_, i) => i !== index));

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Manejadores para cerrar el modal al hacer clic fuera o en la "X"
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('form-overlay')) {
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
          <h2>{product ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
          <button type="button" className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form className="product-form" onSubmit={handleSubmit}>
          {/* Primera fila: Nombre y Descripción */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">
                Nombre del producto<span className="required">*</span>:
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
          </div>

          {/* Segunda fila: Precio y Stock */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="precio">
                Precio<span className="required">*</span>:
              </label>
              <input
                type="text"
                id="precio"
                name="precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">
                Stock<span className="required">*</span>:
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Tercera fila: Categoría y Destacado */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="categoria">Categoría:</label>
              <select
                id="categoria"
                name="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.idCategoria} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group radio-group">
              <p>Destacado:</p>
              <div className="radio-options">
                <div className="radio-option">
                  <input
                    type="radio"
                    id="destacadoHome"
                    name="destacado"
                    value="Home"
                    checked={productoDestacado === 1}
                    onChange={(e) => setProductoDestacado(e.target.value)}
                  />
                  <label htmlFor="destacadoHome">Home</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    id="destacadoNo"
                    name="destacado"
                    value="No"
                    checked={productoDestacado === 0}
                    onChange={(e) => setProductoDestacado(e.target.value)}
                  />
                  <label htmlFor="destacadoNo">No</label>
                </div>
              </div>
            </div>
          </div>

          {/* Cuarta fila: Marca y Código de Barra */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="marca">Marca:</label>
              <input
                type="text"
                id="marca"
                name="marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="codigoBarra">Código de Barra:</label>
              <input
                type="number"
                id="codigoBarra"
                name="codigoBarra"
                value={codigoBarras}
                onChange={(e) => setCodigoBarras(e.target.value)}
              />
            </div>
          </div>

          {/* Quinta fila: Subir Imágenes */}
          <div className="form-group">
            <label htmlFor="imagenes">Subir imágenes (máximo 6):</label>
            <input
              type="file"
              id="imagenes"
              name="imagenes"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </div>

          {/* Mostrar vistas previas de las imágenes seleccionadas */}
          {imagenes.length > 0 && (
            <div className="image-previews">
              {imagenes.map((imagen, index) => {
                const isFile = imagen instanceof File;
                const src = isFile ? URL.createObjectURL(imagen) : imagen;
                const key = isFile ? `${imagen.name}-${index}` : `existing-${index}`;
                
                return (
                  <div key={key} className="image-preview">
                    <img
                      src={src}
                      alt={`Imagen ${index + 1}`}
                      onLoad={() => {
                        if (isFile) {
                          URL.revokeObjectURL(src); // Liberar el objeto URL después de cargar la imagen
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="remove-image-button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Sección de Botones de Acción */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              {product ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;