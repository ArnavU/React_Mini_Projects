import { useState, useEffect, useRef } from 'react';
import './App.css';
import useGetImages from './utils/useGetImages';

function Carousel2() {
  const images = useGetImages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselInnerRef = useRef(null);

  const totalSlides = images.length;

  useEffect(() => {
    if (!isTransitioning) {
      if (currentIndex === totalSlides) {
        setCurrentIndex(0);
        carouselInnerRef.current.style.transition = 'none';
        carouselInnerRef.current.style.transform = `translateX(0%)`;
      } else if (currentIndex === -1) {
        setCurrentIndex(totalSlides - 1);
        carouselInnerRef.current.style.transition = 'none';
        carouselInnerRef.current.style.transform = `translateX(-${(totalSlides - 1) * 100}%)`;
      }
    }
  }, [currentIndex, isTransitioning, totalSlides]);

  const showSlide = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
    carouselInnerRef.current.style.transition = 'transform 0.5s ease-out';
    carouselInnerRef.current.style.transform = `translateX(-${index * 100}%)`;
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === totalSlides) {
      setCurrentIndex(0);
      carouselInnerRef.current.style.transition = 'none';
      carouselInnerRef.current.style.transform = `translateX(0%)`;
    } else if (currentIndex === -1) {
      setCurrentIndex(totalSlides - 1);
      carouselInnerRef.current.style.transition = 'none';
      carouselInnerRef.current.style.transform = `translateX(-${(totalSlides - 1) * 100}%)`;
    }
  };

  return (
    <div className='screen-container flex h-screen items-center justify-center bg-slate-800'>
      <div className="carousel-container relative overflow-hidden w-full max-w-4xl mx-auto">
        <button
          className="absolute z-[1] top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-lg"
          onClick={() => showSlide(currentIndex - 1)}
        >
          ←
        </button>
        <div
          ref={carouselInnerRef}
          className="carousel-inner flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {images.map((image, index) => (
            <div key={index} className="image-container flex-shrink-0 w-full">
              <img
                src={image.image_url}
                alt={`Slide ${image.image_id}`}
                className="image w-full h-auto"
              />
            </div>
          ))}
          {images.map((image, index) => (
            <div key={totalSlides + index} className="image-container flex-shrink-0 w-full">
              <img
                src={image.image_url}
                alt={`Slide ${image.image_id}`}
                className="image w-full h-auto"
              />
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-lg"
          onClick={() => showSlide(currentIndex + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Carousel2;
