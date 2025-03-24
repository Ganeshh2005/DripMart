import CategoryPage from './CategoryPage';
import { products } from '../data/products';

function Women() {
  const getWomensProducts = () => {
    const womensProducts = [];
    Object.values(products.women).forEach(subcategory => {
      womensProducts.push(...subcategory);
    });
    return womensProducts;
  };

  return <CategoryPage products={getWomensProducts()} title="Women's Collection" />;
}

export default Women;