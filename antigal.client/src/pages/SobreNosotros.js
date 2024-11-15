// src/pages/SobreNosotros.js
import React from 'react';

const SobreNosotros = () => {
  return (
    <div className="sobre-nosotros">
      <section className="about-section">
        <h1>Sobre Nosotros</h1>
        <div className="about-content">
          <img src="/images/antigalImagenLocal.png" alt="Trabajadores de Antigal" className="about-image" />
          <p>
            En un rincón del Mercado Municipal de Ensenada, un pequeño local comenzó a
            escribir su historia el 30 de octubre de 2022. Ese lugar era Antigal, una dietética
            con un enfoque único y una pasión ardiente por los alimentos saludables. Desde
            sus humildes comienzos, Antigal ha sido más que un simple negocio; ha sido un
            viaje de autenticidad y conexión con las raíces.
            <br /><br />
            El nombre "Antigal" fue cuidadosamente elegido para reflejar las raíces del
            Noroeste Argentino (NOA), de donde proviene uno de los socios fundadores. En el
            que se relaciona con la idea de sitios donde se encuentran restos de lo antiguo,
            asociándolo con la idea de volver a lo natural, a las raíces y a la autenticidad.
            Esta conexión con la tierra y la tradición se manifiesta en la misión de Antigal:
            ofrecer alimentos saludables y genuinos que respeten las prácticas alimenticias
            más tradicionales y naturales.
            <br /><br />
            El mercado de alimentos saludables está en crecimiento debido a la
            creciente conciencia sobre la importancia de una nutrición adecuada y un
            estilo de vida saludable.
            Antigal encuentra su espacio como una opción atractiva para los consumidores
            que buscan productos de calidad y precios competitivos.
          </p>
        </div>
      </section>

      <section className="instagram-section">
        <h2>Síguenos en Instagram</h2>
        <div className="instagram-feed">
          {/* Aquí se insertará el widget de Instagram */}
          <iframe 
            src="//lightwidget.com/widgets/39722489d2fb5cffafd1ed21f6bc1f9d.html" 
            scrolling="no" 
            allowtransparency="true" 
            className="lightwidget-widget" 
          ></iframe>
         
        </div>
      </section>
    </div>
  );
};

export default SobreNosotros;
