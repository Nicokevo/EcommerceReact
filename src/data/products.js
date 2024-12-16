import { doc, getDoc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';

const toUpperCase = (str) => str.toUpperCase();

// Definimos las categorías como enum
export const CategoryEnum = {
  BEST_SELLERS: 'best_sellers',
  OFFERS: 'offers',
};

// Lista de categorías con sus nombres legibles
export const categories = [
  { id: CategoryEnum.BEST_SELLERS, name: 'Más Vendidos' },
  { id: CategoryEnum.OFFERS, name: 'Ofertas' },
];

const validateImages = (images) => {
  if (!images.primary || !images.secondary || !Array.isArray(images.gallery)) {
    throw new Error('Images must include primary, secondary, and a gallery array');
  }
  if (images.gallery.length < 2) {
    throw new Error('Gallery must contain at least 2 images');
  }
};

export const createProduct = async (name, price, images, stock, categoryId) => {
  validateImages(images);

  const product = {
    name: toUpperCase(name),
    price,
    images,
    description: `Detailed description of ${name}`,
    stock,
    category: categoryId, // Usamos CategoryEnum aquí
  };

  try {
    await setDoc(doc(collection(db, 'products')), product);
    console.log('Product added successfully');
    return product;
  } catch (error) {
    console.error('Error adding product: ', error);
    throw new Error('Failed to add product');
  }
};

export const getProduct = async (id) => {
  try {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error('Error loading product');
  }
};

export const getAllProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    return productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw new Error('Error loading products');
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where("category", "==", categoryId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw new Error('Error loading products by category');
  }
};

// Inicialización de productos usando las categorías definidas
export const initializeProducts = async () => {
  const productsToAdd = [
    { 
      name: "Patagonia Men's Retro", 
      price: 19.99, 
      images: {
        primary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585647/north-frente-grilmoldi_yg8ymo.jpg',
        secondary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585646/north-face-grilmoldi-atras_dg9lla.jpg',
        gallery: [
          'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733613167/732106-1600-1600_sgjipp.jpg',
          'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585647/north-frente-grilmoldi_yg8ymo.jpg',
        ],
      }, 
      stock: 5, 
      category: CategoryEnum.BEST_SELLERS, // Usamos CategoryEnum aquí
    },
    { 
      name: "1996 RETRO NUPTSE JACKET", 
      price: 29.99, 
      images: {
        primary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733611780/GrimoldiPinkBack_a5eygl.jpg',
        secondary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733613167/732106-1600-1600_sgjipp.jpg',
        gallery: [
          'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585647/north-frente-grilmoldi_yg8ymo.jpg',
          'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733611780/GrimoldiPinkBack_a5eygl.jpg',
        ],
      }, 
      stock: 3, 
      category: CategoryEnum.BEST_SELLERS, // Usamos CategoryEnum aquí
    },
    { 
      name: "Jordan Flight Heritage", 
      price: 39.99, 
      images: {
        primary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733613167/732106-1600-1600_sgjipp.jpg',
        secondary: 'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733585647/north-frente-grilmoldi_yg8ymo.jpg',
        gallery: [
          'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733611780/GrimoldiPinkBack_a5eygl.jpg',
          'https://res.cloudinary.com/dm0mfqug7/image/upload/v1733613167/732106-1600-1600_sgjipp.jpg',
        ],
      }, 
      stock: 10, 
      category: CategoryEnum.OFFERS, // Usamos CategoryEnum aquí
    },
  ];

  for (const product of productsToAdd) {
    await createProduct(product.name, product.price, product.images, product.stock, product.category);
  }
  console.log('All products have been initialized in Firestore');
};

export default {
  createProduct,
  getProduct,
  getAllProducts,
  getProductsByCategory,
  initializeProducts,
  categories, // Exportamos la lista de categorías
  CategoryEnum, // Exportamos el enum de categorías
};
