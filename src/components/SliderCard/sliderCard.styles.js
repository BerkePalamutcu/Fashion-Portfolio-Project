import styled from 'styled-components';
import { device } from '../styles/breakpoints';

//STYLES
export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: translateX(${(props) => props.index * -1200}px);
  transition: all ease 0.5s;
  @media only screen and ${device.mobileL} {
    transform: translateX(${(props) => props.index * -300}px);
  }
`;
export const SlideImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  width: 300px;
  height: 400px;
  object-fit: contain;
  cursor: pointer;
`;
export const CardName = styled.h3`
  margin-left: 20px;
  font-family: 'Baskervville', serif;
  font-weight: 500;
`;
export const CardPrice = styled.h3`
  margin-left: 20px;
  font-style: italic;
`;
