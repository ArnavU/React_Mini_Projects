import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useGetImages from './utils/useGetImages';

function Carousel1() {
  const images = useGetImages();
  const [currentIndex, setCurrentIndex] = useState(0);

  const showSlide = (index) => {
      const totalSlides = images.length;
      if (index >= totalSlides) index = 0;
      if (index < 0) index = totalSlides - 1;
      setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
        showSlide(currentIndex+1);
        console.log("HI")
    }, 2000);

    return () => {
        clearInterval(timer);
        console.log("Interval Cleared")
    }
  },[currentIndex])

  return (
      <div className='screen-container flex flex-col items-center justify-center h-screen bg-slate-800'>
        <div className="carousel-container relative overflow-hidden w-full max-w-4xl mx-auto" >
          <button
              className="absolute z-[1] top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-lg"
              onClick={() => showSlide(currentIndex - 1)}
          >
              ←
          </button>
          <div
              className="carousel-inner flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
              {images.map((image, index) => (
                  <div key={image.image_id} className="image-container flex-shrink-0 w-full">
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
        <div className="thumbnail-container flex justify-center mt-4">
          {images.map((image, index) => (
              <div
                  key={image.image_id}
                  className={`thumbnail w-16 h-16 mx-1 border-2 ${index === currentIndex ? 'border-blue-500' : ''}`}
                  onClick={() => showSlide(index)}
              >
                  <img
                      src={image.image_url}
                      alt={`Thumbnail ${image.image_id}`}
                      className="w-full h-full object-cover"
                  />
              </div>
          ))}
        </div>
      </div>
  );
}

export default Carousel1;
