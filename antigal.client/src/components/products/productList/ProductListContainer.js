import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import ProductFilter from './ProductFilter';
import CategoryList from '../../categories/CategoryList';
import Breadcrumb from '../../breadcrumb/Breadcrumb';
import CartPreview from '../../carts/CartPreview'; // Importamos el CartPreview
import { useLocation } from 'react-router-dom';
import LoadingSVG from '../../common/LoadingSVG'; // Animación de carga
import ErrorAnimation from '../../common/ErrorAnimation'; // Animación de error
import Banner from '../../common/Banner';
import formatCamelCase from '../../../utils/formatCamelCase';

const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);  // Estado para almacenar las categorías con el formato {name, count}
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(false);    // Estado de error
  const [filter, setFilter] = useState('');

  const location = useLocation();  // Para Breadcrumb dinámico

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      const useBackend = true; // Cambia este flag a true para conectar con el backend
      let fetchURL = useBackend
        ? 'https://www.antigal.somee.com/api/Product/getProducts'
        : 'https://fakestoreapi.com/products';
  
      // Modificar la URL según el filtro seleccionado
      if (filter) {
        if (filter === 'antiguos' || filter === 'recientes') {
          fetchURL += `?orden=${filter}`;
        } else if (filter === 'precioAscendente' || filter === 'precioDescendente') {
          fetchURL += `?precio=${filter === 'precioAscendente' ? 'ascendente' : 'descendente'}`;
        }
      }

      try {
        // Primera llamada: Obtener productos
        const response = await fetch(fetchURL);
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        console.log("la data es:  ", data);

        if (data.data && data.data.$values && Array.isArray(data.data.$values)) {
          // Adaptar los datos de los productos
          const adaptedData = data.data.$values.map(item => ({
            id: item.idProducto,           // Mapear idProducto a id
            name: item.nombre,             // Mapear nombre a name
            brand: item.marca,             // Mapear marca a brand
            description: item.descripcion, // Mapear descripcion a description
            barcode: item.codigoBarras,    // Mapear codigoBarras a barcode
            available: item.disponible,    // Mapear disponible a available
            featured: item.destacado,      // Mapear destacado a featured
            price: item.precio,            // Mapear precio a price
            stock: item.stock,             // Mapear stock a stock
            images: item.imagenUrls.$values[0] || 'icons/por-defecto.png',         // Mapear imagenes a images
            categories: [],                // Inicializar categorías vacías
          }));

          // Segunda llamada: Obtener categorías para cada producto
          const productsWithCategories = await Promise.all(
            adaptedData.map(async (product) => {
              const fetchURLCategory = `https://www.antigal.somee.com/api/ProductCategory/categorias/${product.id}`;
              try {
                const responseCategory = await fetch(fetchURLCategory);
                if (!responseCategory.ok) {
                  throw new Error(`Error al obtener categorías para el producto ${product.id}`);
                }
                const dataCategory = await responseCategory.json();

                // Acceso a la estructura de la respuesta
                if (dataCategory.data && dataCategory.data.$values && Array.isArray(dataCategory.data.$values)) {
                  // Asumimos que cada categoría tiene un campo 'nombre'
                  const formattedCategories = dataCategory.data.$values.map(cat => formatCamelCase(cat.nombre));
                  return { ...product, categories: formattedCategories };
                } else {
                  return { ...product, categories: [] };
                }
              } catch (errorCategory) {
                console.error(`Error al obtener categorías para el producto ${product.id}: `, errorCategory);
                return { ...product, categories: [] };
              }
            })
          );
          console.log("los productos con  categorias son: ", productsWithCategories);

          // Actualizar el estado de productos
          setProducts(productsWithCategories);
          setFilteredProducts(productsWithCategories); // Inicialmente todos los productos

          // Generar un objeto para contar productos por categoría
          const categoryCount = {};

          productsWithCategories.forEach(product => {
            product.categories.forEach(category => {
              categoryCount[category] = (categoryCount[category] || 0) + 1;
            });
          });

          // Formatear las categorías como {name, count} para el componente CategoryList
          const formattedCategories = Object.entries(categoryCount).map(([name, count]) => ({
            name,
            count,
          }));
          console.log("formato",formattedCategories);
          setCategories(formattedCategories);  // Actualizar el estado con las categorías formateadas
          setLoading(false); 
          setError(false); 
        } else {
          throw new Error('Formato de datos incorrecto');
        }
      } catch (err) {
        console.error('Error al obtener productos:', err);
        setLoading(false);  // Ya no está cargando
        setError(true);     // Ha ocurrido un error
      }
    };

    fetchProductsAndCategories();
  }, [filter]);

  // Alternar el estado del dropdown de categorías en mobile
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);  // Cambio a una función que toma el estado anterior
  };

  // Función para manejar el filtrado de categorías
const handleCategoryClick = (categoryName) => {
  if (categoryName === selectedCategory) {
    setFilteredProducts(products); // Mostrar todos los productos si se deselecciona la categoría
    setSelectedCategory(null);
  } else {
    // Filtrar productos si la categoría seleccionada está en el arreglo de categorías del producto
    const filtered = products.filter(product => 
      product.categories && product.categories.includes(categoryName)
    );
    setFilteredProducts(filtered);
    setSelectedCategory(categoryName); // Establecer la categoría seleccionada
  }
};

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="products-page">
      
      <div className="mobile-filters">
        <button className="filter-button" onClick={toggleDropdown}>
          <img src="/icons/filterIcon.svg" alt="Filter" />
        </button>
        <Breadcrumb currentLocation={location.pathname} /> 
      </div>

      
      {isDropdownOpen && (
        <div className="categories-dropdown open">
          <CategoryList
            categories={categories}
            onCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
          />
        </div>
      )}

      <div className='asideYProductos'>
        <aside className="categories-aside">
          <Breadcrumb currentLocation={location.pathname} />
          <CategoryList
            categories={categories}
            onCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
          />
        </aside>

        <div className="product-list-container">
          {loading ? (
            // Si está cargando, mostramos la animación de carga
            <div className="loading-container">
              <LoadingSVG />
            </div>
          ) : error ? (
            // Si hay error, mostramos la animación de error
            <div className="error-container">
              <ErrorAnimation />
              <h2>Oops... Algo salió mal. Intenta de nuevo más tarde.</h2>
            </div>
          ) : (
            <>
              <Banner />
              <ProductFilter onFilterChange={handleFilterChange} />
              <ProductList products={filteredProducts} />
            </>
          )}
        </div>

        <div className="cart-preview-container">
          <CartPreview />
        </div>
      </div>
    </div>
  );
};

export default ProductListContainer;