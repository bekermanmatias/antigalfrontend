import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import fakeOrders from "../../data/fakeOrder";
import Swal from "sweetalert2";
import UserOrderListContainer from "../../components/users/Orders/UserOrderListContainer"
const Orders = () => {
  const { user: currentUser } = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [usingBackend] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (usingBackend) {
          //falta endpoint
          const response = await fetch("http://localhost:5279/api/");
          if (!response.ok) {
            throw new Error("Error al obtener pedidos del backend");
          }
          const data = await response.json();
          setOrders(data);
        } else {
  
          const userOrders = fakeOrders.filter(
            (order) => order.userId === currentUser.id
            
          );
         
          setOrders(userOrders);
        }
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
        Swal.fire("Error", "No se pudieron obtener los pedidos.", "error");
      }
    };
    fetchOrders();
    
  }, [currentUser.id, usingBackend]);

  return(
    <div className="orders-page">
        <div className="title">
            <h1>
                Mis Pedidos
            </h1>
        </div>
       <UserOrderListContainer orders={orders}/>

        
    </div>
)
};


export default Orders;
