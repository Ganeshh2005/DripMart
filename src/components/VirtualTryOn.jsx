import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCamera, FaTimes } from 'react-icons/fa';

// Update the Overlay z-index to be higher than navbar
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; // Increased from 1000 to be above navbar
`;

// Update the TryOnContainer to add margin from top
const TryOnContainer = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  position: relative;
  margin-top: 4rem; // Add margin to prevent navbar overlap
  max-height: 90vh; // Limit height
  overflow-y: auto; // Add scroll if content is too long
  
  @media (max-width: 768px) {
    margin-top: 2rem;
    padding: 1.5rem;
  }
`;

// Update the VideoContainer to be more responsive
const VideoContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    aspect-ratio: 4/3;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductOverlay = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  max-height: 80%;
`;

const Controls = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: #000;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  &:hover {
    background: #333;
  }
`;

function VirtualTryOn({ product, onClose }) {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TryOnContainer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <h2>Virtual Try-On: {product.name}</h2>
        <VideoContainer>
          <Video 
            ref={videoRef}
            autoPlay
            playsInline
          />
          <ProductOverlay src={product.productImage} alt={product.name} />
        </VideoContainer>
        <Controls>
          <Button>
            <FaCamera /> Take Photo
          </Button>
        </Controls>
      </TryOnContainer>
    </Overlay>
  );
}

export default VirtualTryOn;