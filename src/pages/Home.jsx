import { useState } from 'react';
import { css } from '../../styled-system/css';
import {  CategoryEnum } from '../data/products';  // Asegúrate de importar CategoryEnum correctamente
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import { useTheme } from '../context/ThemeContext';
import VerticalBanner from '../components/VerticalBanner';
import { db } from '../services/firebase'; // Asegúrate de importar tu instancia de Firebase
import { doc, writeBatch } from 'firebase/firestore';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();

  const handleAddProduct = async () => {
    setLoading(true);

    // Productos a agregar
    const products = [
      {
        name: "Patagonia Men's Retro",
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
        category: CategoryEnum.BEST_SELLERS, // Corregido: cambiar 'CategoryEnum' a 'category'
      },
      {
        name: "Northface Ultra 3",
        price: 39.99,
        images: {
          primary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585647/northface-ultra3-front_yknwxz.jpg',
          secondary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585646/northface-ultra3-back_hr8a0j.jpg',
          gallery: [
            'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585646/northface-ultra3-side_q0fngn.jpg',
            'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733706305/northface-best-seller-ultra3-camperacerrado_tpha7n.jpg',
          ],
        },
        stock: 3,
        category: CategoryEnum.OFFERS, // Corregido: cambiar 'CategoryEnum' a 'category'
      },
      {
        name: "Columbia Sportswear Hybrid",
        price: 49.99,
        images: {
          primary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585647/columbia-hybrid-front_yknwxz.jpg',
          secondary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585646/columbia-hybrid-back_hr8a0j.jpg',
          gallery: [
            'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585646/columbia-hybrid-side_q0fngn.jpg',
            'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733706305/columbia-best-seller-hybrid-camperacerrado_tpha7n.jpg',
          ],
        },
        stock: 8,
        category: CategoryEnum.BEST_SELLERS, // Corregido: cambiar 'CategoryEnum' a 'category'
      },
      {
        name: "Mammut Alpine Pro",
        price: 59.99,
        images: {
          primary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585647/mammut-alpinepro-front_yknwxz.jpg',
          secondary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585646/mammut-alpinepro-back_hr8a0j.jpg',
          gallery: [
            'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585646/mammut-alpinepro-side_q0fngn.jpg',
            'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733706305/mammut-best-seller-alpinepro-camperacerrado_tpha7n.jpg',
          ],
        },
        stock: 4,
        category: CategoryEnum.OFFERS, // Corregido: cambiar 'CategoryEnum' a 'category'
      },
    ];
    

    // Asegurarse de que CategoryEnum está definido correctamente
    const batch = writeBatch(db);

    try {
      products.forEach(product => {
        if (!product.category) {
          throw new Error(`El producto ${product.name} tiene CategoryEnum indefinido.`);
        }

        const productRef = doc(db, 'products', product.name); // Usamos el nombre como ID del documento
        batch.set(productRef, product);
      });

      await batch.commit();
      alert('Productos agregados con éxito');
    } catch (error) {
      console.error('Error agregando los productos:', error);
      alert('Hubo un error al agregar los productos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css({
      minHeight: '100vh',
      backgroundColor: isDarkMode ? 'gray.800' : 'gray.100',
      color: isDarkMode ? 'white' : 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    })}>
      <Banner />

      <div className={css({
        padding: { base: '4', md: '8' },
        backgroundColor: isDarkMode ? 'gray.800' : 'gray.100',
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px',
      })}>
        <Carousel showArrows={false} />

        <button
          onClick={handleAddProduct}
          disabled={loading}
          className={css({
            padding: '12px 24px',
            backgroundColor: isDarkMode ? 'green.600' : 'green.500',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            mt: '8',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s, box-shadow 0.3s',
            ':hover': {
              backgroundColor: isDarkMode ? 'green.700' : 'green.600',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            },
            ':disabled': {
              backgroundColor: 'gray.400',
              cursor: 'not-allowed',
            }
          })}
        >
          {loading ? 'Agregando Productos...' : 'Agregar Productos'}
        </button>
      </div>

      <VerticalBanner />
    </div>
  );
};

export default Home;
