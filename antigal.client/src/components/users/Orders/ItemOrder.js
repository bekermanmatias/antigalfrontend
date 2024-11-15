import { Link } from "react-router-dom";

const ItemOrder = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <div className="item-order" key={product.productId}>
          <div className="img-container">
            <img src={product.image} alt={product.productName} />
          </div>
          <div className="product-info">
            <Link to={`/products/${product.productId}`}> {product.productName} </Link>
            <p>{product.quantity} u. ${product.price}</p>
          </div>
        </div>
      ))}
    </>
  );
};
export default ItemOrder;
