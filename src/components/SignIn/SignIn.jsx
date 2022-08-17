import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithGooglePopup, signInUser } from '../../firebase/firebaseapp';

//STYLE IMPORTS
import {
  SignInContainer,
  LoginImage,
  FormContainer,
  LoginHeader,
  FormStylingContainer,
  InputContainer,
  EmailLabel,
  PasswordLabel,
  EmailInput,
  PasswordInput,
  ButtonContainer,
  LoginButton,
  SignUpButton,
  LoginWithGoogleButton,
  logoStylesheet,
} from '../SignIn/signIn.styles';

//COMPONENT
const SignIn = () => {
  const defaultParams = {
    email: '',
    password: '',
  };

  const [params, setParams] = useState(defaultParams);
  const { email, password } = params;

  const redirect = useNavigate();

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    redirect('../', { replace: true });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setParams({ ...params, [name]: value });
  };

  const signInWithEmailandPassword = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        await signInUser(email, password);
        redirect('../');
      } catch (error) {
        alert(`USER NOT FOUND ${error}`);
        setParams(defaultParams);
      }
    }
    if (email === '' || password === '') {
      alert('username or password can not be empty');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <SignInContainer>
      <FormContainer onSubmit={handleSubmit}>
        <FormStylingContainer>
          <InputContainer>
            <LoginHeader>SIGN IN</LoginHeader>
            <EmailLabel>E-mail</EmailLabel>
            <EmailInput
              name="email"
              value={email}
              onChange={handleChange}
              required={signInWithGoogle ? false : true}
            />
            <PasswordLabel>Password</PasswordLabel>
            <PasswordInput
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
              required={signInWithGoogle ? false : true}
            />
            <ButtonContainer>
              <LoginButton type="submit" onClick={signInWithEmailandPassword}>
                LOGIN
              </LoginButton>
              {/*  redirect to signup page} */}
              <NavLink to="/SignUp">
                <SignUpButton>SIGN UP</SignUpButton>
              </NavLink>
            </ButtonContainer>
            <h3>
              <em>OR</em>
            </h3>
            <LoginWithGoogleButton onClick={signInWithGoogle}>
              <div style={logoStylesheet}>
                <img
                  style={{ diplay: 'flex' }}
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="google logo"
                />
              </div>
              Google Login
            </LoginWithGoogleButton>
          </InputContainer>
        </FormStylingContainer>
      </FormContainer>
      <LoginImage
        alt="login Image"
        src="https://femm.fashion/wp-content/uploads/2020/02/Rino-Z-20-scuba-jas-perzik-1200x801.jpg"
      />
    </SignInContainer>
  );
};

export default SignIn;
