import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataFromFirestore } from '../../redux/dataSlice';
import { getCategoriesAndDocuments } from '../../firebase/firebaseapp';
import SliderCard from '../SliderCard/SliderCard';

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import {
  SliderContainer,
  SliderHeader,
  ImgContainer,
  ArrowContainer,
  SliderDiv,
} from './slider.styles';

//COMPONENT
const Slider = () => {
  let [index, setIndex] = useState(0);
  const items = useSelector((state) => state.getDataReducer);
  const dispatch = useDispatch();

  const increaseIndex = () => {
    if (index >= 0) {
      setIndex((index += 1));
    }
    if (index === 5) {
      setIndex(0);
    }
  };

  const decreaseIndex = () => {
    if (index >= 0) {
      setIndex((index -= 1));
    }
    if (index === -1) {
      setIndex(4);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const shopData = await getCategoriesAndDocuments('categories');
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
          <ArrowContainer onClick={decreaseIndex}>
            <ArrowBackIos />
          </ArrowContainer>
          <SliderDiv>
            <SliderCard items={items} index={index} />
          </SliderDiv>
          <ArrowContainer onClick={increaseIndex}>
            <ArrowForwardIos />
          </ArrowContainer>
        </ImgContainer>
      </SliderContainer>
    </>
  );
};

export default Slider;
