import styled from 'styled-components';
import { device } from '../styles/breakpoints';
import MenuIcon from '@mui/icons-material/Menu';

export const Notifications = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 28px;
  background-color: #b78c71;
  overflow: hidden;
  @media only screen and ${device.mobileL} {
    display: none;
  }
`;
export const NotificationsList = styled.ul`
  width: 100vw;
  list-style-type: none;
  color: white;
  font-size: 12px;
  font-family: 'Domine', serif;
  overflow: hidden;
  @media only screen and ${device.mobileL} {
    display: none;
  }
`;
export const NavbarContainer = styled.div`
  height: 115px;
  font-family: 'Domine', serif;
  align-content: center;
  align-items: center;
  position: absolute;
  z-index: 4;
  width: 100%;
  transition: ease-in-out 1s;
  overflow hidden;
  &:hover {
    background-color: white;
    color: black !important;
  }
  @media only screen and ${device.mobileL} {
    display: flex;
    justify-content: space-between;
  }
`;
export const WrapperContainer = styled.div`
  width: 100%;
  padding: 35px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  color: white;
  z-index: 3;
  overflow: hidden;
  &&&: [hover] {
    background-color: white;
    color: black !important;
  }
  @media only screen and ${device.mobileL} {
    width: 100%;
    position: relative;
    border-bottom: 1px solid black;
  }
`;
export const LogoContainer = styled.div`
  flex: 0.8;
  text-align: center;
  font-family: 'My Soul', cursive;
  font-weight: 400;
  font-size: 38px;
  transition: ease-in-out 2s;
  @media only screen and ${device.mobileL} {
    font-size: 32px;
    flex-direction: flex-row;
    justify-content: space-between;
    flex: 1.5;
    align-items: center;
  }
`;
export const MainContainer = styled.div`
  flex: 2;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  transition: ease-in-out 1s;
  @media only screen and ${device.mobileL} {
    display: none;
  }
`;
export const RightContainer = styled.div`
  flex: 1;
  text-align: center;
  align-items: center;
  align-content: center;
  font-size: 14px;
  display: flex;
  transition: ease-in-out 1s;
  gap: 50px;
  margin-left: 50px;
  @media only screen and ${device.mobileL} {
    display: none;
  }
`;

export const MainList = styled.ul``;

export const MainListItems = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: center;
  gap: 40px;
`;

export const Spans = styled.span`
  @media only screen and ${device.mobileL} {
    display: flex;
    color: black;
    align-items: center;
  }
`;
export const Hamburger = styled(MenuIcon)`
  display: none;
  @media only screen and (min-width: 992px) {
    visibility: hidden;
  }
  @media only screen and (min-width: 1200px) {
    visibility: hidden;
  }
  @media only screen and ${device.mobileL} and ${device.mobileS} {
    display: flex;
    color: black;
    flex: 0.2;
  }
`;
export const SliderMenu = styled.div`
  display: none;
  @media only screen and ${device.mobileL} {
    display: flex;
    color: black;
    height: 100vh;
    flex-direction: row;
    transform: translateX(100vw);
    position: absolute;
  }
`;
