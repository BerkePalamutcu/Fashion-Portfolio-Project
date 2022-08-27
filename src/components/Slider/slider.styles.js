import styled from "styled-components";
import { device } from "../styles/breakpoints";
//STYLES
export const SliderContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  @media only screen and ${device.mobileL} {
    display: block;
  }
`;

export const SliderHeader = styled.h1`
  font-family: "Baskervville", serif;
  font-size: 56px;
  text-align: center;
  font-weight: 400;
  margin: 70px 0;
  @media only screen and ${device.mobileL} {
    font-size: 30px;
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  @media only screen and ${device.mobileL} {
    gap: 15px;
  }
`;
export const ArrowContainer = styled.div`
  border: none;
  width: 70px;
  height: 70px;
  background-color: #d9d9d9;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media only screen and ${device.mobileL} {
    border-radius: 1%;
    margin-left:5px;
    margin-right: 5px;
    background-color: transparent;
  }
`;
export const SliderDiv = styled.div`
  width: 1200px;
  display: flex;
  overflow: hidden;
`;