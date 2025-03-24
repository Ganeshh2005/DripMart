import React, { useState } from 'react';
import styled from 'styled-components';
import VirtualTryOn from '../components/VirtualTryOn';

const TryOnPageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const UploadSection = styled.div`
  text-align: center;
  padding: 3rem;
  border: 2px dashed #ddd;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const UploadButton = styled.button`
  background: #000;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1rem;
  
  &:hover {
    background: #333;
  }
`;

function TryOnPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage({
        name: 'Custom Upload',
        productImage: URL.createObjectURL(file)
      });
    }
  };

  return (
    <TryOnPageContainer>
      <h1>Virtual Try-On Studio</h1>
      <UploadSection>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <UploadButton as="span">
            Upload Your Garment
          </UploadButton>
        </label>
      </UploadSection>
      
      {selectedImage && (
        <VirtualTryOn
          product={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </TryOnPageContainer>
  );
}

export default TryOnPage;