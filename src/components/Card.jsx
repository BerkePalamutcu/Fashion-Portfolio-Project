import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeCardModalToFalse } from "../redux/modalSlice";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItem,
} from "../redux/bagDataSlice";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
//STYLING
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
`;
const ModalWindow = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 70%;
  width: 50%;
  background-color: white;
  z-index: 101;
  overflow-y: auto;
`;
const CardContainer = styled.div`
  margin: 50px;
`;
const CardWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
`;
const CardHeader = styled.h1`
  font-family: "Baskervville", serif;
`;
const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`;

const CardImage = styled.img.attrs((props) => ({
  props: props.src,
  alt: props.alt,
}))`
  width: 150px;
  height: 200px;
  object-fit: contain;
`;

const CardItemsContainer = styled.div`
  margin-top: 50px;
  overflow-y: auto;
  border-bottom: 1px solid;
  padding-bottom: 20px;
`;

const CardItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 30px 0;
`;
const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  gap: 10px;
`;
const ItemName = styled.h2``;
const ItemPrice = styled.p``;
const ItemSize = styled.p``;

const QuantityContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
`;
const QuantityWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  gap: 30px;
`;
const QuantityCounter = styled.p``;
const MinusSymbol = styled.p`
  cursor: pointer;
  user-select: none;
`;
const PlusSymbol = styled.p`
  cursor: pointer;
  user-select: none;
`;
const RemoveItemButton = styled.button`
  background: transparent;
  font-family: "Baskervville", serif;
  width: 100px;
  font-size: 20px;
  text-align: center;
  color: red;
  border: 1px solid red;
  padding: 5px;
  cursor: pointer;
`;
const TotalPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;
const TotalPriceHeader = styled.h1`
  font-family: "Baskervville", serif;
`;
const TotalPriceNumber = styled.h1`
  font-family: "Domine", serif;
`;

//COMPONENT
const Card = () => {
  const dispatch = useDispatch();
  const bagItemsData = useSelector((state) => state.getBagDataReducer.bagData);

  const ModalWindowData = useSelector(
    (state) => state.changeModalViewReducer.cardModal
  );

  const handleModalWindowClosing = (event) => {
    if (event.target.className.split(" ").includes("backdrop")) {
      dispatch(changeCardModalToFalse(false));
    }
  };
  console.log(bagItemsData);
  return (
    <>
      {ModalWindowData && (
        <ModalBackdrop
          className="backdrop"
          onClick={(event) => handleModalWindowClosing(event)}
        >
          {ModalWindowData && (
            <ModalWindow>
              <CardContainer>
                <CardWrapper>
                  <CardHeader>Your Bag</CardHeader>
                  <StyledCloseIcon
                    className="backdrop"
                    onClick={() => dispatch(changeCardModalToFalse(false))}
                  />
                </CardWrapper>
                <CardItemsContainer>
                  {bagItemsData.map((item, i) => (
                    <CardItemsWrapper key={Math.random()}>
                      <CardImage src={item.imgURL[0]} />
                      <ItemDetails>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>Price: {item.price}$</ItemPrice>
                        <ItemSize>Size: {item.selectedSize}</ItemSize>
                      </ItemDetails>
                      <QuantityContainer>
                        <QuantityWrapper>
                          <MinusSymbol
                            onClick={() => dispatch(decreaseItemQuantity(item))}
                          >
                            -
                          </MinusSymbol>
                          <QuantityCounter>{item.quantity}</QuantityCounter>
                          <PlusSymbol
                            onClick={() => dispatch(increaseItemQuantity(item))}
                          >
                            +
                          </PlusSymbol>
                        </QuantityWrapper>
                        <RemoveItemButton
                          onClick={() => dispatch(removeItem(item))}
                        >
                          Remove
                        </RemoveItemButton>
                      </QuantityContainer>
                    </CardItemsWrapper>
                  ))}
                </CardItemsContainer>
                <TotalPriceContainer>
                  <TotalPriceHeader>Subtotal:</TotalPriceHeader>
                  <TotalPriceNumber>250$</TotalPriceNumber>
                </TotalPriceContainer>
              </CardContainer>
            </ModalWindow>
          )}
        </ModalBackdrop>
      )}
    </>
  );
};

export default Card;
