import styled from 'styled-components';

const BannerContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 20px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

function DeliveryBanner() {
  return (
    <BannerContainer>
      <BannerImage 
        src="https://assets.ajio.com/cms/AJIO/WEB/D-UHP1.0-04022025-Freedeliverystrip.jpg" 
        alt="Free Delivery Banner"
      />
    </BannerContainer>
  );
}

export default DeliveryBanner;