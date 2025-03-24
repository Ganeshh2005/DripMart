import { useState, useEffect } from 'react';

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevScroll, setPrevScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const direction = currentScroll > prevScroll ? "down" : "up";
      
      if (direction !== scrollDirection && 
          (Math.abs(currentScroll - prevScroll) > 10)) {
        setScrollDirection(direction);
      }
      setPrevScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection, prevScroll]);

  return scrollDirection;
}

export default useScrollDirection;