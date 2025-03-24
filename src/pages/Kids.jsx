import CategoryPage from '../components/CategoryPage';
import { products } from '../data/products';

function Kids() {
  const getKidsProducts = () => {
    if (!products.kids) return [];
    
    const kidsProducts = [];
    Object.values(products.kids).forEach(subcategory => {
      if (Array.isArray(subcategory)) {
        kidsProducts.push(...subcategory);
      }
    });
    return kidsProducts;
  };

  return (
    <CategoryPage 
      products={getKidsProducts()} 
      title="Kids' Collection" 
    />
  );
}

export default Kids;