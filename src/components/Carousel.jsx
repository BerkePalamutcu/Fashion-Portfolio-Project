import styled from 'styled-components';
import Video from './Video';

const VideoEdited = styled(Video)`
  position: absolute;
  object-fit: cover;
  width: 100wh;
  height: 100%;
`;

const Spring = styled.h1`
  font-size: 70px;
  position: absolute;
  top: 30%;
  bottom: 70%;
  left: 40%;
  right: 60%;
  color: white;
  z-index: 2;
  font-family: 'Baskervville', serif;
  font-weight: 400;
  line-height: 40px;
`;
const Summer = styled.h1`
  font-size: 70px;
  position: absolute;
  top: 37%;
  bottom: 63%;
  left: 38.5%;
  right: 61.5%;
  color: white;
  z-index: 2;
  font-family: 'Baskervville', serif;
  font-weight: 400;
  line-height: 0;
`;

const Collection = styled.h1`
  font-size: 70px;
  font-weight: 300;
  font-style: italic;
  position: absolute;
  top: 42%;
  bottom: 58%;
  left: 39%;
  right: 61%;
  color: white;
  z-index: 2;
  font-family: 'Baskervville', serif;
  line-height: 0;
`;
const VideoContainer = styled.div`
  position: relative;
  user-select: none;
`;

const Carousel = () => {
  return (
    <div>
      <VideoContainer>
        <Spring>SPRING</Spring>
        <Summer>SUMMER</Summer>
        <Collection>Collection</Collection>
        <VideoEdited />
      </VideoContainer>
    </div>
  );
};

export default Carousel;
