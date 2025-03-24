import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import BrandSection from '../components/BrandSection';
import EthnicSection from '../components/EthnicSection';
import OffersCard from '../components/OffersCard';
import DeliveryBanner from '../components/DeliveryBanner';

const HeroSection = styled.section`
  height: 90vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
              url('https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg');
  background-size: cover;
  background-position: center;
`;

const HeroContent = styled(motion.div)`
  color: white;
  padding: 0 5rem;
  max-width: 800px;

  h1 {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-size: clamp(1rem, 3vw, 1.2rem);
    margin-bottom: 2rem;
    opacity: 0.9;
  }
`;

const ExploreButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: transparent;
  border: 2px solid white;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    color: rgba(0, 0, 0, 1);
  }
`;

const CategorySection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.background};
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  }

  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${CategoryCard}:hover & {
    transform: scale(1.1);
  }
`;

const CategoryInfo = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  color: white;
  z-index: 1;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

function Home() {
  const navigate = useNavigate();

  const categoryImages = {
    men: "https://getpaidstock.com/tmp/[GetPaidStock.com]-67ddc50bd6ec8.jpg",
    women: "https://getpaidstock.com/tmp/[GetPaidStock.com]-67ddc62b19ced.jpg",
    kids: "https://getpaidstock.com/tmp/[GetPaidStock.com]-67ddc67f4c316.jpg"
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg';
  };

  return (
    <>
      {/* Remove DeliveryBanner from here */}
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            staggerChildren: 0.2 
          }}
        >
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover Your Style
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Explore our curated collection of modern fashion essentials
          </motion.p>
          <ExploreButton
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 1)",
              color: "rgba(0, 0, 0, 1)",
              transition: { 
                duration: 0.2,
                backgroundColor: { type: "tween" },
                color: { type: "tween" }
              }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/shop')}
          >
            Explore Now <FaArrowRight />
          </ExploreButton>
        </HeroContent>
      </HeroSection>

      <CategorySection>
        <CategoryGrid>
          {Object.entries(categoryImages).map(([category, imageUrl], index) => (
            <CategoryCard
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              onClick={() => navigate(`/${category}`)}
            >
              <CategoryImage 
                src={imageUrl} 
                alt={`${category} collection`}
                onError={handleImageError}
                loading="lazy"
              />
              <CategoryInfo>
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}'s Collection</h3>
                <p>{
                  category === 'men' ? 'Elevate your style' :
                  category === 'women' ? 'Define your elegance' :
                  'Style for little ones'
                }</p>
              </CategoryInfo>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </CategorySection>

      <BrandSection />
      <DeliveryBanner />
      <EthnicSection />
      <OffersCard />
    </>
  );
}

export default Home;