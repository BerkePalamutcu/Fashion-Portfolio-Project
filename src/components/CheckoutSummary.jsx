import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SummaryItem from './SummaryItem';
const SummaryContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 50%;
  background-color: #ebe4db;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 500px;
  width: 100%;
  gap: 30px;
`;
const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 90px;
  width: 100%;
  margin-left: 80px;
`;
const SummaryHeader = styled.h1`
  diplay: flex;
`;
const TotalPriceContainer = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  justify-content: flex-start;
  margin-left: 80px;
`;
const TotalPriceTag = styled.h2`
  display: flex;
`;
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
