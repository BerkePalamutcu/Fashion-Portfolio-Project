import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCardModalToFalse } from '../../redux/modalSlice';
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItem,
  getTotalQuantity,
} from '../../redux/bagDataSlice';
import { useNavigate } from 'react-router-dom';
import {
  ModalBackdrop,
  ModalWindow,
  CardContainer,
  CardWrapper,
  CardHeader,
  StyledCloseIcon,
  CardItemsContainer,
  CardItemsWrapper,
  CardImage,
  ItemDetails,
  ItemName,
  ItemPrice,
  ItemSize,
  QuantityContainer,
  QuantityWrapper,
  QuantityCounter,
  PlusSymbol,
  MinusSymbol,
  RemoveItemButton,
  EmptyBagNotification,
  TotalPriceContainer,
  TotalPriceHeader,
  TotalPriceNumber,
  CheckoutButton,
} from './card.styles';

//COMPONENT
const Card = () => {
  const dispatch = useDispatch();
  const redirectToCheckoutPage = useNavigate();
  const iconRef = React.useRef(null);
  let bagItemsData = useSelector((state) => state.getBagDataReducer.bagData);

  const ModalWindowData = useSelector(
    (state) => state.changeModalViewReducer.cardModal
  );

  const handleModalWindowClosing = (event) => {
    if (event.target === iconRef.current) {
      dispatch(changeCardModalToFalse(false));
    } else {
      return;
    }
  };

  let totalItemQuantity = bagItemsData
    .map((item) => item.quantity)
    .reduce((acc, curr) => acc + curr, 0);

  React.useEffect(() => {
    dispatch(getTotalQuantity(totalItemQuantity));
  }, [totalItemQuantity, dispatch]);

  return (
    <>
      {ModalWindowData && (
        <ModalBackdrop onClick={(event) => handleModalWindowClosing(event)}>
          {ModalWindowData && (
            <ModalWindow>
              <CardContainer>
                <CardWrapper>
                  <CardHeader>Your Bag</CardHeader>
                  <StyledCloseIcon
                    ref={iconRef}
                    className="backdrop"
                    onClick={() => dispatch(changeCardModalToFalse(false))}
                  />
                </CardWrapper>
                {bagItemsData.length !== 0 ? (
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
                              onClick={() =>
                                dispatch(decreaseItemQuantity(item))
                              }
                            >
                              -
                            </MinusSymbol>
                            <QuantityCounter>{item.quantity}</QuantityCounter>
                            <PlusSymbol
                              onClick={() =>
                                dispatch(increaseItemQuantity(item))
                              }
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
                ) : (
                  <EmptyBagNotification>
                    Your bag is empty!
                  </EmptyBagNotification>
                )}
                <TotalPriceContainer>
                  <TotalPriceHeader>Subtotal:</TotalPriceHeader>
                  <TotalPriceNumber>
                    {bagItemsData
                      ? bagItemsData
                          .map((item, i) => item.price * item.quantity)
                          .reduce((acc, current) => acc + current, 0)
                          .toFixed(2)
                      : '0$'}
                    $
                  </TotalPriceNumber>
                </TotalPriceContainer>
                {bagItemsData.length > 0 && (
                  <CheckoutButton
                    onClick={() =>
                      redirectToCheckoutPage(`/checkout`, { replace: false })
                    }
                  >
                    Go to Checkout
                  </CheckoutButton>
                )}
              </CardContainer>
            </ModalWindow>
          )}
        </ModalBackdrop>
      )}
    </>
  );
};

export default Card;
