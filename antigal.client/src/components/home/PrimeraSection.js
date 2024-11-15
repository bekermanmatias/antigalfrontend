import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrimeraSection = () => {
  const [frascoImage, setFrascoImage] = useState('/images/imgFrasco.png');
  const navigate = useNavigate(); 
  // Cambiar la imagen cuando el ancho de la pantalla es mayor a 1080px
  const handleComprar =  () => {
    try{

      navigate('/products');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const updateFrascoImage = () => {
      if (window.innerWidth > 1080) {
        setFrascoImage('/images/frascoYfondo.png');
      } else {
        setFrascoImage('/images/imgFrasco.png');
      }
    };

    // Ejecutar al cargar el componente
    updateFrascoImage();

    // Escuchar el evento de redimensionado para actualizar la imagen
    window.addEventListener('resize', updateFrascoImage);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', updateFrascoImage);
    };
  }, []);

  return (
    <section className='primeraSection'>
      <img className='hojasUno' src="/images/imgHojas2.png" alt="Imagen de hojas de Antigal" />
      <img className='hojasDos' src="/images/hojasBlur.png" alt="Imagen de hojas secos de Antigal" />
      <h2 className='subtitulo'>SaludableMente Natural</h2>
      <div className='frascoYtitulo'>
        <div className='contenedorFrasco'>
          {/* Usar la imagen que cambia según el tamaño de la pantalla */}
          <img className='imagenFrasco' src={frascoImage} alt="Imagen de frasco de Antigal" />
        </div>
      </div>
      <div className='botonCompraContainer'>
        <button onClick={handleComprar} className='botonComprar' >Comprar</button>
      </div>
      <h1 className='titulo'>LA SELECCIÓN DE FRUTOS SECOS PERFECTA, EXISTE.</h1>
    </section>
  );
};

export default PrimeraSection;
