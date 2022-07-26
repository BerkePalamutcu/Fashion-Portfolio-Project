import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataFromFirestore } from "../redux/dataSlice";
import styled from "styled-components";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { getCategoriesAndDocuments } from "../firebase/firebaseapp";
import SliderCard from "./SliderCard";
//STYLES
const SliderContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SliderHeader = styled.h1`
  font-family: "Baskervville", serif;
  font-size: 56px;
  text-align: center;
  font-weight: 400;
  margin: 70px 0;
`;

const ImgContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;
const ArrowContainer = styled.div`
  border: none;
  width: 70px;
  height: 70px;
  background-color: #f6f3f4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const SliderDiv = styled.div`
  width: 1200px;
  display: flex;
  overflow: hidden;

`;
//COMPONENT
const Slider = () => {
  const items = useSelector((state) => state.getDataReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const shopData = await getCategoriesAndDocuments("categories");
      dispatch(getDataFromFirestore(shopData));
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SliderContainer>
        <SliderHeader>Collection Highlights</SliderHeader>
        <ImgContainer>
          <ArrowContainer>
            <ArrowBackIos />
          </ArrowContainer>
          <SliderDiv>
            <SliderCard items={items} />
          </SliderDiv>
          <ArrowContainer>
            <ArrowForwardIos />
          </ArrowContainer>
        </ImgContainer>
      </SliderContainer>
    </>
  );
};

export default Slider;
