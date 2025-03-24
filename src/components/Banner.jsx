import styled from 'styled-components';
import { motion } from 'framer-motion';

const BannerContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin-top: 60px;
`;

const StyledBanner = styled(motion.div)`
  background: linear-gradient(45deg, #87CEEB, #1E90FF);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
`;

const PromoCode = styled.div`
  background: white;
  color: #1E90FF;
  padding: 10px 20px;
  border-radius: 25px;
  display: inline-block;
  font-weight: bold;
  margin-top: 15px;
`;

const FloatingElements = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

function Banner() {
  return (
    <BannerContainer>
      <StyledBanner
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>SUMMER SALE</h1>
        <h2>GET UP TO 80% OFF</h2>
        <PromoCode>DRIPMART80</PromoCode>
        <FloatingElements
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </StyledBanner>
    </BannerContainer>
  );
}

export default Banner;