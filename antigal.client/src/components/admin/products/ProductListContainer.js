// src/components/admin/products/ProductListContainer.js
import React, { useState, useEffect } from 'react';
import AdminNav from '../AdminNav';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import Swal from 'sweetalert2';
import initialProducts from '../../../data/initialProducts'; 

const AdminProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const useBackend = true; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (useBackend) {
          // Obtener productos desde el backend
          const response = await fetch('https://www.antigal.somee.com/api/Product/getProducts');
          if (!response.ok) {
            throw new Error('Error al obtener productos del backend');
          }
          const data = await response.json();
          setProducts(data.data.$values);
        } else {
          // Cargar productos desde localStorage o desde los datos iniciales
          const storedProducts = localStorage.getItem('products');
          if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
          } else {
            setProducts(initialProducts);
            // Inicializar localStorage con initialProducts si es necesario
            localStorage.setItem('products', JSON.stringify(initialProducts));
          }
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
        Swal.fire('Error', 'No se pudieron obtener los productos.', 'error');
      }
    };

    fetchProducts();
  }, [useBackend]);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  // Función para actualizar localStorage (si no usas backend)
  const updateLocalStorage = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  // Función para agregar un nuevo producto
  const handleAddProduct = async (formData) => {
    try {
      // Extraer datos del FormData
      const producto = JSON.parse(formData.get('producto') || '{}');
      const images = formData.getAll('imagenes');
      console.log(producto)
      // Enviar solicitud POST a /api/Product/addProduct
      const response = await fetch('https://www.antigal.somee.com/api/Product/addProduct', {
        method: 'POST',
        body: JSON.stringify({
          idProducto: 0, // Según tu API, el backend generará este ID
          ...producto,
          imagenUrls: [], // Inicialmente vacío; se llenará después de subir imágenes
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el producto.');
      }

      const data = await response.json();
      if (!data.isSuccess) {
        throw new Error(data.message || 'Error al crear el producto.');
      }
      console.log(data)
      const createdProduct = data.data; // Suponiendo que la respuesta contiene el producto creado con idProducto
      console.log(createdProduct)
      // Subir imágenes una por una
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageFormData = new FormData();
        if (!createdProduct.idProducto) {
          throw new Error("El productoId es requerido.");
        }
        
        imageFormData.append('productoId', createdProduct.idProducto);
        imageFormData.append('file', image);
        console.log(imageFormData)

        const uploadResponse = await fetch('https://www.antigal.somee.com/api/Image/upload', {
          method: 'POST',
          body: imageFormData,
        });
        console.log(uploadResponse)
        if (!uploadResponse.ok) {
          const uploadErrorData = await uploadResponse.json();
          throw new Error(uploadErrorData.message || `Error al subir la imagen ${image.name}.`);
        }

        const uploadData = await uploadResponse.json();
        if (!uploadData.isSuccess) {
          throw new Error(uploadData.message || `Error al subir la imagen ${image.name}.`);
        }
        console.log(uploadData)
        // Opcional: Actualizar el producto con la URL de la imagen si es necesario
        // Esto depende de cómo tu API maneje las URLs de imágenes después de la subida
      }

      // Actualizar el estado local de productos
      const newProducts = [...products, createdProduct];
      setProducts(newProducts);

      if (!useBackend) {
        // Si no usas backend, actualiza localStorage
        updateLocalStorage(newProducts);
      }

      Swal.fire('¡Éxito!', 'Producto agregado correctamente.', 'success');
      handleCloseModal();
    } catch (error) {
      console.error('Error al agregar producto:', error);
      Swal.fire('Error', error.message || 'No se pudo agregar el producto.', 'error');
    }
  };
  
  // Función para editar un producto existente
  const handleEditProduct = async (formData) => {
    try {
      // Extraer datos del FormData
      const idProducto = parseInt(formData.get('idProducto'));
      const fields = JSON.parse(formData.get('fields') || '{}');
      const images = formData.getAll('imagenes');

      // Enviar solicitud PUT a /api/Product/updateProduct
      const response = await fetch('https://www.antigal.somee.com/api/Product/updateProduct', {
        method: 'PUT', // Asegúrate de que tu API utiliza PUT o PATCH para actualizar
        body: JSON.stringify({
          idProducto,
          ...fields,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el producto.');
      }

      const data = await response.json();
      if (!data.isSuccess) {
        throw new Error(data.message || 'Error al actualizar el producto.');
      }

      // Subir nuevas imágenes si existen
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const imageFormData = new FormData();
          imageFormData.append('productoId', idProducto);
          imageFormData.append('file', image);

          const uploadResponse = await fetch('https://www.antigal.somee.com/api/Image/upload', {
            method: 'POST',
            body: imageFormData,
          });

          if (!uploadResponse.ok) {
            const uploadErrorData = await uploadResponse.json();
            throw new Error(uploadErrorData.message || `Error al subir la imagen ${image.name}.`);
          }

          const uploadData = await uploadResponse.json();
          if (!uploadData.isSuccess) {
            throw new Error(uploadData.message || `Error al subir la imagen ${image.name}.`);
          }

          // Opcional: Actualizar el producto con la URL de la imagen si es necesario
        }
      }

      // Actualizar el estado local de productos
      const updatedProduct = { idProducto, ...fields };
      const newProducts = products.map((prod) =>
        prod.idProducto === idProducto ? { ...prod, ...updatedProduct } : prod
      );
      setProducts(newProducts);

      if (!useBackend) {
        // Si no usas backend, actualiza localStorage
        updateLocalStorage(newProducts);
      }

      Swal.fire('¡Éxito!', 'Producto actualizado correctamente.', 'success');
      handleCloseModal();
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      Swal.fire('Error', error.message || 'No se pudo actualizar el producto.', 'error');
    }
  };

  // Función para eliminar un producto
  const handleDeleteProduct = (idProducto) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (useBackend) {
            // Enviar solicitud DELETE a /api/Product/deleteProduct/{idProducto}
            const response = await fetch(`https://www.antigal.somee.com/api/Product/deleteProduct/${idProducto}`, {
              method: 'DELETE',
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Error al eliminar el producto.');
            }

            const data = await response.json();
            if (!data.isSuccess) {
              throw new Error(data.message || 'Error al eliminar el producto.');
            }
          }

          // Actualizar el estado local de productos
          const newProducts = products.filter((prod) => prod.idProducto !== idProducto);
          setProducts(newProducts);

          if (!useBackend) {
            // Si no usas backend, actualiza localStorage
            updateLocalStorage(newProducts);
          }

          Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
        } catch (error) {
          console.error('Error al eliminar producto:', error);
          Swal.fire('Error', error.message || 'No se pudo eliminar el producto.', 'error');
        }
      }
    });
  };

  return (
    <div className="admin-page"> {/* Asegúrate de que el nombre de la clase sea consistente */}
      <AdminNav />
      <div className="content">
        <div className="new-btn">
          <button onClick={handleShowModal}>+ Nuevo Producto</button>
        </div>
        <ProductForm
          show={showModal}
          onClose={handleCloseModal}
          onSave={editingProduct ? handleEditProduct : handleAddProduct}
          product={editingProduct}
        />
        <ProductList
          products={products}
          onEdit={(product) => {
            setEditingProduct(product);
            setShowModal(true);
          }}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default AdminProductListContainer;