import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaClock } from 'react-icons/fa';

const CardContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 20px;
`;

const Card = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const OverlayContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Timer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const TimeUnit = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  
  span {
    display: block;
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: 1px;
  }
  
  small {
    font-size: 0.9rem;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

// Add these two new styled components
const StyledTitle = styled(motion.h2)`
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const StyledDescription = styled(motion.p)`
  font-family: ${props => props.fontFamily};
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

const offerData = [
  {
    id: 1,
    image: "https://getpaidstock.com/tmp/[GetPaidStock.com]-67ddd6ce65b15.jpg",
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    image: "https://assets.ajio.com/cms/AJIO/WEB/D-AASS-UHP-1.0-S1-MainBanners-P-H&M-Min15-19032025.jpg",
    title: "H&M Collection",
    description: "Minimum 15% off on new arrivals",
    endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    image: "https://getpaidstock.com/tmp/[GetPaidStock.com]-67ddd5c5184df.jpg",
    title: "New Arrivals",
    description: "Get 30% off on new collections",
    endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    image: "https://getpaidstock.com/tmp/[GetPaidStock.com]-67ddd62fe4f79.jpg",
    title: "Flash Sale",
    description: "Extra 20% off on all items",
    endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString()
  }
];

function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <Timer>
      {Object.entries(timeLeft).map(([unit, value]) => (
        <TimeUnit key={unit}>
          <span>{value.toString().padStart(2, '0')}</span>
          <small>{unit.charAt(0).toUpperCase() + unit.slice(1)}</small>
        </TimeUnit>
      ))}
    </Timer>
  );
}

function OffersCard() {
  const getStylesByType = (title) => {
    if (title.includes('Summer')) {
      return {
        titleFont: "'Playfair Display', serif",
        descFont: "'Poppins', sans-serif",
        titleSize: '3.2rem'
      };
    } else if (title.includes('H&M')) {
      return {
        titleFont: "'Montserrat', sans-serif",
        descFont: "'Raleway', sans-serif",
        titleSize: '3rem'
      };
    } else if (title.includes('New Arrivals')) {
      return {
        titleFont: "'Oswald', sans-serif",
        descFont: "'Poppins', sans-serif",
        titleSize: '3.4rem'
      };
    } else {
      return {
        titleFont: "'Raleway', sans-serif",
        descFont: "'Montserrat', sans-serif",
        titleSize: '3rem'
      };
    }
  };

  return (
    <CardContainer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {offerData.map((offer) => {
          const styles = getStylesByType(offer.title);
          return (
            <SwiperSlide key={offer.id}>
              <Card
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image src={offer.image} alt={offer.title} />
                <OverlayContent>
                  <StyledTitle
                    fontFamily={styles.titleFont}
                    fontSize={styles.titleSize}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {offer.title}
                  </StyledTitle>
                  <StyledDescription
                    fontFamily={styles.descFont}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {offer.description}
                  </StyledDescription>
                  <CountdownTimer endDate={offer.endDate} />
                </OverlayContent>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </CardContainer>
  );
}

export default OffersCard;