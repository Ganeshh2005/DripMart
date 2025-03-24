import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const CategoryContainer = styled.div`
  padding: 100px 20px 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const ProductPrice = styled.p`
  margin: 0.5rem 0;
  font-size: 1.1rem;
  font-weight: bold;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

function CategoryPage({ products, title }) {
  const { addToCart } = useCart();

  return (
    <CategoryContainer>
      <h1>{title}</h1>
      <ProductGrid>
        {products.map(product => (
          <ProductCard
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>₹{product.price.toLocaleString()}</ProductPrice>
              <AddToCartButton onClick={() => addToCart(product, 'M')}>
                Add to Cart
              </AddToCartButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </CategoryContainer>
  );
}

export default CategoryPage;