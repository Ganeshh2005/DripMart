import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { products } from '../data/products';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

const ShopContainer = styled.div`
  padding: 100px 20px 20px;
  max-width: 100%;
  margin: 0 auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 1fr;
  gap: 3rem;
  padding: 2rem 0;
`;

const ProductCardWrapper = styled(motion.div)`
  background: ${props => props.theme.colors.secondary};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: 1rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const ProductPrice = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.secondary};
  color: ${props => props.$active ? props.theme.colors.secondary : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function Shop() {
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categories = ['all', 'men', 'women', 'kids'];

  const getAllProducts = () => {
    let allProducts = [];
    Object.keys(products).forEach(gender => {
      Object.keys(products[gender]).forEach(category => {
        if (category === 'accessories') {
          Object.values(products[gender][category]).forEach(accessoryArray => {
            allProducts = [...allProducts, ...accessoryArray];
          });
        } else {
          allProducts = [...allProducts, ...products[gender][category]];
        }
      });
    });
    return allProducts;
  };

  const getFilteredProducts = () => {
    const allProducts = getAllProducts();
    if (filter === 'all') {
      return allProducts;
    }
    const categoryProducts = [];
    Object.values(products[filter]).forEach(subcategory => {
      categoryProducts.push(...subcategory);
    });
    return categoryProducts;
  };

  const handleImageError = (e) => {
    e.target.src = '/images/placeholder.jpg';
  };

  if (loading) {
    return (
      <ShopContainer>
        <LoadingSpinner />
      </ShopContainer>
    );
  }

  if (error) {
    return (
      <ShopContainer>
        <p>Error loading products. Please try again later.</p>
      </ShopContainer>
    );
  }

  return (
    <ShopContainer>
      <FilterSection>
        {categories.map(category => (
          <FilterButton
            key={category}
            $active={filter === category}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </FilterButton>
        ))}
      </FilterSection>
      
      <ProductGrid>
        {getFilteredProducts().map(product => (
          <ProductCardWrapper key={product.id}>
            <ProductCard product={product} />
          </ProductCardWrapper>
        ))}
      </ProductGrid>
    </ShopContainer>
  );
}

export default Shop;