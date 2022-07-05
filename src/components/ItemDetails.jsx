import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

//STYLES
const Container = styled.div`
  margin-top: 10px;
`;
const SliderContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
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
const DetailsContainer = styled.div``;
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
`;
const ArrowContainerRight = styled(ArrowContainerLeft)`
  position: absolute;
  top: 50%;
  left: 92%;
`;
const ArrowBackModified = styled(ArrowBackIos)``;
const ArrowForwardModified = styled(ArrowForwardIos)``;
//COMPONENT
const ItemDetails = () => {
  const [index, setIndex] = useState(0);
  const itemData = useSelector(
    (state) => state.getProductDataReducer.productData
  );
  console.log(itemData);
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
        <DetailsContainer></DetailsContainer>
      </Container>
    </div>
  );
};

export default ItemDetails;
