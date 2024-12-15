import  { useState } from 'react';
import { css } from '../../styled-system/css';
import { createProduct, CategoryEnum } from '../data/products';  // Asegúrate de importar correctamente
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';

const Home = () => {
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    setLoading(true);

    const product = {
      name: "Patagonia Men's Retro",  // Aquí se pueden agregar valores dinámicos según lo que el usuario ingrese
      price: 19.99,
      images: {
        primary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585647/north-frente-grilmoldi_yg8ymo.jpg',
        secondary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585646/north-face-grilmoldi-atras_dg9lla.jpg',
        gallery: [
          'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585646/north-face-grilmoldi-perfil_lglh4y.jpg',
          'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733706305/northface-best-seller-camperacerrado_tpha7n.jpg',
        ],
      },
      stock: 5,
      category: CategoryEnum.BEST_SELLERS,
    };

    try {
      // Llamar a la función createProduct con los datos del producto
      await createProduct(product.name, product.price, product.images, product.stock, product.category);
      alert('Producto agregado con éxito');
    } catch (error) {
      console.error('Error agregando el producto:', error);
      alert('Hubo un error al agregar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css({
      minHeight: '100vh',
      backgroundColor: 'gray.100',
    })}>
      <Banner />
      <div className={css({
        padding: { base: '4', md: '8' },
      })}>
        <Carousel />

        {/* Botón para agregar el producto */}
        <button
          onClick={handleAddProduct}
          disabled={loading}
          className={css({
            padding: '10px 20px',
            backgroundColor: 'green.500',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            mt: '4',
            ':hover': {
              backgroundColor: 'green.600',
            },
            ':disabled': {
              backgroundColor: 'gray.400',
              cursor: 'not-allowed',
            }
          })}
        >
          {loading ? 'Agregando Producto...' : 'Agregar Producto'}
        </button>
      </div>
    </div>
  );
};

export default Home;
