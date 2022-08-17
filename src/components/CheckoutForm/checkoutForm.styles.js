import styled from 'styled-components';
import { CardElement } from '@stripe/react-stripe-js';
export const StyledCardElement = styled(CardElement)`
  padding: 10px;
  border: 1px solid black;
`;
export const PayButton = styled.button`
  height: 50px;
  color: white;
  background-color: black;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;
export const RedirectButton = styled(PayButton)`
  background-color: transparent;
  color: black;
`;
export const PaymentFormContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

export const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const InputLabel = styled.label``;
export const FormInput = styled.input`
  padding: 5px 5px;
`;
export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const DetailsHeader = styled.h1``;
