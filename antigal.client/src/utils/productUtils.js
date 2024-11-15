// src/utils/productUtils.js

/**
 * Obtiene la lista de productos desde localStorage.
 * @returns {Array} Array de productos.
 */
export const getProducts = () => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  };
  
  /**
   * Guarda la lista de productos en localStorage.
   * @param {Array} products - Array de productos a guardar.
   */
  export const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
  };
  
  /**
   * Agrega un nuevo producto a la lista en localStorage.
   * @param {Object} product - Producto a agregar.
   */
  export const addProduct = (product) => {
    const products = getProducts();
    products.push(product);
    saveProducts(products);
  };
  
  /**
   * Actualiza un producto existente en localStorage.
   * @param {Object} updatedProduct - Producto actualizado.
   */
  export const updateProduct = (updatedProduct) => {
    let products = getProducts();
    products = products.map((product) =>
      product.idProducto === updatedProduct.idProducto ? { ...product, ...updatedProduct } : product
    );
    saveProducts(products);
  };
  
  /**
   * Elimina un producto de localStorage.
   * @param {number} idProducto - ID del producto a eliminar.
   */
  export const deleteProductById = (idProducto) => {
    let products = getProducts();
    products = products.filter((product) => product.idProducto !== idProducto);
    saveProducts(products);
  };
  