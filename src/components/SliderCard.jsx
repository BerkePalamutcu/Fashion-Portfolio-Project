import React from "react";
import styled from "styled-components";
import { useDataSlice } from "./hooks/useDataSlice";

//STYLES

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: translateX(${(props) => props.index * -1200}px);
  transition: all ease-in-out 3s;
`;
const ItemDetails = styled.div``;
const SlideImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  width: 300px;
  height: 400px;
  object-fit: contain;
  cursor: pointer;
`;
const CardName = styled.h3`
  margin-left: 20px;
  font-family: "Baskervville", serif;
  font-weight: 500;
`;
const CardPrice = styled.h3`
  margin-left: 20px;
  font-style: italic;
`;

//COMPONENT
const SliderCard = ({ items, index }) => {
  const { itemData } = items;
  const sliderCardData = useDataSlice(itemData);
  console.log(sliderCardData);
  return (
    <>
      {sliderCardData.flat().map((item) => (
        <CardWrapper key={item.id} index={index}>
          <SlideImage src={item.imgURL[0]} />
          <CardName>{item.name}</CardName>
          <CardPrice>{item.price}$</CardPrice>
        </CardWrapper>
      ))}
    </>
  );
};

export default SliderCard;
