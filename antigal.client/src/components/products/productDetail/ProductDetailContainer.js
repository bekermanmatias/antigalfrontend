import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import LoadingSVG from "../../common/LoadingSVG";
import ErrorAnimation from "../../common/ErrorAnimation";
import ProductDetail from './ProductDetail';

const ProductDetailContainer = () =>{
    const {id} =useParams();
    const[product,setProduct] =useState(null);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState(false);
   

    useEffect(()=>{
        const useBackend=true;
        const fetchURL= useBackend ? `https://www.antigal.somee.com/api/Product/getProductById/${id}`: `https://fakestoreapi.com/products/${id}`;
        console.log(fetchURL);

        fetch(fetchURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener el producto');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.data) { // Verifica que 'data' y 'data.data' existan
                    const productData = data.data; // Accede a 'data.data'
                    
                    const loadedProduct = {
                        id: productData.idProducto, // Asigna 'idProducto' a 'id'
                        name: productData.nombre, // Asigna 'nombre'
                        price: productData.precio, // Asigna 'precio'
                        images: productData.imagenUrls.$values || [], // Asigna todas las imágenes, o un array vacío si no hay
                        description: productData.descripcion, // Asigna 'descripcion'
                        category: productData.marca, // Asigna 'marca' a 'category'
                        stock: productData.stock, // Asigna 'stock'
                    };
                    setProduct(loadedProduct); // Establece el producto en el estado
                    setLoading(false);
                    setError(false);
                } else{
                    throw new Error('Formato de datos incorrecto');
                }
            })
            .catch(err => {
                setLoading(false);
                console.error('Error al obtener el producto:', err); // Proporciona más información sobre el error
                setError(true);
            });
    }, [id]);

    return(
        <div className="page-detail-container">
            {loading ? (
                <div className="loading-container">
                    <LoadingSVG/>    
                </div>
            ): error ? (
                <div className="error-container">
                    <ErrorAnimation />
                    <h2>Oops... Algo salió mal. Intenta de nuevo más tarde.</h2>
                </div>
            ):
            (
                product && <ProductDetail product={product} /> // Mostrar detalles del producto usando tu componente
              )}
        </div>
    );

};
export default ProductDetailContainer;