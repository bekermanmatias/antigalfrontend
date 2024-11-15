// src/pages/TiendaFisica.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TiendaFisica = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 700, // Suave transición
    slidesToShow: 2, // Dos imágenes en escritorio
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // 4 segundos por slide
    arrows: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 1, // Una imagen en pantallas menores a 1080px
          centerMode: true, // Centrar la imagen
          centerPadding: '0px',
        },
      },
    ],
  };

  const images = [
    {
      src: '/images/tienda-fisica/tienda1.jpg',
      title: 'Fachada de la Tienda',
      description: 'Nuestra tienda ubicada en el corazón del Mercado Municipal.',
    },
    {
      src: '/images/tienda-fisica/tienda2.jpg',
      title: 'Interior de la Tienda',
      description: 'Ambiente acogedor y lleno de productos saludables.',
    },
    {
      src: '/images/tienda-fisica/tienda3.jpg',
      title: 'Productos Destacados',
      description: 'Variedad de alimentos naturales y orgánicos.',
    },
    // Agrega más imágenes si es necesario
  ];

  return (
    <div className="tienda-fisica">
      {/* Sección de Ubicación */}
      <section className="location-section">
        <h1>Tienda Física</h1>
        <p>
          Visítanos en nuestro local ubicado en Ensenada Argentina, donde encontrarás una
          amplia variedad de productos saludables y un ambiente acogedor. Estamos comprometidos
          con ofrecerte lo mejor en alimentación natural y respetando las tradiciones.
        </p>
        <button className="cta-button primary">¡Visítanos Hoy!</button> {/* Llamado a la Acción */}
      </section>

      {/* Sección del Carrusel */}
      <section className="carousel-section">
        <h2>Conoce Nuestro Local</h2>
        <Slider {...carouselSettings} className="carousel">
          {images.map((image, index) => (
            <div key={index} className="carousel-item">
              <div className="image-container">
                <img
                  src={image.src}
                  alt={image.title}
                  className="carousel-image"
                  loading="lazy"
                />
                <div className="overlay">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Sección del Mapa */}
      <section className="map-section">
        <h2>Ubicación</h2>
        <div className="map-container">
          <iframe
            title="Antigal Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.1091155522145!2d-57.91474799915891!3d-34.85986766573487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e5276f41e47f%3A0xc42b3b3ecc0f90bd!2sMercado%20Municipal!5e0!3m2!1ses-419!2sar!4v1729785806909!5m2!1ses-419!2sar"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-iframe"
          ></iframe>
        </div>
        <button className="cta-button secondary">¡Obtén Direcciones!</button> {/* Llamado a la Acción */}
      </section>
    </div>
  );
};

export default TiendaFisica;
