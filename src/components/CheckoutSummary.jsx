import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SummaryItem from './SummaryItem';
const SummaryContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 50%;
  background-color: lightyellow;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 500px;
  width: 100%;
  gap: 30px;
`;
const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 170px;
`;
const SummaryHeader = styled.h1`
  diplay: flex;
`;

const CheckoutSummary = () => {
  const cardSummaryData = useSelector(
    (state) => state.getBagDataReducer.bagData
  );
  console.log(cardSummaryData);
  return (
    <>
      <SummaryContainer>
        <HeaderDiv>
          <SummaryHeader>PAYMENT SUMMARY</SummaryHeader>
        </HeaderDiv>
        <SummaryWrapper>
          <SummaryItem cardSummaryData={cardSummaryData} />
        </SummaryWrapper>
      </SummaryContainer>
    </>
  );
};

export default CheckoutSummary;
