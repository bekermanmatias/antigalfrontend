import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";
import { useFavorites } from "../../../contexts/FavoriteContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import formatCamelCase from "../../../utils/formatCamelCase";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorited = favorites.some((item) => item.id === product.id);

  const [liked, setLiked] = useState(isFavorited);
  const [cartCount, setCartCount] = useState(() => {
    const savedCount = JSON.parse(localStorage.getItem(`cart-${product.id}`));
    return savedCount || 0;
  });

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem(`liked-${product.id}`, JSON.stringify(liked));
    if (liked) {
      addFavorite(product);
    } else {
      removeFavorite(product.id);
    }
  }, [liked, product.id]);

  useEffect(() => {
    localStorage.setItem(`cart-${product.id}`, JSON.stringify(cartCount));
  }, [cartCount, product.id]);

  const handleImageClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = () => {
    const newCount = cartCount + 1;
    setCartCount(newCount);
    addToCart(product, 1);

    Swal.fire({
      title: "¡Excelente!",
      text: "Producto añadido al carrito correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div className="product-item">
      {product.onSale && <div className="sale-tag">SALE</div>}
      <article className="imageAndIcons">
        <img
          className="imagesProducto"
          src={product.images}
          onClick={handleImageClick}
          alt={product.name}
        />
        <div className="actions">
          <button
            className="like-button"
            onClick={handleLike}
            key={liked ? "liked" : "not-liked"}
          >
            <img
              src={liked ? "/icons/likeRellenoIcon.png" : "/icons/likeIcon.png"}
              alt="like icon"
            />
          </button>
        </div>
      </article>

      <div className="info">
        <h3>{formatCamelCase(product.name)}</h3>
        <p className="category">
          {product.categories && product.categories.length > 0 ? (
            product.categories.map((category, index) => (
              <span key={index} className="category-tag">
                {category}
              </span>
            ))
          ) : (
            <span className="category-tag"></span>
          )}
        </p>
        <p className="offerPrice">
          {product.onSale && (
            <span className="precioAnterior">
              ${parseFloat(product.price).toFixed(2)}
            </span>
          )}
          <span className="precioOferta">
            $
            {product.onSale
              ? parseFloat(product.salePrice).toFixed(2)
              : parseFloat(product.price).toFixed(2)}
          </span>
        </p>
      </div>
      <div>
        <section className="buttonsContainer">
          <article className="cartButton" onClick={handleAddToCart}>
            <div>Agregar al Carrito</div>
            <img
              src="/icons/cartCardIcon.svg"
              alt="Icono de carrito de Antigal"
            />
          </article>
        </section>
      </div>
    </div>
  );
};

export default Product;
