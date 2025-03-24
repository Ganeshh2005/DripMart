import CategoryPage from './CategoryPage';
import { products } from '../data/products';

function Men() {
  const getMensProducts = () => {
    const mensProducts = [];
    Object.values(products.men).forEach(subcategory => {
      mensProducts.push(...subcategory);
    });
    return mensProducts;
  };

  return <CategoryPage products={getMensProducts()} title="Men's Collection" />;
}

export default Men;