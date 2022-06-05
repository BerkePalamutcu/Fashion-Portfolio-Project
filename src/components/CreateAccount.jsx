import styled from 'styled-components';
import myImage from '../assets/LoginImg-1.png';
import {
  LoginHeader,
  FormStylingContainer,
  InputContainer,
  EmailLabel,
  PasswordLabel,
  EmailInput,
  PasswordInput,
  SignUpButton,
} from './SignIn';

const SignUpPageContainer = styled.div`
  positition: relative;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 84vh;
  background-color: #f6f4f2;
  font-family: 'Domine', serif;
`;

const ImageContainer = styled.img.attrs((props) => ({
  src: props.src,
}))`
  height: auto;
  max-width: 65%;
  height: auto;
  object-fit: cover;
  display: flex;
`;

const SignUpFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  width: 100%;
  padding: 0 50px;
`;

const CreateAccount = () => {
  return (
    <>
      <SignUpPageContainer>
        <SignUpFormContainer>
          <FormStylingContainer>
            <InputContainer>
              <LoginHeader>Create Account</LoginHeader>
              <EmailLabel>E-mail</EmailLabel>
              <EmailInput />
              <PasswordLabel>Password</PasswordLabel>
              <PasswordInput />
              <PasswordLabel>Confirmed Password</PasswordLabel>
              <PasswordInput />
              <SignUpButton>SIGN UP</SignUpButton>
            </InputContainer>
          </FormStylingContainer>
        </SignUpFormContainer>
        <ImageContainer src={myImage} />
      </SignUpPageContainer>
    </>
  );
};

export default CreateAccount;
