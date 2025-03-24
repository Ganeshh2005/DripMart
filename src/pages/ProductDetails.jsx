import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart, FaShoppingCart, FaMinus, FaPlus, FaStar } from 'react-icons/fa';
import { products } from '../data/products';
import SizeGuide from '../components/SizeGuide';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 120px 20px 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Price = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.accent};
`;

const SizeSelector = styled.div`
  margin-bottom: 2rem;
`;

const SizeButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border: 1px solid ${props => props.theme.colors.primary};
  background: ${props => props.$selected ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$selected ? props.theme.colors.secondary : props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const QuantityButton = styled(motion.button)`
  padding: 0.5rem;
  border: none;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
`;

// Add these new styled components
const ReviewsSection = styled.div`
  margin-top: 3rem;
`;

const Review = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.accent};
  
  &:last-child {
    border-bottom: none;
  }
`;

const Stars = styled.div`
  color: #ffd700;
  display: flex;
  gap: 0.2rem;
`;

const RecommendationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 3rem;
`;

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false); // Keep this one

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

  const getRecommendations = () => {
    const allProducts = getAllProducts();
    return allProducts
      .filter(p => p.id !== id)
      .slice(0, 4);
  };

  // Find product from all categories
  const findProduct = () => {
    let foundProduct = null;
    Object.values(products).forEach(category => {
      Object.values(category).forEach(subcategory => {
        if (Array.isArray(subcategory)) {
          const found = subcategory.find(product => product.id === id);
          if (found) foundProduct = found;
        } else {
          Object.values(subcategory).forEach(items => {
            const found = items.find(product => product.id === id);
            if (found) foundProduct = found;
          });
        }
      });
    });
    return foundProduct;
  };

  const product = findProduct();
  const isInWishlist = wishlist.some(item => item.id === id);

  if (!product) {
    return <Container>Product not found</Container>;
  }

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast.warning('Please select a size');
      return;
    }
    addToCart({ ...product, selectedSize }, quantity);
  };

  // Add inside ProductDetails component, before return statement
  // Remove this duplicate declaration
  // const [showSizeGuide, setShowSizeGuide] = useState(false);
  
  // Remove this duplicate function
  // const getRecommendations = () => {
  //   const category = product.category;
  //   return getAllProducts()
  //     .filter(p => p.category === category && p.id !== product.id)
  //     .slice(0, 4);
  // };

  return (
    <Container>
      <ProductLayout>
        <ImageSection>
          <Image src={product.image} alt={product.name} />
        </ImageSection>
        
        <InfoSection>
          <Title>{product.name}</Title>
          <Price>₹{product.price.toLocaleString()}</Price>
          <Description>{product.description}</Description>

          {product.sizes && (
            <SizeSelector>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Select Size</h3>
                <Button
                  as="span"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  style={{ background: 'transparent', color: 'black' }}
                >
                  Size Guide
                </Button>
              </div>
              {showSizeGuide && <SizeGuide category={product.category} />}
              {product.sizes.map(size => (
                <SizeButton
                  key={size}
                  $selected={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </SizeButton>
              ))}
            </SizeSelector>
          )}

          <QuantitySelector>
            <QuantityButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => quantity > 1 && setQuantity(q => q - 1)}
            >
              <FaMinus />
            </QuantityButton>
            <span>{quantity}</span>
            <QuantityButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(q => q + 1)}
            >
              <FaPlus />
            </QuantityButton>
          </QuantitySelector>

          <ActionButtons>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
            >
              <FaShoppingCart /> Add to Cart
            </Button>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToWishlist(product)}
              style={{
                background: isInWishlist ? '#ff4d4d' : 'transparent',
                border: '1px solid #ff4d4d',
                color: isInWishlist ? 'white' : '#ff4d4d'
              }}
            >
              <FaHeart />
            </Button>
          </ActionButtons>
        </InfoSection>
      </ProductLayout>

      <ReviewsSection>
        <h2>Customer Reviews</h2>
        <Stars>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
          <span style={{ marginLeft: '0.5rem' }}>4.8 (124 reviews)</span>
        </Stars>
        {[
          { user: "John D.", rating: 5, comment: "Great quality and fit!" },
          { user: "Sarah M.", rating: 4, comment: "Nice product, shipping was fast" }
        ].map((review, index) => (
          <Review key={index}>
            <Stars>
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </Stars>
            <p><strong>{review.user}</strong></p>
            <p>{review.comment}</p>
          </Review>
        ))}
      </ReviewsSection>

      <div>
        <h2>You May Also Like</h2>
        <RecommendationsGrid>
          {getRecommendations().map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </RecommendationsGrid>
      </div>
    </Container>
  );
}

export default ProductDetails;