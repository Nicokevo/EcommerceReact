import { v4 as uuidv4 } from 'uuid'; 


const CategoryEnum = Object.freeze({
  BEST_SELLERS: 'best_sellers',
  OFFERS: 'offers',
  JACKETS: 'jackets',
  COATS: 'coats',
  OUTERWEAR: 'outerwear',
  WINTER: 'winter',
  LIGHTWEIGHT: 'lightweight',
  WATERPROOF: 'waterproof',
});

// Función para crear productos
const createProduct = (name, price, image, stock, category) => ({
  id: uuidv4(),
  name,
  price,
  image,
  description: `Detailed description of ${name}`, 
  stock,
  category, 
});

const products = [
  createProduct("Patagonia Men's Classic Retro-X Ja", 19.99, '/src/assets/face1.png?height=200&width=200', 5, CategoryEnum.BEST_SELLERS),
  createProduct("North Face Men's ThermoBall Eco J", 29.99, '/src/assets/face2.png?height=200&width=200', 3, CategoryEnum.OFFERS),
  createProduct("Columbia Women's Heavenly Long Hoo", 39.99, '/src/assets/face3.jpg?height=200&width=200', 10, CategoryEnum.COATS),
  createProduct("Arc'teryx Men's Beta AR Jacket", 49.99, '/src/assets/face4.jpg?height=200&width=200', 2, CategoryEnum.JACKETS),
  createProduct("Marmot Men's PreCip Lightweight Ja", 59.99, '/src/assets/face5.png?height=200&width=200', 0, CategoryEnum.LIGHTWEIGHT), 
  createProduct("Canada Goose Women's Rossclair Par", 69.99, '/src/assets/face4.jpg?height=200&width=200', 7, CategoryEnum.COATS),
  createProduct("Helly Hansen Men's Seven J Waterproof", 79.99, '/src/assets/face5.png?height=200&width=200', 4, CategoryEnum.WATERPROOF),
  createProduct("Mountain Hardwear Men's Stretchdown ", 89.99, '/src/assets/face1.png?height=200&width=200', 5, CategoryEnum.WINTER),
];

export default products;
