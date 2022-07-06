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
import { useDispatch } from 'react-redux';
import { changeCardModalToTrue } from '../redux/modalSlice';
import styled from 'styled-components';
import { auth, signOutUser } from '../firebase/firebaseapp';
import { onAuthStateChanged } from 'firebase/auth';

const StaticNavbarContainer = styled(NavbarContainer)`
  position: static;
  box-shadow: 0 2px #e0e0eb;
  transition: ease-in-out 1s;
`;

const NavbarOther = () => {
  const [loginData, setUserLoggedIn] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0); // getting the current scrollingPosition
  const dispatch = useDispatch();
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
          display: scrollPosition > 780 && 'none',
        }}
      >
        <NotificationsList>
          <li>Free Shipping to All Europe</li>
        </NotificationsList>
      </Notifications>

      <StaticNavbarContainer
        style={{
          position: scrollPosition > 780 && 'fixed',
          backgroundColor: scrollPosition > 780 && 'white',
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
                  to="/products"
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
              onClick={() => dispatch(changeCardModalToTrue(true))}
              style={{
                textDecoration: 'none',
                color: 'black',
                cursor: 'pointer',
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
