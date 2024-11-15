import React, { useState, useEffect } from 'react';
import OfferCard from '../common/OfferCard';
import { getVisibleItems } from '../../utils/screenUtils';
import { useSwipeable } from 'react-swipeable';

const SegundaSection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productos, setProductos] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado para cargar productos
  const [error, setError] = useState(null); // Estado para manejar errores
  const visibleItems = getVisibleItems(windowWidth); // Productos visibles basado en el tamaño de la pantalla

  // Manejar el redimensionamiento de la ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Obtener productos desde el API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('https://www.antigal.somee.com/api/Product/home');
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        console.log(data); 
        setProductos(data.data.$values); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [productos]);

  // Funciones para avanzar y retroceder en el carrusel
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleItems) % Math.max(productos.length, 1));
  };
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - visibleItems;
      return newIndex < 0 ? (Math.max(productos.length, 1) + newIndex) % Math.max(productos.length, 1) : newIndex;
    });
  };

  // Configurar los handlers de swipe
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Generar los productos a mostrar, asegurando el loop
  const displayedProducts = productos.length > 0 ? Array.from({ length: visibleItems }, (_, i) => {
    return productos[(currentIndex + i) % productos.length];
  }) : [];

  // Calcular cuántos puntos mostrar en función de los productos visibles
  const numDots = Math.ceil(productos.length / visibleItems);

  // Manejar los puntos de paginación
  const handleDotClick = (index) => {
    setCurrentIndex(index * visibleItems);
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section
      className={`segundaSection ${windowWidth > 1080 ? 'fondoBlanco' : ''}`}
      style={{ backgroundImage: windowWidth > 1080 ? 'none' : "url('/images/fondoCarruselOffertas.jpg')" }}
    >
      <h2 className="tituloOfertas">TOP PRODUCTOS RECOMENDADOS</h2>
      <div className="carousel" {...handlers}>
      {displayedProducts.map((producto, index) => (
  producto && (
    <OfferCard
      key={producto.idProducto} 
      producto={producto}
      isDesktop={windowWidth > 1080}
      reverse={index % 2 === 1}
            />
          )
      ))}
      </div>

      <div className="pagination">
        {Array.from({ length: numDots }).map((_, index) => (
          <div
            key={index}
            className={`dot ${Math.floor(currentIndex / visibleItems) === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
 </div>

      {/* Botones para desktop */}
      {windowWidth > 1080 && (
        <div className="navigation-buttons">
          <img className='prevButton' src='./images/flechaCarruselDesktop.svg' onClick={handlePrev} alt='botón back de Antigal' />
          <img className='nextButton' src='./images/flechaCarruselDesktop.svg' onClick={handleNext} alt='botón next de Antigal' />
        </div>
      )}
    </section>
  );
};

export default SegundaSection;