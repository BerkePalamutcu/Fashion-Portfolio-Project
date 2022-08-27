import styled from 'styled-components';
import { device } from '../styles/breakpoints';

export const BackgroundImage = styled.div`
  @media only screen and ${device.mobileL} {
    display: flex;
    height: 100vh;
    background-size: cover;
    background-image: url('https://cdn.shopify.com/s/files/1/0515/3633/0928/files/Rino_Pelle_14juni_2021_5798-copy_720x.jpg?v=1645177736');
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
`;
