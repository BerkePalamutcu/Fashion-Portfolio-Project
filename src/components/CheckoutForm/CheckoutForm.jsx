import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { changeCardModalToFalse } from '../../redux/modalSlice';
import { useNavigate } from 'react-router-dom';
import {
  StyledCardElement,
  PayButton,
  RedirectButton,
  PaymentFormContainer,
  PaymentForm,
  InputsContainer,
  InputWrapper,
  InputLabel,
  FormInput,
  SectionWrapper,
  DetailsHeader,
} from './checkoutForm.styles';
//COMPONENT
const CheckoutForm = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const redirectToHomePage = useNavigate();
  const totalItemPrice = useSelector((state) =>
    state.getBagDataReducer.bagData
      .map((item) => item.price * item.quantity)
      .reduce((acc, current) => acc + current, 0)
      .toFixed(2)
  );
  const handleRedirect = () => {
    dispatch(changeCardModalToFalse(false));
    redirectToHomePage('/', { replace: false });
  };
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
          <RedirectButton onClick={handleRedirect}>
            Continue shopping
          </RedirectButton>
        </PaymentForm>
      </PaymentFormContainer>
    </>
  );
};

export default CheckoutForm;
