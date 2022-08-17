import styled from 'styled-components';
export const SummaryContainer = styled.div`
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

export const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 500px;
  width: 100%;
  gap: 30px;
`;
export const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 90px;
  width: 100%;
  margin-left: 80px;
`;
export const SummaryHeader = styled.h1`
  diplay: flex;
`;
export const TotalPriceContainer = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  justify-content: flex-start;
  margin-left: 80px;
`;
export const TotalPriceTag = styled.h2`
  display: flex;
`;
