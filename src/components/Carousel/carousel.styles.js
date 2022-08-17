import styled from 'styled-components';
import Video from '../Video/Video';
import { device } from '../styles/breakpoints';
//STYLES
export const VideoEdited = styled(Video)`
  width: 10%;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
`;

export const Spring = styled.h1`
  font-size: 70px;
  position: absolute;
  display: flex;
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
export const Summer = styled.h1`
  font-size: 70px;
  position: absolute;
  display: flex;
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

export const Collection = styled.h1`
  font-size: 70px;
  font-weight: 300;
  font-style: italic;
  position: absolute;
  display: flex;
  top: 54%;
  bottom: 46%;
  left: 39%;
  right: 61%;
  color: white;
  z-index: 2;
  font-family: 'Baskervville', serif;
  line-height: 0;
`;
export const VideoContainer = styled.div`
  user-select: none;
  overflow: hidden;
  @media only screen and ${device.mobileL} {
    display: none;
  }
`;

export const BlackButton = styled.button`
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
