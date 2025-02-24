import React, { useEffect, useState, useRef } from 'react';
import data from './data.json';
import './styles.css';

console.log(data);

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const handlePrev = () => {
    if (index === 0) {
      setIndex(data.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    setIndex((prevIndex) => {
      if (prevIndex === data.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(handleNext, 1000); // Auto-slide every 1 seconds
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      onMouseEnter={() => clearInterval(intervalRef.current)} // Pause on hover
      onMouseLeave={() => (intervalRef.current = setInterval(handleNext, 3000))} // Resume on mouse leave
      className="carousel-container"
    >
      <div onClick={handlePrev} className="carousel-button carousel-button--left">
        ◀️
      </div>

      <img src={data[index].download_url} alt={`Slide ${index + 1}`} className="carousel-image" />

      <div onClick={handleNext} className="carousel-button carousel-button--right">
        ▶️
      </div>
    </div>
  );
};

export default ImageCarousel;