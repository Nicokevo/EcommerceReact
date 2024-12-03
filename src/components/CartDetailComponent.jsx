import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../data/products'; 

const CartDetailComponent = () => {
  const { cartItemId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
      
        const product = await getProduct(cartItemId);
        if (product) {
          setProductDetails(product);
        } else {
          console.error("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [cartItemId]); 

  if (!productDetails) {
    return <p>Cargando detalles del carrito...</p>;
  }

  return (
    <div>
      <h1>Detalle del carrito</h1>
      <p>Producto: {productDetails.name}</p> {/* Asegúrate de usar la propiedad 'name' */}
      <p>Cantidad: {productDetails.quantity}</p> {/* Asegúrate de que 'quantity' esté en los datos */}
      <p>Precio: ${productDetails.price}</p>
      {/* Agrega más detalles si es necesario */}
    </div>
  );
};

export default CartDetailComponent;
