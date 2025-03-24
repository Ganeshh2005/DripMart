import { useState } from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function ImageWithFallback({ src, alt, ...props }) {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <StyledImage
      src={error ? '/images/placeholder.jpg' : src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}

export default ImageWithFallback;