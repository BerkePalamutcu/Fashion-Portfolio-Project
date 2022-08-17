import CheckoutForm from '../CheckoutForm/CheckoutForm';
import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';
const Checkout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <CheckoutForm />
      <CheckoutSummary />
    </div>
  );
};

export default Checkout;
