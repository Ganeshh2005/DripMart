import styled from 'styled-components';
import { motion } from 'framer-motion';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 4px;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const BrandTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #000;
  color: white;
  padding: 4px 8px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Price = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.isOffer ? '#2ecc71' : '#000'};
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
`;

const OfferTag = styled.span`
  color: #2ecc71;
  font-size: 0.9rem;
  font-weight: 500;
`;

function ProductGrid({ products }) {
  return (
    <GridContainer>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <ImageContainer>
            <ProductImage src={product.image} alt={product.name} />
            <BrandTag>{product.brand}</BrandTag>
          </ImageContainer>
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <PriceInfo>
              <Price isOffer={product.offerPrice}>
                ₹{product.offerPrice || product.price}
              </Price>
              {product.offerPrice && (
                <>
                  <OriginalPrice>₹{product.price}</OriginalPrice>
                  <OfferTag>{product.discount}% OFF</OfferTag>
                </>
              )}
            </PriceInfo>
          </ProductInfo>
        </ProductCard>
      ))}
    </GridContainer>
  );
}

export default ProductGrid;