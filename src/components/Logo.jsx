import styled from 'styled-components';
import { motion } from 'framer-motion';
import { RiShoppingBagLine } from 'react-icons/ri';

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
`;

const LogoIcon = styled(motion.div)`
  font-size: 2.2rem;
  color: #000;
  display: flex;
  align-items: center;
  
  svg {
    stroke-width: 1.5;
  }
`;

const BrandName = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: #000;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #FF4D94;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
`;

function Logo() {
  return (
    <LogoContainer
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
        "& h1::after": { transform: "scaleX(1)", transformOrigin: "left" }
      }}
    >
      <LogoIcon
        whileHover={{ rotate: 15, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <RiShoppingBagLine />
      </LogoIcon>
      <BrandName>DRIPMART</BrandName>
    </LogoContainer>
  );
}

export default Logo;