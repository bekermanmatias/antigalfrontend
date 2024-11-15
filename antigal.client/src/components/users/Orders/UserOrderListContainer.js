import { Link } from "react-router-dom";
import ItemOrder from "./ItemOrder";
import Swal from "sweetalert2";
import { format } from 'date-fns';
const UserOrderListContainer = ({ orders }) => {
    

  const showDevelopmentAlert = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Funcionalidad en Desarrollo",
      text: "Esta funcionalidad estará disponible pronto.",
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };
  
  const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return (
    <div className="order-list">
      {orders.length > 0 ? (
        sortedOrders.map((order) => (
          <div className="order" key={order.id}>
            <div className="order-header">
              <div className="ordet-date">
                <h4>Fecha del pedido</h4>
                <p>{format(new Date(order.date), 'dd/MM/yyyy')}</p>
              </div>
              <div className="ordet-total">
                <h4>Total</h4>
                <p>${order.total}</p>
              </div>
              <div className="ordet-info">
                <h4>#{order.id}</h4>
                <p>{order.status}</p>
              </div>
            </div>
            <div className="order-detail">
              <ItemOrder products={order.items} />
            </div>
            <div className="order-footer">
              <button  onClick={showDevelopmentAlert}>
                <img src="/icons/repeat.svg" alt="repeat-icon" className="repeat-icon" />
                Hacer pedido de nuevo</button>
              <Link to={order.id} onClick={showDevelopmentAlert}>
                Ver detalles del pedido
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p> Pedidos no encontrados </p>
      )}
    </div>
  );
};
export default UserOrderListContainer;
