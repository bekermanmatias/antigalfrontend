import React from "react";

const ProductInfo = ({ product }) => {
  return (
    <div className="detail-section">
      <h1>{product.name}</h1>
      <p className="price">Precio: ${product.price}</p>
      <p className="description">{product.description}</p>
    </div>
  );
};

export default ProductInfo;