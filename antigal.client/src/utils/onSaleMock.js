export const adaptProductsForSale = (products) => {
    return products.map(product => {
      const isOnSale = Math.random() < 0.3;  // Decide una vez si está en oferta
      return {
        ...product,
        onSale: isOnSale,
        salePrice: isOnSale ? (product.price * 0.8).toFixed(2) : product.price  // Usa la misma decisión para el precio de oferta
      };
    });
  };