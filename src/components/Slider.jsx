import styled from 'styled-components';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const SliderContainer = styled.div`
  height: 700px;
  width: 100vw;
  overflow: hidden;
`;

const SliderHeader = styled.h1`
  font-family: 'Baskervville', serif;
  font-size: 56px;
  text-align: center;
  font-weight: 400;
  margin: 70px 0;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;
const ArrowContainer = styled.div`
  border: none;
  background-color: #f6f3f4;
  padding: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const SliderImg = styled.img.attrs((props) => ({
  src: props.src,
}))`
  height: 400px;
  width: 275px;
`;

const Slider = () => {
  return (
    <div>
      <SliderContainer>
        <SliderHeader>Collection Highlights</SliderHeader>
        <ImgContainer>
          <ArrowContainer>
            <ArrowBackIos />
          </ArrowContainer>
          <SliderImg src="https://cdn.shopify.com/s/files/1/0515/3633/0928/products/Bous.700S22_snow-white_2.jpg?v=1644239150" />
          <SliderImg src="https://cdn.shopify.com/s/files/1/0515/3633/0928/products/Bous.700S22_Chereful_02.jpg?v=1644852421" />
          <SliderImg src="https://cdn.shopify.com/s/files/1/0515/3633/0928/products/Mitsi.700S22T_camel_02.jpg?v=1647457502" />
          <SliderImg src="https://cdn.shopify.com/s/files/1/0515/3633/0928/products/Zada.700S22_twill_02.jpg?v=1645609377" />
          <ArrowContainer>
            <ArrowForwardIos />
          </ArrowContainer>
        </ImgContainer>
      </SliderContainer>
    </div>
  );
};

export default Slider;
