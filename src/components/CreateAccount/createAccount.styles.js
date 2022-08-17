import styled from 'styled-components';

import { InputContainer, PasswordInput } from '../SignIn/signIn.styles';
//STYLES
export const SignUpPageContainer = styled.div`
  positition: relative;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 84vh;
  background-color: #f6f4f2;
  font-family: 'Domine', serif;
`;

export const ImageContainer = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  height: auto;
  max-width: 64%;
  height: auto;
  object-fit: cover;
  display: flex;
`;

export const SignUpFormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  width: 100%;
  padding: 0 50px;
`;
export const SignUpInputContainer = styled(InputContainer)`
  gap: 5px;
`;
export const ConfirmedPasswordInput = styled(PasswordInput)``;
