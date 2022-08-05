import React from 'react';
import CheckoutForm from '../CheckoutForm';
import CheckoutSummary from '../CheckoutSummary';
const Checkout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <CheckoutForm />
      <CheckoutSummary />
    </div>
  );
};

export default Checkout;
