import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';

const toUpperCase = (str) => str.toUpperCase();

export const CategoryEnum = Object.freeze({
  BEST_SELLERS: 'best_sellers',
  OFFERS: 'offers',
  JACKETS: 'jackets',
  COATS: 'coats',
  OUTERWEAR: 'outerwear',
  WINTER: 'winter',
  LIGHTWEIGHT: 'lightweight',
  WATERPROOF: 'waterproof',
});

export const createProduct = async (name, price, image, stock, category) => {
  const product = {
    id: uuidv4(),
    name: toUpperCase(name),
    price,
    image,
    description: `Detailed description of ${name}`,
    stock,
    category,
  };

  try {
    await setDoc(doc(db, 'products', product.id), product);
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

export const getProductsByCategory = async (category) => {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where("category", "==", category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw new Error('Error loading products by category');
  }
};

// Function to initialize products in Firestore (use only once)
export const initializeProducts = async () => {
  const productsToAdd = [
    { name: "Patagonia men's Classic Retro-X Ja", price: 19.99, image: '/src/assets/face1.png?height=200&width=200', stock: 5, category: CategoryEnum.BEST_SELLERS },
    { name: "North Face men's ThermoBall Eco J", price: 29.99, image: '/src/assets/face2.png?height=200&width=200', stock: 3, category: CategoryEnum.OFFERS },
    { name: "Columbia women's Heavenly Long Hoo", price: 39.99, image: '/src/assets/face3.jpg?height=200&width=200', stock: 10, category: CategoryEnum.COATS },
    { name: "Arc'teryx men's Beta AR Jacket", price: 49.99, image: '/src/assets/face4.jpg?height=200&width=200', stock: 2, category: CategoryEnum.JACKETS },
    { name: "Marmot men's PreCip Lightweight Ja", price: 59.99, image: '/src/assets/face5.png?height=200&width=200', stock: 0, category: CategoryEnum.LIGHTWEIGHT },
    { name: "Canada Goose women's Rossclair Par", price: 69.99, image: '/src/assets/face4.jpg?height=200&width=200', stock: 7, category: CategoryEnum.COATS },
    { name: "Helly Hansen men's Seven J Waterproof", price: 79.99, image: '/src/assets/face5.png?height=200&width=200', stock: 4, category: CategoryEnum.WATERPROOF },
    { name: "Mountain Hardwear men's Stretchdown ", price: 89.99, image: '/src/assets/face1.png?height=200&width=200', stock: 5, category: CategoryEnum.WINTER },
  ];

  for (const product of productsToAdd) {
    await createProduct(product.name, product.price, product.image, product.stock, product.category);
  }

  console.log('All products have been initialized in Firestore');
};

export default {
  createProduct,
  getProduct,
  getAllProducts,
  getProductsByCategory,
  initializeProducts,
  CategoryEnum
};

