import styled from 'styled-components';

const SignInContainer = styled.div`
  positition: relative;
  display: flex;
  justify-content: space-between;
  width: 100vw;
`;
const LoginImage = styled.img.attrs((props) => ({ src: props.src }))`
  height: auto;
  width: 100wv;
  object-fit: cover;
`;
const FormContainer = styled.div``;
const SignIn = () => {
  return (
    <SignInContainer>
      <FormContainer>login form</FormContainer>
      <LoginImage src="https://femm.fashion/wp-content/uploads/2020/02/Rino-Z-20-scuba-jas-perzik-1200x801.jpg" />
    </SignInContainer>
  );
};

export default SignIn;
