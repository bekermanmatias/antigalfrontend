// src/components/admin/categories/CategoryList.js
import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="category-list">
      {categories.length === 0 ? (
        <p>No hay categorías disponibles.</p>
      ) : (
        categories.map((category) => (
          <CategoryItem
            key={category.idCategoria}
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default CategoryList;

