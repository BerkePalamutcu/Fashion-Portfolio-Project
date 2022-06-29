import { useState, useEffect } from 'react';
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
  SearchIcon,
} from './Navbar';
import styled from 'styled-components';
import { auth, signOutUser } from '../firebase/firebaseapp';
import { onAuthStateChanged } from 'firebase/auth';

const StaticNavbarContainer = styled(NavbarContainer)`
  position: relative;
  transition: ease-in-out 1s;
`;

const NavbarOther = () => {
  const [loginData, setUserLoggedIn] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0); // getting the current scrollingPosition

  //Handling Scrolling events and setting scroll position to the state
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
  }, [loginData]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <Notifications
        style={{
          display: scrollPosition > 750 && 'none',
        }}
      >
        <NotificationsList>
          <li>Free Shipping to All Europe</li>
        </NotificationsList>
      </Notifications>

      <StaticNavbarContainer
        style={{
          position: scrollPosition > 750 && 'fixed',
          backgroundColor: scrollPosition > 750 && 'white',
          boxShadow: scrollPosition > 750 && '0 2px #e0e0eb',
        }}
      >
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
                  to="/all-products"
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
              <NavLink
                style={{
                  textDecoration: 'none',
                  color: 'black',
                }}
                to="/"
                onClick={signOutUser}
              >
                <Spans>LOG OUT</Spans>
              </NavLink>
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
