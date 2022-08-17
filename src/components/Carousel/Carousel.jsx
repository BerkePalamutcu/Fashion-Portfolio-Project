import { useRef } from 'react';

//STYLE IMPORTS
import {
  VideoEdited,
  VideoContainer,
  Spring,
  Summer,
  Collection,
  BlackButton,
} from './carousel.styles';

//COMPONENT
const Carousel = () => {
  const bottomRef = useRef(null);
  const handleNavigation = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <VideoContainer>
      <VideoEdited />
      <Spring>SPRING</Spring>
      <Summer>SUMMER</Summer>
      <Collection>Collection</Collection>
      <BlackButton onClick={handleNavigation}>New Products</BlackButton>
      <div ref={bottomRef}></div>
    </VideoContainer>
  );
};

export default Carousel;
