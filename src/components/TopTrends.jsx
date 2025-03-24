import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const TrendsSection = styled.section`
  padding: 4rem 2rem;
  background: #f8f8f8;
`;

const TrendsTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const TrendsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TrendCard = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const TrendImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const TrendInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
`;

const TrendTitle = styled.h3`
  margin: 0;
  font-size: 1.4rem;
`;

const TrendPrice = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

const trends = [
  {
    id: 1,
    title: "TRENDS Collection",
    price: "MIN. 70% OFF",
    image: "/images/trends-collection.jpg",
    link: "/shop"
  },
  {
    id: 2,
    title: "Summer Collection",
    price: "UNDER ₹499",
    image: "/images/summer-collection.jpg",
    link: "/shop"
  },
  {
    id: 3,
    title: "Premium Brands",
    price: "UNDER ₹399",
    image: "/images/premium-brands.jpg",
    link: "/shop"
  },
  {
    id: 4,
    title: "Designer Picks",
    price: "MIN. 60% OFF",
    image: "/images/designer-picks.jpg",
    link: "/shop"
  }
];

function TopTrends() {
  const navigate = useNavigate();

  return (
    <TrendsSection>
      <TrendsTitle>Top Trends</TrendsTitle>
      <TrendsGrid>
        {trends.map(trend => (
          <TrendCard
            key={trend.id}
            onClick={() => navigate(trend.link)}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TrendImage src={trend.image} alt={trend.title} />
            <TrendInfo>
              <TrendTitle>{trend.title}</TrendTitle>
              <TrendPrice>{trend.price}</TrendPrice>
            </TrendInfo>
          </TrendCard>
        ))}
      </TrendsGrid>
    </TrendsSection>
  );
}

export default TopTrends;