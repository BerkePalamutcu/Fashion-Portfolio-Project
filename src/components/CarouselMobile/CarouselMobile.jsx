import { useRef } from 'react';
import {
  Spring,
  Summer,
  Collection,
  BlackButton,
} from '../Carousel/carousel.styles';
import { BackgroundImage } from './carouselMobile.styles';

const CarouselMobile = () => {
  const bottomRef = useRef(null);
  const handleNavigation = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <BackgroundImage>
        <Spring>SPRING</Spring>
        <Summer>SUMMER</Summer>
        <Collection>Collection</Collection>
        <BlackButton onClick={handleNavigation}>New Products</BlackButton>
      </BackgroundImage>
      <div ref={bottomRef}></div>
    </>
  );
};

export default CarouselMobile;
