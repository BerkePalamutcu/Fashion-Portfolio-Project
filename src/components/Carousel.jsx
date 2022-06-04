import styled from 'styled-components';
import Video from './Video';

const VideoEdited = styled(Video)`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
`;

const Spring = styled.h1`
  font-size: 70px;
  position: absolute;
  top: 38%;
  bottom: 62%;
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
  top: 47%;
  bottom: 53%;
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
  top: 54%;
  bottom: 46%;
  left: 39%;
  right: 61%;
  color: white;
  z-index: 2;
  font-family: 'Baskervville', serif;
  line-height: 0;
`;
const VideoContainer = styled.div`
  user-select: none;
`;

const BlackButton = styled.button`
  position: absolute;
  top: 62%;
  bottom: 38%;
  left: 42%;
  right: 58%;
  z-index: 2;
  width: 200px;
  height: 60px;
  color: white;
  background-color: black;
  box-shadow: none;
  border: none;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Baskervville', serif;

  &:hover {
    background-color: #b78c71;
    cursor: pointer;
  }
`;

const Carousel = () => {
  return (
    <VideoContainer>
      <VideoEdited />
      <Spring>SPRING</Spring>
      <Summer>SUMMER</Summer>
      <Collection>Collection</Collection>
      <BlackButton>New Products</BlackButton>
    </VideoContainer>
  );
};

export default Carousel;
