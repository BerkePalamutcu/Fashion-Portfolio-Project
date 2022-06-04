import { NavLink } from 'react-router-dom';
import {
  Notifications,
  NotificationsList,
  NavbarContainer,
  WrapperContainer,
  LogoContainer,
  MainContainer,
  RightContainer,
  MainList,
  MainListItems,
  Spans,
  Languages,
  SearchIcon,
} from './Navbar';
import styled from 'styled-components';

const StaticNavbarContainer = styled(NavbarContainer)`
  position: relative;
`;

const NavbarOther = () => {
  return (
    <>
      <Notifications>
        <NotificationsList>
          <li>Free Shipping to All Europe</li>
        </NotificationsList>
      </Notifications>
      <StaticNavbarContainer>
        <WrapperContainer>
          <LogoContainer>
            <NavLink
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
              to="/"
            >
              <Spans>Berke's Place</Spans>
            </NavLink>
          </LogoContainer>
          <MainContainer>
            <MainList>
              <MainListItems>
                <NavLink
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                  to="/shop"
                >
                  <Spans>SHOP</Spans>
                </NavLink>
                <NavLink
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                  to="/about"
                >
                  <Spans>ABOUT</Spans>
                </NavLink>
                <NavLink
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                  to="/contact"
                >
                  <Spans>CONTACT</Spans>
                </NavLink>
                <NavLink style={{ textDecoration: 'none' }} to="/sale">
                  <Spans style={{ color: 'red' }}>SALE</Spans>
                </NavLink>
              </MainListItems>
            </MainList>
          </MainContainer>
          <RightContainer>
            <Spans
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
            >
              <Languages>En</Languages>
            </Spans>
            <NavLink
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
              to="/login"
            >
              <Spans>LOGIN</Spans>
            </NavLink>
            <Spans
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
            >
              Bag (0)
            </Spans>
            <Spans>
              <SearchIcon
                style={{
                  textDecoration: 'none',
                  color: 'black',
                }}
              />
            </Spans>
          </RightContainer>
        </WrapperContainer>
      </StaticNavbarContainer>
    </>
  );
};

export default NavbarOther;
