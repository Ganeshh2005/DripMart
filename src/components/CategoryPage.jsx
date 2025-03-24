import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';
import SkeletonWrapper from './Skeleton';

const CategoryContainer = styled.div`
  padding: 100px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
`;

const CategoryTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.secondary : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  cursor: pointer;
`;

function CategoryPage({ products, title }) {
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFilteredProducts(products);
      setLoading(false);
    }, 1000);
  }, [products]);

  const handlePriceFilter = (range) => {
    setPriceFilter(range);
    let filtered = [...products];
    
    switch(range) {
      case 'under1000':
        filtered = products.filter(p => p.price < 1000);
        break;
      case '1000-3000':
        filtered = products.filter(p => p.price >= 1000 && p.price <= 3000);
        break;
      case 'over3000':
        filtered = products.filter(p => p.price > 3000);
        break;
      default:
        filtered = products;
    }
    
    setFilteredProducts(filtered);
  };

  return (
    <CategoryContainer>
      <CategoryTitle>{title}</CategoryTitle>
      
      <FilterContainer>
        {['all', 'under1000', '1000-3000', 'over3000'].map(range => (
          <FilterButton
            key={range}
            $active={priceFilter === range}
            onClick={() => handlePriceFilter(range)}
          >
            {range === 'all' ? 'All Prices' : 
             range === 'under1000' ? 'Under ₹1000' :
             range === '1000-3000' ? '₹1000 - ₹3000' : 'Over ₹3000'}
          </FilterButton>
        ))}
      </FilterContainer>

      <ProductGrid>
        {loading ? (
          // Skeleton loading
          Array(6).fill(0).map((_, i) => (
            <ProductCard key={i}>
              <SkeletonWrapper height="300px" />
              <ProductInfo>
                <SkeletonWrapper height="24px" />
                <SkeletonWrapper height="20px" style={{ marginTop: '8px' }} />
              </ProductInfo>
            </ProductCard>
          ))
        ) : (
          filteredProducts?.map(product => (
            <ProductCard
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              whileHover={{ y: -5 }}
            >
              <ImageWithFallback 
                src={product.image} 
                alt={product.name}
                loading="lazy"
              />
              <ProductInfo>
                <h3>{product.name}</h3>
                <p>₹{product.price.toLocaleString()}</p>
              </ProductInfo>
            </ProductCard>
          ))
        )}
      </ProductGrid>
    </CategoryContainer>
  );
}

export default CategoryPage;