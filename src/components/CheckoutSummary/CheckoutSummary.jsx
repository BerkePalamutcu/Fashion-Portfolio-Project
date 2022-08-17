import { useSelector } from 'react-redux';
import SummaryItem from '../SummaryItem/SummaryItem';
import {
  SummaryContainer,
  SummaryWrapper,
  HeaderDiv,
  SummaryHeader,
  TotalPriceContainer,
  TotalPriceTag,
} from './checkoutSummary.styles';

//COMPONENT
const CheckoutSummary = () => {
  const cardSummaryData = useSelector(
    (state) => state.getBagDataReducer.bagData
  );

  const totalItemPrice = useSelector((state) =>
    state.getBagDataReducer.bagData
      .map((item) => item.price * item.quantity)
      .reduce((acc, current) => acc + current, 0)
      .toFixed(2)
  );

  return (
    <>
      <SummaryContainer>
        <HeaderDiv>
          <SummaryHeader>PAYMENT SUMMARY</SummaryHeader>
        </HeaderDiv>
        <TotalPriceContainer>
          <TotalPriceTag>
            <span style={{ marginRight: '10px', fontStyle: 'italic' }}>
              Total:
            </span>
            {totalItemPrice} USD
          </TotalPriceTag>
        </TotalPriceContainer>
        <SummaryWrapper>
          <SummaryItem cardSummaryData={cardSummaryData} />
        </SummaryWrapper>
      </SummaryContainer>
    </>
  );
};

export default CheckoutSummary;
