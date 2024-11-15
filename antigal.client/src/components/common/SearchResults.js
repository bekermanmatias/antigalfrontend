// src/components/common/SearchResults.jsx
import React from "react";

const SearchResults = ({ loading, searchResults, searchTerm, items, onItemClick }) => {
  if (loading) {
    return <h4>Cargando...</h4>;
  }

  if (searchResults.length > 0) {
    return (
      <>
        <h4>Resultados de la Búsqueda</h4>
        <ul>
          {searchResults.map((producto) => (
            <li key={producto.idProducto} onClick={() => onItemClick(producto)}>
              {producto.nombre} - {producto.marca}
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (searchTerm.trim() === "") {
    return (
      <>
        <h4>Lo más buscado</h4>
        <ul>
        {items.map((item) => (
              <li key={item.idProducto} onClick={() => onItemClick(item)}>
                {item.nombre}
              </li>
          ))}
        </ul>
      </>
    );
  }

  return <h4>No se encontraron resultados.</h4>;
};

export default SearchResults;