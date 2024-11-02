import { css } from '../../styled-system/css';
import { grid } from '../../styled-system/patterns';
import ProductCardComponent from './ProductCardComponent';



let currentId = 1;
const generateId = () => currentId++;

const createProduct = (name, price, image) => ({
  id: generateId(),
  name,
  price,
  image,
  description: `Detailed description of ${name}`, // Dynamic description
});
const products = [
  createProduct("Patagonia Men's Classic Retro-X Ja", 19.99, '/src/assets/face1.png?height=200&width=200'),
  createProduct("North Face Men's ThermoBall Eco J", 29.99, '/src/assets/face2.png?height=200&width=200'),
  createProduct("Columbia Women's Heavenly Long Hoo", 39.99, '/src/assets/face3.jpg?height=200&width=200'),
  createProduct("Arc'teryx Men's Beta AR Jacket     ", 49.99, '/src/assets/face4.jpg?height=200&width=200'),
  createProduct("Marmot Men's PreCip Lightweight Ja", 59.99, '/src/assets/face5.png?height=200&width=200'),
  createProduct("Canada Goose Women's Rossclair Par", 69.99, '/src/assets/face4.jpg?height=200&width=200'),
  createProduct("Helly Hansen Men's Seven J Waterproof", 79.99, '/src/assets/face5.png?height=200&width=200'),
  createProduct("Mountain Hardwear Men's Stretchdown ", 89.99, '/src/assets/face1.png?height=200&width=200')
];

const ProductListComponent = ({ addToCart }) => {
  return (
    <div className={css({ padding: '6' })}>
      <h2 className={css({ fontSize: '3xl', fontWeight: 'bold', marginBottom: '6', textAlign: 'center' })}>
      Our best-selling products
      </h2>
      <div className={grid({ columns: { base: 1, md: 2, lg: 3, xl: 4 }, gap: '6' })}>
        {products.map(product => (
          <ProductCardComponent key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductListComponent;
