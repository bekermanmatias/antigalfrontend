// src/components/Home/TerceraSection.js
import React from 'react';
import IconoSeccion from './IconoSection';

const TerceraSection = ({ backgroundImage }) => {
  return (
    <section className='terceraSection'>
      <div className='contenedorFondo'>
        <img className='fondoVerde' src={backgroundImage} alt="Imagen de fondo de Antigal" />
        <article className='contenedorFrutosSecos'>
          <IconoSeccion
            titulo="ALMENDRAS"
            parrafo="Las almendras son ricas en nutrientes esenciales, incluyendo vitamina E, fibra y proteínas. Son un complemento perfecto para una dieta balanceada."
            iconoAlt="Imagen de almendras de Antigal"
            iconoSrc="/icons/almendra.png"
          />
          <IconoSeccion
            titulo="PISTACHOS"
            parrafo="Los pistachos son una excelente fuente de antioxidantes, vitaminas y minerales. Son ideales como snack saludable y también se pueden agregar a una variedad de platos."
            iconoAlt="Imagen de pistachos de Antigal"
            iconoSrc="/icons/pistacho.png"
          />
          <IconoSeccion
            titulo="MANÍ ORGANICO"
            parrafo="El maní orgánico es una fuente rica en proteínas y grasas saludables. Es perfecto para preparar mantequillas, agregar a ensaladas o simplemente disfrutar como un snack natural y nutritivo."
            iconoAlt="Imagen de maní orgánico de Antigal"
            iconoSrc="/icons/mani.png"
          />
          <IconoSeccion
            titulo="100% DE ENERGÍA"
            parrafo="Obtén un impulso de energía natural con nuestros productos. Están diseñados para proporcionarte la vitalidad que necesitas para enfrentar el día con fuerza y entusiasmo."
            iconoAlt="Imagen de rayo de Antigal"
            iconoSrc="/icons/rayo.png"
          />
        </article>
        <img className='fotoFrutos' src="/images/foto_frutos_secos.jpg" alt="Imagen de frutos secos de Antigal" />  
      </div>
    </section>
  );
};

export default TerceraSection;
