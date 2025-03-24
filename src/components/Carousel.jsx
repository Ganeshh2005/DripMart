import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const CarouselContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 80px;
`;

const Slide = styled(motion.div)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
`;

const slides = [
  {
    id: 1,
    image: '/banners/summer-sale.jpg',
    title: 'Summer Style Bash',
    content: 'GET 20% OFF UP TO ₹200',
    code: 'DRIPMART20'
  },
  {
    id: 2,
    image: '/banners/special-offer.jpg',
    title: "Sun's Out, Deals Are In!",
    content: '40-80% OFF',
    code: 'SUMMER40'
  }
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <CarouselContainer>
      <AnimatePresence mode="wait">
        <Slide
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SlideImage src={slides[currentSlide].image} alt={slides[currentSlide].title} />
        </Slide>
      </AnimatePresence>
    </CarouselContainer>
  );
}

export default Carousel;