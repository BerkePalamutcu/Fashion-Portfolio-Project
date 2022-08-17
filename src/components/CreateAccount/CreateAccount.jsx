import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createNewUserFromEmailandPassword,
  onAuthStateChangedListener,
  addUserData,
} from '../../firebase/firebaseapp';

import {
  LoginHeader,
  FormStylingContainer,
  EmailLabel,
  PasswordLabel,
  EmailInput,
  PasswordInput,
  SignUpButton,
} from '../SignIn/signIn.styles';

import {
  SignUpPageContainer,
  ImageContainer,
  SignUpFormContainer,
  SignUpInputContainer,
  ConfirmedPasswordInput,
} from '../CreateAccount/createAccount.styles';

import myImage from '../../assets/LoginImg-1.png';

//COMPONENT
const CreateAccount = () => {
  const defaultParameters = {
    email: '',
    password: '',
    confirmedPassword: '',
  };

  const [params, setParams] = useState(defaultParameters);
  const { email, password, confirmedPassword } = params;

  /// checks the user if signed in or not when component mounts!
  useEffect(() => {
    onAuthStateChangedListener();
  }, []);
  /// helper function to assign to the sign up button
  const createNewAccount = async () => {
    /// its async function to communicate with external fb auth therefore, the response needs to await.
    await createNewUserFromEmailandPassword(email, password);
    try {
      const { user } = await createNewUserFromEmailandPassword(email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
    setParams(defaultParameters);
  };
  const redirect = useNavigate();
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
      addUserData();
      redirect('../', { replace: true });
    } catch (error) {
      alert(error);
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
              <EmailInput
                onChange={handleChange}
                name="email"
                value={email}
                required
              />
              <PasswordLabel>Password</PasswordLabel>
              <PasswordInput
                onChange={handleChange}
                name="password"
                value={password}
                required
              />
              <PasswordLabel>Confirmed Password</PasswordLabel>
              <ConfirmedPasswordInput
                onChange={handleChange}
                name="confirmedPassword"
                value={confirmedPassword}
                required
              />
              <SignUpButton style={{ marginTop: '100px' }}>
                SIGN UP
              </SignUpButton>
            </SignUpInputContainer>
          </FormStylingContainer>
        </SignUpFormContainer>
        <ImageContainer alt="signUP image" src={myImage} />
      </SignUpPageContainer>
    </>
  );
};

export default CreateAccount;
