import { useState, useEffect } from 'react';
import {
  createNewUserFromEmailandPassword,
  onAuthStateChangedListener,
} from '../firebase/firebaseapp';
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
  max-width: 64%;
  height: auto;
  object-fit: cover;
  display: flex;
`;

const SignUpFormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  width: 100%;
  padding: 0 50px;
`;
const SignUpInputContainer = styled(InputContainer)`
  gap: 5px;
`;
const ConfirmedPasswordInput = styled(PasswordInput)``;
const CreateAccount = () => {
  const defaultParameters = {
    email: '',
    password: '',
    confirmedPassword: '',
  };

  const [params, setParams] = useState(defaultParameters);
  const { email, password, confirmedPassword } = params;
  useEffect(() => onAuthStateChangedListener(), []);
  /// helper function to assign to the sign up button
  const createNewAccount = async () => {
    /// its async function to communicate with external fb auth therefore, the response needs to await.
    await createNewUserFromEmailandPassword(email, password);
    setParams(defaultParameters);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    /// name ve value event.targetten destructure edildi ve onceki state in uzerine yazildi
    /// bu sayede ayni isi her bir state ile kullanabiliyoruz.
    setParams({ ...params, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmedPassword) {
      alert('wrong password');
      return;
    }
    try {
      createNewAccount();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SignUpPageContainer>
        <SignUpFormContainer onSubmit={handleSubmit}>
          <FormStylingContainer>
            <SignUpInputContainer>
              <LoginHeader>Create Account</LoginHeader>
              <EmailLabel>E-mail</EmailLabel>
              <EmailInput onChange={handleChange} name="email" value={email} />
              <PasswordLabel>Password</PasswordLabel>
              <PasswordInput
                onChange={handleChange}
                name="password"
                value={password}
              />
              <PasswordLabel>Confirmed Password</PasswordLabel>
              <ConfirmedPasswordInput
                onChange={handleChange}
                name="confirmedPassword"
                value={confirmedPassword}
              />
              <SignUpButton style={{ marginTop: '100px' }}>
                SIGN UP
              </SignUpButton>
            </SignUpInputContainer>
          </FormStylingContainer>
        </SignUpFormContainer>
        <ImageContainer src={myImage} />
      </SignUpPageContainer>
    </>
  );
};

export default CreateAccount;
