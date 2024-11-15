import React from "react";
import ProductInfo from './ProductInfo';
import ProductStockControl from "./ProductStockControl";
import ProductMoreInfo from "./ProductMoreInfo";

import ProductImage from "./ProductImage";
const ProductDetail = ({product}) => {
  if (!product) {
    return console.log("Producto no encontrado");
    }
  return (
   
    <div className="productDetail">
      <div className="detail-sideBar">
      </div>
      <div className="detail-container">
        <ProductImage images={product.images} name={product.name} />
        <div className="detail-side">
          <ProductInfo product={product} />
          <ProductStockControl product={product} />
          <ProductMoreInfo />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
