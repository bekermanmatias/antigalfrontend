import React, { useState, useEffect } from 'react';
import AdminNav from '../AdminNav';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import Swal from 'sweetalert2';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../../utils/categoryUtils';

const CategoryListContainer = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Variable para controlar el uso del backend
  const useBackend = true; // Cambia a 'true' para usar el backend

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (useBackend) {
          // Obtener categorías desde el backend
          const response = await fetch('https://www.antigal.somee.com/api/Category/getCategories');
          if (!response.ok) {
            throw new Error('Error al obtener categorías del backend'); 
          }
          const data = await response.json();
          setCategories(data.data.$values);
        } else {
          // Cargar categorías desde localStorage
          const storedCategories = getCategories();
          setCategories(storedCategories);
        }
      } catch (error) {
        console.error('Error al obtener categorías:', error);
        Swal.fire('Error', 'No se pudieron obtener las categorías.', 'error');
      }
    };

    fetchCategories();
  }, [useBackend]);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  // Función para agregar una nueva categoría
  const handleAddCategory = (formData) => {
    try {
      // Extraer datos del FormData
      const categoryData = JSON.parse(formData.get('category') || '{}');
      const imageFile = formData.get('imagen');

      // Manejar la imagen
      if (imageFile && imageFile instanceof File) {
        // Convertir la imagen a base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result;
          const newCategory = {
            ...categoryData,
            idCategoria: Date.now(), // Generar un ID único
            imagen: base64Image,
          };
          addCategory(newCategory);
          setCategories(getCategories());
          Swal.fire('¡Éxito!', 'Categoría añadida correctamente.', 'success');
        };
        reader.readAsDataURL(imageFile);
      } else {
        // Si no se proporciona imagen, proceder sin ella
        const newCategory = {
          ...categoryData,
          idCategoria: Date.now(),
        };
        addCategory(newCategory);
        setCategories(getCategories());
        Swal.fire('¡Éxito!', 'Categoría añadida correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al agregar categoría:', error);
      Swal.fire('Error', 'No se pudo agregar la categoría.', 'error');
    }
  };

  // Función para editar una categoría existente
  const handleEditCategory = (formData) => {
    try {
      // Extraer datos del FormData
      const idCategoria = parseInt(formData.get('idCategoria'));
      const categoryData = JSON.parse(formData.get('category') || '{}');
      const imageFile = formData.get('imagen');

      const updatedCategory = {
        idCategoria,
        ...categoryData,
      };

      if (imageFile && imageFile instanceof File) {
        // Convertir la imagen a base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result;
          updatedCategory.imagen = base64Image;
          updateCategory(updatedCategory);
          setCategories(getCategories());
          Swal.fire('¡Éxito!', 'Categoría actualizada correctamente.', 'success');
        };
        reader.readAsDataURL(imageFile);
      } else {
        // Si no se proporciona una nueva imagen, mantener la existente
        updateCategory(updatedCategory);
        setCategories(getCategories());
        Swal.fire('¡Éxito!', 'Categoría actualizada correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      Swal.fire('Error', 'No se pudo actualizar la categoría.', 'error');
    }
  };

  // Función para eliminar una categoría
  const handleDeleteCategory = (idCategoria) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteCategory(idCategoria);
          setCategories(getCategories());
          Swal.fire('Eliminado', 'La categoría ha sido eliminada.', 'success');
        } catch (error) {
          console.error('Error al eliminar categoría:', error);
          Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
        }
      }
    });
  };

  return (
    <div className="admin-page">
      <AdminNav />
      <div className="content">
        <div className="new-btn">
          <button onClick={handleShowModal}>+ Nueva Categoría</button>
        </div>
        <CategoryForm
          show={showModal}
          onClose={handleCloseModal}
          onSave={editingCategory ? handleEditCategory : handleAddCategory}
          category={editingCategory}
        />
        <CategoryList
          categories={categories}
          onEdit={(category) => {
            setEditingCategory(category);
            setShowModal(true);
          }}
          onDelete={handleDeleteCategory}
        />
      </div>
    </div>
  );
};

export default CategoryListContainer;