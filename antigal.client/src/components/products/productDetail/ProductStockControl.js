import React, { useState, useContext } from "react";
import { CartContext } from '../../../contexts/CartContext'; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductStockControl = ({ product }) => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = product.stock === 0;

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart =()=>{
    const existingProduct =cartItems.find(item => item.id === product.id);
    const totalQuantity = existingProduct ? existingProduct.quantity + quantity : quantity;
    
    if(totalQuantity> product.stock){
      toast.error(`No puedes agregar más de ${product.stock} unidades de ${product.name}.`, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
      });      
      return;
    }
    
    addToCart(product, quantity); 
   
    if(!isOutOfStock){
    toast.success(`${product.name} ha sido agregado al carrito (${quantity})`,{
      position:'top-right',
      autoClose: 1000,
      hideProgressBar: true,
      draggable: true,
      progress: undefined,
      closeOnClick: true,
      pauseOnHover: true,
    });
   }
  };
  return (
    <div className="detail-section">
      <p className="disponibility">
        Disponibilidad:{" "}
        {!isOutOfStock
          ? `En Stock (${product.stock} disponibles)`
          : "Fuera de stock"}
      </p>

      <div className="cart-section">
        <div className="quantity">
          <button onClick={handleDecrease} disabled={isOutOfStock}>
            -
          </button>
          <input type="text" value={quantity} readOnly />
          <button onClick={handleIncrease} disabled={isOutOfStock}>
            +
          </button>
        </div>
        <button
          className={`add-to-cart ${isOutOfStock ? "inactive" : ""}`}
          disabled={isOutOfStock}
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductStockControl;
