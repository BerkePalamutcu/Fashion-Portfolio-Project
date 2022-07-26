import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { sendDataToCardComponent } from "../redux/bagDataSlice";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

//STYLES
const Container = styled.div`
  margin-top: 10px;
  display: flex;
`;

const DetailsContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 50px 120px;
  font-family: "Domine", serif;
  gap: 10px;
`;
const SliderContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  margin-top: 50px;
`;
const SliderWrapper = styled.div`
  display: flex;
  position: relative;
  width: 1260px;
  overflow: hidden;
`;
const SliderImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  height: 950px;
  width: 650px;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.index * -33}vw);
`;

const ArrowContainerLeft = styled.div`
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
const ArrowContainerRight = styled(ArrowContainerLeft)`
  position: absolute;
  top: 50%;
  left: 92%;
`;
const ArrowBackModified = styled(ArrowBackIos)``;
const ArrowForwardModified = styled(ArrowForwardIos)``;
const ItemHeader = styled.h1`
  font-size: 40px;
  font-family: "Quintessential", cursive;
  font-weight: 500;
`;
const ItemPrice = styled.h3`
  font-size: 25px;
  font-weight: 500;
`;
const ItemDescription = styled.p`
  font-size: 18px;
  font-weight: 400;

  font-family: "Arima", cursive;
  margin-top: 100px;
`;
const ItemSizeSelection = styled.select`
  display: flex;
  align-items: center;
  height: 50px;
  width: 80px;
  padding: 5px 10px;
  font-family: "Arima", cursive;
  font-size: 18px;
  font-weight: 500;
  border: 1px solid black;
  background-color: white;
`;
const SelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 80px;
  gap: 10px;
`;
const StyledButton = styled.button`
  height: 50px;
  width: 300px;
  font-size: 17px;
  font-weight: bold;
  background-color: #a89090;
  color: white;
  border: none;
`;
const AddToCartButton = styled(StyledButton)`
  background-color: black;
  cursor: pointer;
`;
//COMPONENT
const ItemDetails = () => {
  const [index, setIndex] = useState(0);
  const [sizeValue, setSizeValue] = useState(undefined);
  const dispatch = useDispatch();
  let itemData = useSelector(
    (state) => state.getProductDataReducer.productData
  );
  itemData = { ...itemData, quantity: 1, selectedSize: sizeValue };
  const slideIndexHandlerIncrease = (array) => {
    if (itemData.imgURL.length - index !== 2) {
      setIndex(index + 1);
    }
  };
  const slideIndexHandlerDecrease = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const handleSizeSelection = (event) => {
    setSizeValue(event.target.value);
  };

  return (
    <div>
      <Container>
        <SliderContainer>
          <SliderWrapper>
            <ArrowContainerLeft
              onClick={slideIndexHandlerDecrease}
              style={{ display: index === 0 && "none" }}
            >
              <ArrowBackModified />
            </ArrowContainerLeft>
            {itemData.imgURL.map((img, i) => (
              <SliderImage index={index} src={img} />
            ))}
            <ArrowContainerRight
              onClick={slideIndexHandlerIncrease}
              style={{
                display: itemData.imgURL.length - index === 2 && "none",
              }}
            >
              <ArrowForwardModified />
            </ArrowContainerRight>
          </SliderWrapper>
        </SliderContainer>
        <DetailsContainer>
          <ItemHeader>{itemData.name}</ItemHeader>
          <ItemPrice>{itemData.price}$</ItemPrice>
          <ItemDescription>{itemData.description}</ItemDescription>
          <SelectionContainer>
            <ItemSizeSelection
              value={sizeValue}
              onChange={(event) => handleSizeSelection(event)}
            >
              <option value="34">34</option>
              <option value="36">36</option>
              <option value="38">38</option>
              <option value="40">40</option>
              <option value="42">42</option>
              <option value="44">44</option>
              <option value="46">46</option>
              <option value="48">48</option>
            </ItemSizeSelection>
            {sizeValue === undefined ? (
              <StyledButton>Select a size</StyledButton>
            ) : (
              <AddToCartButton
                onClick={() => dispatch(sendDataToCardComponent(itemData))}
              >
                Add to Cart
              </AddToCartButton>
            )}
          </SelectionContainer>
        </DetailsContainer>
      </Container>
    </div>
  );
};

export default ItemDetails;
