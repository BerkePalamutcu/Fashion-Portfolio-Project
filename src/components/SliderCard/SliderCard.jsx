import { useDataSlice } from '../hooks/useDataSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductData } from '../../redux/productDataSlice';

//STYLE IMPORTS
import {
  CardWrapper,
  SlideImage,
  CardName,
  CardPrice,
} from './sliderCard.styles';

//COMPONENT
const SliderCard = ({ items, index }) => {
  const { itemData } = items;
  const sliderCardData = useDataSlice(itemData);
  const dispatch = useDispatch();
  const redirectToProductPage = useNavigate();
  return (
    <>
      {sliderCardData.flat().map((item, i) => (
        <CardWrapper
          key={item.id}
          index={index}
          onClick={() => {
            redirectToProductPage(`products/${sliderCardData.flat()[i].id}`, {
              replace: true,
            });
            dispatch(getProductData(sliderCardData.flat()[i]));
          }}
        >
          <SlideImage src={item.imgURL[0]} />
          <CardName>{item.name}</CardName>
          <CardPrice>{item.price}$</CardPrice>
        </CardWrapper>
      ))}
    </>
  );
};

export default SliderCard;
