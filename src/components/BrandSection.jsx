import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import VirtualTryOn from './VirtualTryOn';

const BrandContainer = styled.section`
  width: 100%;
  max-width: 1600px;
  margin: 4rem auto;
  padding: 0 20px;
  background-color: #ffffff;
`;

const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BrandCard = styled(motion.div)`
  position: relative;
  aspect-ratio: 3/4;
  cursor: pointer;
  overflow: hidden;
  background: #ffffff;

  &:hover {
    .try-on-button {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const BrandImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TryOnButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  z-index: 2;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background: #000;
  }
`;

const BrandInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  text-align: center;
  color: white;
  
  .brand-logo {
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .discount {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 1px;
  }
`;

const brandData = [
  {
    id: 1,
    image: 'https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-06022025-ajioexclusive-asos-upto30.jpg',
    productImage: 'https://assets.ajio.com/medias/sys_master/root/20250211/E26R/67ab63a2bc78b543a938eed1/asos_design_white_italy_print_oversized_crew-neck_t-shirt.jpg'
  },
  {
    id: 2,
    image: 'https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-06022025-ajioexclusive-gap-upto50.jpg',
    productImage: 'https://assets.ajio.com/medias/sys_master/root/20231012/nzrB/65279c89afa4cf41f5bd4940/-473Wx593H-469510169-blue-MODEL.jpg'
  },
  {
    id: 3,
    image: 'https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-07112024-ajioexclusives-budajeansco-min60.jpg',
    productImage: 'https://assets.ajio.com/medias/sys_master/root/20230621/6Yf4/6492a9afa9b42d15c9324f23/-473Wx593H-469510169-blue-MODEL2.jpg'
  },
  {
    id: 4,
    image: 'https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-06022025-ajioexclusive-gas-upto50.jpg',
    productImage: 'https://assets.ajio.com/medias/sys_master/root/20230621/Mxz8/6492a9afa9b42d15c9324f1f/-473Wx593H-469510169-blue-MODEL3.jpg'
  }
];

function BrandSection() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleBrandClick = (brand) => {
    if (brand.name === 'ASOS') {
      navigate('/men', { 
        state: { 
          featuredImage: brand.productImage,
          brandName: brand.name
        } 
      });
    } else {
      navigate(`/brand/${brand.name.toLowerCase()}`);
    }
  };

  return (
    <BrandContainer>
      <BrandGrid>
        {brandData.map((brand) => (
          <BrandCard
            key={brand.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleBrandClick(brand)}
          >
            <BrandImage src={brand.image} alt={brand.name} loading="lazy" />
            {brand.productImage && (
              <TryOnButton
                className="try-on-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(brand);
                }}
              >
                Virtual Try-On
              </TryOnButton>
            )}
            <BrandInfo>
              <div className="brand-logo">{brand.name}</div>
            </BrandInfo>
          </BrandCard>
        ))}
      </BrandGrid>
      
    </BrandContainer>
  );
}

export default BrandSection;