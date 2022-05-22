import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import styled from 'styled-components';
import './Slider.css';
const SliderContainer = styled.div`
  height: 700px;
  width: 100 wh;
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
  padding: 30px;
  border-radius: 50%;
  justify-content: center;
  cursor: pointer;
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
          <img src="https://cdn.shopify.com/s/files/1/0515/3633/0928/products/Bous.700S22_snow-white_2.jpg?v=1644239150" />
          <img src="https://cdn.shopify.com/s/files/1/0515/3633/0928/products/Bous.700S22_Chereful_02.jpg?v=1644852421" />
          <img src="https://cdn.shopify.com/s/files/1/0515/3633/0928/products/Mitsi.700S22T_camel_02.jpg?v=1647457502" />
          <img src="https://cdn.shopify.com/s/files/1/0515/3633/0928/products/Zada.700S22_twill_02.jpg?v=1645609377" />
          <ArrowContainer>
            <ArrowForwardIos />
          </ArrowContainer>
        </ImgContainer>
      </SliderContainer>
    </div>
  );
};

export default Slider;
