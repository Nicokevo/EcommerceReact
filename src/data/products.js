import { v4 as uuidv4 } from 'uuid';

// Función para convertir el nombre a mayúsculas
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

const createProduct = (name, price, image, stock, category) => ({
  id: uuidv4(),
  name: toUpperCase(name),  // Convertir el nombre a mayúsculas
  price,
  image,
  description: `Detailed description of ${name}`, 
  stock,
  category, 
});

export const products = [
  createProduct("Patagonia men's Classic Retro-X Ja", 19.99, '/src/assets/face1.png?height=200&width=200', 5, CategoryEnum.BEST_SELLERS),
  createProduct("North Face men's ThermoBall Eco J", 29.99, '/src/assets/face2.png?height=200&width=200', 3, CategoryEnum.OFFERS),
  createProduct("Columbia women's Heavenly Long Hoo", 39.99, '/src/assets/face3.jpg?height=200&width=200', 10, CategoryEnum.COATS),
  createProduct("Arc'teryx men's Beta AR Jacket", 49.99, '/src/assets/face4.jpg?height=200&width=200', 2, CategoryEnum.JACKETS),
  createProduct("Marmot men's PreCip Lightweight Ja", 59.99, '/src/assets/face5.png?height=200&width=200', 0, CategoryEnum.LIGHTWEIGHT), 
  createProduct("Canada Goose women's Rossclair Par", 69.99, '/src/assets/face4.jpg?height=200&width=200', 7, CategoryEnum.COATS),
  createProduct("Helly Hansen men's Seven J Waterproof", 79.99, '/src/assets/face5.png?height=200&width=200', 4, CategoryEnum.WATERPROOF),
  createProduct("Mountain Hardwear men's Stretchdown ", 89.99, '/src/assets/face1.png?height=200&width=200', 5, CategoryEnum.WINTER),
];

export const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    console.log('Fetching product with ID:', id);  // Debugging line to check the id

    setTimeout(() => {
      const product = products.find((item) => item.id === id);
      console.log('Found product:', product);  // Debugging line to check if product was found
      if (product) {
        resolve(product);
      } else {
        reject("Product not found");
      }
    }, 1000);
  });
};

export default products;
