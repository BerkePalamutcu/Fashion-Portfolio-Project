import styled from 'styled-components';
import { Facebook } from '@mui/icons-material';
const SignInContainer = styled.div`
  positition: relative;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 84vh;
  background-color: #f6f4f2;
  font-family: 'Domine', serif;
`;
const LoginImage = styled.img.attrs((props) => ({ src: props.src }))`
  height: auto;
  max-width: 100%
  height: auto;
  object-fit: cover;
  display: flex;
`;
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  width: 100%;
  padding: 0 50px;
`;
const LoginHeader = styled.h1`
  font-weight: 400;
  margin-bottom: 20%;
  font-size: 46px;
  display: flex;
`;

const FormStylingContainer = styled.div`
  background-color: #e9e3dc;
  width: 80%;
  height: 100%;
  padding: 0 10px;
  align-content: center;
  display: flex;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  gap: 20px;
  margin: 0 30% 100px 22%;
`;
const EmailLabel = styled.label`
  font-size: 24px;
  display: flex;
`;
const PasswordLabel = styled.label`
  margin-top: 30px;
  font-size: 24px;
  display: flex;
`;
const EmailInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
  padding: 5px 0;
  display: flex;
  font-size: 20px;
  &:focus {
    background: #f6f4f2;
    outline: none;
  }
`;
const PasswordInput = styled.input`
background: transparent;
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
  display: flex;
  padding: 5px 0;
  font-size: 20px;
  &:focus {
    background: #f6f4f2;
    outline: none;`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const LoginButton = styled.button`
  width: 125px;
  background-color: #cb9374;
  font-weight: 600;
  font-size: 16px;
  color: white;
  border: none;
  cursor: pointer;
  padding: 20px 0;
  margin-top: 30px;
  border-radius: 5px;
  &:hover {
    background-color: #ceb599;
  }
`;
const SignUpButton = styled.button`
  width: 125px;
  background-color: #252424;
  font-weight: 600;
  font-size: 16px;
  color: white;
  border: none;
  cursor: pointer;
  padding: 20px 0;
  margin-top: 30px;
  border-radius: 5px;
`;
const LoginWithGoogleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  align-content: center;
  width: 200px;
  background-color: #0085c6;
  font-weight: 600;
  font-size: 16px;
  color: white;
  border: none;
  cursor: pointer;
  padding: 20px 0;
  border-radius: 5px;
`;
const SignIn = () => {
  return (
    <SignInContainer>
      <FormContainer>
        <FormStylingContainer>
          <InputContainer>
            <LoginHeader>SIGN IN</LoginHeader>
            <EmailLabel>E-mail</EmailLabel>
            <EmailInput />
            <PasswordLabel>Password</PasswordLabel>
            <PasswordInput />
            <ButtonContainer>
              <LoginButton>LOGIN</LoginButton>
              <SignUpButton>SIGN UP</SignUpButton>
            </ButtonContainer>
            <h3>OR</h3>
            <LoginWithGoogleButton>
              <Facebook style={{ height: '25px' }} />
              Facebook Login
            </LoginWithGoogleButton>
          </InputContainer>
        </FormStylingContainer>
      </FormContainer>
      <LoginImage src="https://femm.fashion/wp-content/uploads/2020/02/Rino-Z-20-scuba-jas-perzik-1200x801.jpg" />
    </SignInContainer>
  );
};

export default SignIn;
