// src/components/common/SearchBarMobile.jsx
import React, { useState, useEffect } from "react";
import LupaWidget from "./LupaWidget";
import { toast } from "react-toastify"; // Importar react-toastify para notificaciones


const SearchBarMobile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Estado para resultados
  const [loading, setLoading] = useState(false); // Estado para carga
  const [error, setError] = useState(""); // Estado para errores

  const items = [
    "Alfajor Vegano",
    "Barritas de cereal",
    "Leche vegetal",
    "Producto sin tacc",
  ];

  // Función para realizar la búsqueda
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      toast.info("Por favor, ingresa un término de búsqueda.");
      return;
    }

    setLoading(true);
    setError("");
    setSearchResults([]);

    try {
      const response = await fetch(
        `https://localhost:7255/api/Product/getProductByTitle/${encodeURIComponent(
          searchTerm
        )}`, // Usar la variable de entorno para la base URL
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.isSuccess) {
        // Extraer los productos del formato de respuesta
        const productos = data.data.$values;
        setSearchResults(productos);
        if (productos.length === 0) {
          toast.info("No se encontraron productos con ese término.");
        }
      } else {
        setError(data.message || "Error al buscar productos.");
        toast.error(data.message || "Error al buscar productos.");
      }
    } catch (err) {
      console.error("Error al buscar productos:", err);
      setError("Error al buscar productos. Inténtalo de nuevo más tarde.");
      toast.error("Error al buscar productos. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar cambios en el input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Función para limpiar la búsqueda
  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setError("");
  };

  // Función para manejar clic en un ítem de resultados o sugerencias
  const handleItemClick = (item) => {
    setSearchTerm(item);
    handleSearch(); // Opcional: Realizar búsqueda al hacer clic en un ítem sugerido
  };

  // Función para manejar la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Implementar debounce para mejorar el rendimiento
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        handleSearch();
      }
    }, 500); // Retraso de 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="search-container mobile">
      <input
        type="text"
        placeholder="Buscar producto"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress} // Manejar la tecla Enter
      />
      <button className="clear-searchbar" onClick={handleClearSearch}>
        <i className="fa-solid fa-circle-xmark"></i>
      </button>
      <LupaWidget onClick={handleSearch} />

      {/* Mostrar resultados de búsqueda o sugerencias */}
      <div className="dropdown">
        {loading ? (
          <h4>Cargando...</h4>
        ) : searchResults.length > 0 ? (
          <>
            <h4>Resultados de la Búsqueda</h4>
            <ul>
              {searchResults.map((producto) => (
                <li key={producto.idProducto} onClick={() => handleItemClick(producto.nombre)}>
                  {producto.nombre} - {producto.marca}
                </li>
              ))}
            </ul>
          </>
        ) : searchTerm.trim() === "" ? (
          <>
            <h4>Lo más buscado</h4>
            <ul>
              {items.map((item, index) => (
                <li key={index} onClick={() => handleItemClick(item)}>
                  {index + 1}. {item}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h4>No se encontraron resultados.</h4>
        )}
      </div>
    </div>
  );
};

export default SearchBarMobile;