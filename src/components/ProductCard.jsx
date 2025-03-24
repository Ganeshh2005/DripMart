import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const Card = styled(motion.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  color: #2d3748;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
  width: 100%;
`;

// Add error handling for images
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Info = styled.div`
  padding: 1rem;
  text-align: left;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.accent};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <Card>
      <ImageContainer>
        <Image src={product.image} alt={product.name} />
      </ImageContainer>
      <Info>
        <h3>{product.name}</h3>
        <p>₹{product.price.toLocaleString()}</p>
        <ButtonGroup>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
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
        </ButtonGroup>
      </Info>
    </Card>
  );
}

export default ProductCard;