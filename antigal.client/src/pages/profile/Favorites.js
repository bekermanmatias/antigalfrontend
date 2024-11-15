import React from "react";
import ProductList from "../../components/products/productList/ProductList";
import { useFavorites } from "../../contexts/FavoriteContext";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-container">
      <h1> Mis favoritos </h1>
      {favorites.length === 0 ? (
        <p> No tienes productos favoritos</p>
      ) : (
        <div className="favorite-list">
            <ProductList products={favorites}/>
        </div>
      )}
    </div>
  );
};
export default Favorites;
