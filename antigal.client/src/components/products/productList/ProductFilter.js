// ProductFilter.js
import React, { useState, useEffect } from 'react';

const ProductFilter = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('recientes'); // Predeterminado en "recientes"

  useEffect(() => {
    // Llamar a onFilterChange cuando se monta el componente
    onFilterChange(selectedFilter);
  }, [selectedFilter, onFilterChange]);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setSelectedFilter(filterValue);
    onFilterChange(filterValue);
  };

  return (
    <div className="product-filter">
      <h3>Ordenar por</h3>
      <select value={selectedFilter} onChange={handleFilterChange}>
        <option value="recientes">Más Recientes</option>
        <option value="antiguos">Mas Antiguos</option>
        <option value="precioAscendente">Precio Ascendente</option>
        <option value="precioDescendente">Precio Descendente</option>
      </select>
    </div>
  );
};

export default ProductFilter;