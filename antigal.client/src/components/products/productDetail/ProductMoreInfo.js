import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Swal from 'sweetalert2';
const ProductMoreInfo = () => {
  const [visibleInfo, setVisibleInfo] = useState(null);
  const toggleInfo = (info) => {
    setVisibleInfo((prev) => (prev === info ? null : info));
  };
  const showDevelopmentAlert = () => {
    Swal.fire({
      title: 'Funcionalidad en Desarrollo',
      text: 'Esta funcionalidad estará disponible pronto.',
      icon: 'info',
      confirmButtonText: 'Cerrar'
    });
  };
  return (
    <div className="info-section">
      <div className="more-info">
        <a onClick={() => toggleInfo("pago")}>
          <i className="fa-solid fa-credit-card"></i> Medios de Pago
        </a>
        <button onClick={() => toggleInfo("pago")}>
          {" "}
          {visibleInfo === "pago" ? "-" : "+"}
        </button>
      </div>
      {visibleInfo === "pago" && (
        <div className="info">
          <p>
            Ofrecemos una variedad de medios de pago para facilitar tu
            experiencia de compra. Puedes elegir la opción que mejor se adapte a
            tus necesidades:
            <span style={{ fontWeight: 500 }}>
              {" "}
              Tarjeta de débito, Tarjeta de crédito, Transferencia bancaria o
              Efectivo.
            </span>
          </p>

          <a href="#" onClick={showDevelopmentAlert}>Conocé nuestras promociones bancarias.</a>
        </div>
      )}
      <div className="more-info">
        <a onClick={() => toggleInfo("envio")}>
          <i className="fa-solid fa-truck"></i> Medios de Envio
        </a>
        <button onClick={() => toggleInfo("envio")}>
          {visibleInfo === "envio" ? "-" : "+"}
        </button>
      </div>
      {visibleInfo === "envio" && (
        <div className="info">
          <p>
            En Antigal nos esforzamos por ofrecerte opciones de envío flexibles
            y rápidas para que recibas tus productos de la manera más
            conveniente.
          </p>
          <div className="input-envio">
            <input type="text" id="codigo-postal" placeholder="Ingrese su CP" />

            <button onClick={showDevelopmentAlert}>Calcular envío</button>
            
          </div>
          <a href="https://www.correoargentino.com.ar/formularios/cpa" target="_blank" rel="noopener noreferrer" >No conozco mi código postal.</a>
        </div>
      )}
      <div className="more-info">
        <a onClick={() => toggleInfo("retiro")}>
          <i className="fa-solid fa-house"></i> Retiro en el local
        </a>
        <button>{visibleInfo === "retiro" ? "-" : "+"}</button>
      </div>
      {visibleInfo === "retiro" && (
        <div className="info">
          <p>
            Si prefieres evitar los gastos de envío ofrecemos la opción de
            retiro en tienda. Te notificaremos una vez que tu pedido esté listo
            y podras retirarlo.
          </p>
          <p style={{ fontWeight: 500 }}>
            Lunes a Sabados de 10:00 a 20:00hs.
            <br />
            Calle ficticia N° 1234, Ensenada.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductMoreInfo;
