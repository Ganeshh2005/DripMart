import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EthnicContainer = styled.section`
  padding: 4rem 2rem;
  background: #fff5f5;
`;

const EthnicTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
`;

const EthnicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const EthnicCard = styled(motion.div)`
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const EthnicImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${props => props.$isKurta && `
    object-position: top;
  `}
`;

const EthnicOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
`;

const ethnicCollections = [
  {
    name: "Kurta Suit Sets",
    image: "https://images.pexels.com/photos/2531734/pexels-photo-2531734.jpeg",
    discount: "MIN. 40% OFF",
    link: "/ethnic/kurta-sets"
  },
  {
    name: "Kurtas & Kurtis",
    image: "https://getpaidstock.com/tmp/[GetPaidStock.com]-67ddc387d3a2a.jpg",
    discount: "MIN. 50% OFF",
    link: "/ethnic/kurtas"
  },
  {
    name: "Co-Ord Sets",
    image: "https://getpaidstock.com/tmp/[GetPaidStock.com]-67ddc4b48d607.jpg",
    discount: "MIN. 50% OFF",
    link: "/ethnic/coord-sets"
  }
];

function EthnicSection() {
  const navigate = useNavigate();

  return (
    <EthnicContainer>
      <EthnicTitle>Ethnicwear</EthnicTitle>
      <EthnicGrid>
        {ethnicCollections.map((collection) => (
          <EthnicCard
            key={collection.name}
            whileHover={{ y: -10 }}
            onClick={() => navigate(collection.link)}
          >
            <EthnicImage 
              src={collection.image} 
              alt={collection.name} 
              $isKurta={collection.name === "Kurtas & Kurtis"}
            />
            <EthnicOverlay>
              <h3>{collection.name}</h3>
              <p>{collection.discount}</p>
            </EthnicOverlay>
          </EthnicCard>
        ))}
      </EthnicGrid>
    </EthnicContainer>
  );
}

export default EthnicSection;