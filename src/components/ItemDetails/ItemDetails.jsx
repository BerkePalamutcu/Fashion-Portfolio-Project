import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendDataToCardComponent } from '../../redux/bagDataSlice';
import { addUserData } from '../../firebase/firebaseapp';

import {
  Container,
  DetailsContainer,
  SliderContainer,
  SliderWrapper,
  SliderImage,
  ArrowContainerLeft,
  ArrowContainerRight,
  ArrowBackModified,
  ArrowForwardModified,
  ItemHeader,
  ItemPrice,
  ItemDescription,
  ItemSizeSelection,
  SelectionContainer,
  StyledButton,
  AddToCartButton,
} from './itemDetails.styles';

//COMPONENT
const ItemDetails = () => {
  const [index, setIndex] = useState(0);
  const [sizeValue, setSizeValue] = useState(undefined);
  const dispatch = useDispatch();
  let itemData = useSelector(
    (state) => state.getProductDataReducer.productData
  );
  itemData = { ...itemData, quantity: 1, selectedSize: sizeValue };

  let bagItemsData = useSelector((state) => state.getBagDataReducer.bagData);

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

  /*Ilerde projeyi gelistirmeye devam edersem verileri 
   firebase'deki kullanici datasina gondermeye yarayan fonksiyon*/

  // useEffect(() => {
  //     addUserData({ bagItemsData });
  // }, [bagItemsData]);

  return (
    <div>
      <Container>
        <SliderContainer>
          <SliderWrapper>
            <ArrowContainerLeft
              onClick={slideIndexHandlerDecrease}
              style={{ display: index === 0 && 'none' }}
            >
              <ArrowBackModified />
            </ArrowContainerLeft>
            {itemData.imgURL.map((img, i) => (
              <SliderImage index={index} src={img} />
            ))}
            <ArrowContainerRight
              onClick={slideIndexHandlerIncrease}
              style={{
                display: itemData.imgURL.length - index === 2 && 'none',
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
                onClick={() => {
                  dispatch(sendDataToCardComponent(itemData));
                  addUserData(bagItemsData);
                }}
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
