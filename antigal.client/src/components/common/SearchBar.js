// src/components/common/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LupaWidget from "./LupaWidget";
import { toast } from "react-toastify";
import SearchResults from "./SearchResults";
import LoadingSVG from "./LoadingSVG"; // Importar la animación de carga


const SearchBar = ({ isVisible, onClose, isMobile }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const items = [
    { nombre: "Alfajor Black Chocolate", idProducto: 21 }, // Ejemplo de otro producto
    { nombre: "Alfajor Vainilla", idProducto: 22 },
    { nombre: "Multivitamínico Completo", idProducto: 4 },
    { nombre: "Mix de Frutos Secos y Semillas", idProducto: 8 },
    { nombre: "Proteína Whey Isolate", idProducto: 1 }, // Producto hardcodeado
  ];

  // Función para realizar la búsqueda
  const handleSearch = async () => {
    console.log("Término de búsqueda:", searchTerm);
    if (searchTerm.trim() === "") {
      toast.info("Por favor, ingresa un término de búsqueda.");
      return;
    }

    setLoading(true);
    setError("");
    setSearchResults([]);

    try {
      const response = await fetch(
        `https://localhost:7255/api/Product/getProductByTitle/${encodeURIComponent(searchTerm)}`,
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
        const productos = data.data.$values; // Verifica esta estructura
        console.log(data);
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
  const handleItemClick = (producto) => {
    if (typeof producto === "string") {
      // Sugerencia (string)
      setSearchTerm(producto);
      handleSearch();
    } else {
      // Producto con idProducto
      setSearchTerm(producto.nombre);
      navigate(`/products/${producto.idProducto}`);
      onClose(); // Cerrar la barra de búsqueda al seleccionar un producto
    }
  };

  // Función para manejar la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Implementar debounce para mejorar el rendimiento en mobile
  useEffect(() => {
    if (!isMobile) return; // Solo aplicar debounce en mobile

    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        handleSearch();
      }
    }, 500); // Retraso de 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, isMobile]);

  return (
    <div
      className={`search-bar-container ${isVisible ? "visible" : "hidden"} ${
        isMobile ? "mobile" : ""
      }`}
    >
      <div
        className={`toggle-container ${isVisible ? "visible" : "hidden"} ${
          isMobile ? "mobile" : ""
        }`}
      >
        <div className="top-section">
          <h2>¿Qué se antoja hoy? ( ͡👁️ ͜ʖ ͡👁️)</h2>
          <button className="close-searchbar" onClick={onClose}>
            <i className="fa-solid fa-x"></i>
          </button>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar producto"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress} // Cambiado a onKeyDown
          />
          <button className="clear-searchbar" onClick={handleClearSearch}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
          <LupaWidget onClick={handleSearch} />
        </div>

        {/* Mostrar animación de carga si está cargando */}
        {loading && (
          <div className="loading-container">
            <LoadingSVG />
          </div>
        )}

        {/* Usar el componente SearchResults */}
        {!loading && (
          <div className="dropdown">
            <SearchResults
              loading={loading}
              searchResults={searchResults}
              searchTerm={searchTerm}
              items={items}
              onItemClick={handleItemClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;