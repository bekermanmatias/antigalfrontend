// src/components/admin/products/ProductList.js
import React from 'react';
import AdminProductItem from './AdminProductItem';

const AdminProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <AdminProductItem
          key={product.idProducto}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AdminProductList;
