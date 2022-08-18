import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeCardModalToTrue } from '../../redux/modalSlice';
import { auth, signOutUser } from '../../firebase/firebaseapp';
import { onAuthStateChanged } from 'firebase/auth';

import { StaticNavbarContainer } from './navbarOther.styles';

import {
  Notifications,
  NotificationsList,
  WrapperContainer,
  LogoContainer,
  MainContainer,
  RightContainer,
  MainList,
  MainListItems,
  Spans,
} from '../Navbar/navbar.styles';

//COMPONENT
const NavbarOther = () => {
  const [loginData, setUserLoggedIn] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0); // getting the current scrollingPosition
  const dispatch = useDispatch();
  //Handling Scrolling events and setting scroll position to the state
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  let itemsQuantity = useSelector(
    (state) => state.getBagDataReducer.totalItemQuantityData
  );

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
          display: scrollPosition > 450 && 'none',
        }}
      >
        <NotificationsList>
          <li>Free Shipping to All Europe</li>
        </NotificationsList>
      </Notifications>

      <StaticNavbarContainer
        style={{
          position: scrollPosition > 450 && 'fixed',
          backgroundColor: scrollPosition > 450 && 'white',
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
              <MainListItems></MainListItems>
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
                onClick={() => {
                  signOutUser();
                }}
              >
                <Spans>LOG OUT</Spans>
              </NavLink>
            )}
            <NavLink
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
              to="/products"
            >
              <Spans>SHOP</Spans>
            </NavLink>
            <Spans
              onClick={() => dispatch(changeCardModalToTrue(true))}
              style={{
                textDecoration: 'none',
                color: 'black',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Bag ({`${itemsQuantity}`})
            </Spans>
          </RightContainer>
        </WrapperContainer>
      </StaticNavbarContainer>
    </>
  );
};

export default NavbarOther;
