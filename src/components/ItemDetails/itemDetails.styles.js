import styled from 'styled-components';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
//STYLES
export const Container = styled.div`
  margin-top: 10px;
  display: flex;
`;

export const DetailsContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 50px 120px;
  font-family: 'Domine', serif;
  gap: 10px;
`;
export const SliderContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  margin-top: 50px;
`;
export const SliderWrapper = styled.div`
  display: flex;
  position: relative;
  width: 1260px;
  overflow: hidden;
`;
export const SliderImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  height: 950px;
  width: 650px;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.index * -33}vw);
`;

export const ArrowContainerLeft = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 0;
  padding: 18px;
  border-radius: 50px;
  background-color: white;
  margin-left: 20px;
  cursor: pointer;
  z-index: 2;
  user-select: none;
`;
export const ArrowContainerRight = styled(ArrowContainerLeft)`
  position: absolute;
  top: 50%;
  left: 92%;
`;
export const ArrowBackModified = styled(ArrowBackIos)``;
export const ArrowForwardModified = styled(ArrowForwardIos)``;
export const ItemHeader = styled.h1`
  font-size: 40px;
  font-family: 'Quintessential', cursive;
  font-weight: 500;
`;
export const ItemPrice = styled.h3`
  font-size: 25px;
  font-weight: 500;
`;
export const ItemDescription = styled.p`
  font-size: 18px;
  font-weight: 400;

  font-family: 'Arima', cursive;
  margin-top: 100px;
`;
export const ItemSizeSelection = styled.select`
  display: flex;
  align-items: center;
  height: 50px;
  width: 80px;
  padding: 5px 10px;
  font-family: 'Arima', cursive;
  font-size: 18px;
  font-weight: 500;
  border: 1px solid black;
  background-color: white;
`;
export const SelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 80px;
  gap: 10px;
`;
export const StyledButton = styled.button`
  height: 50px;
  width: 300px;
  font-size: 17px;
  font-weight: bold;
  background-color: #a89090;
  color: white;
  border: none;
`;
export const AddToCartButton = styled(StyledButton)`
  background-color: black;
  cursor: pointer;
`;
