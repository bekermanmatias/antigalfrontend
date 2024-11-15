// src/utils/categoryUtils.js

// Obtener todas las categorías de localStorage
export const getCategories = () => {
    const categories = localStorage.getItem('categories');
    return categories ? JSON.parse(categories) : [];
  };
  
  // Guardar todas las categorías en localStorage
  export const saveCategories = (categories) => {
    localStorage.setItem('categories', JSON.stringify(categories));
  };
  
  // Agregar una nueva categoría
  export const addCategory = (category) => {
    const categories = getCategories();
    categories.push(category);
    saveCategories(categories);
  };
  
  // Actualizar una categoría existente
  export const updateCategory = (updatedCategory) => {
    const categories = getCategories();
    const newCategories = categories.map((category) =>
      category.idCategoria === updatedCategory.idCategoria ? { ...category, ...updatedCategory } : category
    );
    saveCategories(newCategories);
  };
  
  // Eliminar una categoría
  export const deleteCategory = (idCategoria) => {
    const categories = getCategories();
    const newCategories = categories.filter((category) => category.idCategoria !== idCategoria);
    saveCategories(newCategories);
  };
  