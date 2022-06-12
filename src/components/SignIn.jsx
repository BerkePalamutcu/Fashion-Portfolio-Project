import { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithGooglePopup, signInUser } from '../firebase/firebaseapp';

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
  max-width: 100%;
  height: auto;
  object-fit: cover;
  display: flex;
`;
export const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  width: 100%;
  padding: 0 50px;
`;
export const LoginHeader = styled.h1`
  font-weight: 400;
  margin-bottom: 20%;
  font-size: 46px;
  display: flex;
`;

export const FormStylingContainer = styled.div`
  background-color: #e9e3dc;
  width: 80%;
  height: 100%;
  padding: 0 10px;
  align-content: center;
  justify-content: center;
  display: flex;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  gap: 20px;
`;
export const EmailLabel = styled.label`
  font-size: 24px;
  display: flex;
`;
export const PasswordLabel = styled.label`
  margin-top: 30px;
  font-size: 24px;
  display: flex;
`;
export const EmailInput = styled.input`
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
export const PasswordInput = styled.input`
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
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
export const LoginButton = styled.button`
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
export const SignUpButton = styled.button`
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
  &:hover {
    background-color: #424747;
  }
`;
const LoginWithGoogleButton = styled.button`
  display: flex;
  text-align: center;
  justify-content: flex-start;
  gap: 25px;
  align-items: center;
  align-content: center;
  width: 200px;
  background-color: #0075d3;
  font-weight: 600;
  font-size: 16px;
  color: white;
  border: none;
  cursor: pointer;
  padding: 0 0 0 0;
  border-radius: 5px;
  &:hover {
    background-color: #0095d9;
  }
`;

const logoStylesheet = {
  display: 'flex',
  width: '50px',
  height: '50px',
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2px',
};

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
    await signInUser(email, password);
    redirect('../', { replace: true });
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
            <EmailInput name="email" value={email} onChange={handleChange} />
            <PasswordLabel>Password</PasswordLabel>
            <PasswordInput
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
            />
            <ButtonContainer>
              <LoginButton onClick={signInWithEmailandPassword}>
                LOGIN
              </LoginButton>
              {/*  redirect to signup page} */}
              <NavLink to="/SignUp">
                <SignUpButton>SIGN UP</SignUpButton>
              </NavLink>
            </ButtonContainer>
            <h3>OR</h3>
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
      <LoginImage src="https://femm.fashion/wp-content/uploads/2020/02/Rino-Z-20-scuba-jas-perzik-1200x801.jpg" />
    </SignInContainer>
  );
};

export default SignIn;
