import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledCardElement = styled(CardElement)`
  padding: 10px;
  border: 1px solid black;
`;
const PayButton = styled.button`
  height: 50px;
  color: white;
  background-color: black;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

const PaymentFormContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const InputLabel = styled.label``;
const FormInput = styled.input`
  padding: 5px 5px;
`;
const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const DetailsHeader = styled.h1``;
//COMPONENT
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const totalItemPrice = useSelector((state) =>
    state.getBagDataReducer.bagData
      .map((item) => item.price * item.quantity)
      .reduce((acc, current) => acc + current, 0)
      .toFixed(2)
  );
  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch('/.netlify/functions/paymentRequest', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: totalItemPrice * 100 }),
    }).then((response) => response.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Berke Palamutcu',
        },
      },
    });

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('payment succeesful');
      }
    }
  };

  return (
    <>
      <PaymentFormContainer>
        <PaymentForm onSubmit={paymentHandler}>
          <DetailsHeader>PAYMENT DETAILS</DetailsHeader>
          <InputsContainer>
            <InputWrapper>
              <InputLabel htmlFor="name">Name</InputLabel>
              <FormInput id="name" type="text" />
            </InputWrapper>
            <InputWrapper>
              <InputLabel htmlFor="lastName">Lastname</InputLabel>
              <FormInput id="lastName" type="text" />
            </InputWrapper>
            <InputWrapper>
              <InputLabel htmlFor="lastName">Email</InputLabel>
              <FormInput id="email" type="email" />
            </InputWrapper>
            <InputWrapper style={{ flexDirection: 'row', gap: '20px' }}>
              <SectionWrapper>
                <InputLabel htmlFor="country">Country</InputLabel>
                <FormInput id="country" type="text" />
              </SectionWrapper>
              <SectionWrapper>
                <InputLabel htmlFor="city">City</InputLabel>
                <FormInput id="city" type="text" />
              </SectionWrapper>
            </InputWrapper>
            <InputWrapper>
              <InputLabel htmlFor="address">Address</InputLabel>
              <textarea
                id="address"
                rows="5"
                style={{ padding: '10px', resize: 'none' }}
              />
            </InputWrapper>
          </InputsContainer>
          <InputLabel
            style={{
              borderBottom: '1px solid black',
              paddingBottom: '5px',
              marginTop: '30px',
            }}
          >
            Enter your card details below:
          </InputLabel>
          <StyledCardElement />
          <PayButton style={{ borderTop: '1px solid black' }}>
            Complete payment
          </PayButton>
        </PaymentForm>
      </PaymentFormContainer>
    </>
  );
};

export default CheckoutForm;
