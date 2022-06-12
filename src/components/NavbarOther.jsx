import { useState, useEffect } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
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
import { auth, signOutUser } from '../firebase/firebaseapp';
import { onAuthStateChanged } from 'firebase/auth';

const StaticNavbarContainer = styled(NavbarContainer)`
  position: relative;
`;

const NavbarOther = () => {
  const [loginData, setUserLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
  }, [loginData]);

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
            {!loginData ? (
              <NavLink
                style={{
                  textDecoration: 'none',
                  color: 'black',
                }}
                to="/login"
              >
                <Spans>LOGIN</Spans>
              </NavLink>
            ) : (
              <Navigate
                style={{
                  textDecoration: 'none',
                  color: 'black',
                }}
                to="/"
                onClick={signOutUser}
              >
                <Spans>LOG OUT</Spans>
              </Navigate>
            )}
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
