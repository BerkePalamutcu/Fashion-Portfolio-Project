import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOutUser } from '../../firebase/firebaseapp';
import { changeCardModalToTrue } from '../../redux/modalSlice';
import { clearBagData } from '../../redux/bagDataSlice';

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
  Hamburger,
  SliderMenu,
} from './navbar.styles';

//COMPONENT
const Navbar = () => {
  const [loginData, setUserLoggedIn] = useState(false);
  const [hovered, setHovered] = useState(false);

  let itemsQuantity = useSelector(
    (state) => state.getBagDataReducer.totalItemQuantityData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
  }, [loginData]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <Notifications>
        <NotificationsList>
          <li>Free Shipping to All Europe</li>
        </NotificationsList>
      </Notifications>
      <NavbarContainer>
        <WrapperContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <LogoContainer>
            <NavLink
              style={{
                textDecoration: 'none',
                color: hovered === true ? 'black' : 'white',
                transition: 'ease-in-out 2s',
              }}
              to="/"
            >
              <Spans>Berke's Place</Spans>
            </NavLink>
          </LogoContainer>
          <Hamburger />
          <MainContainer>
            <MainList>
              <MainListItems></MainListItems>
            </MainList>
            <SliderMenu></SliderMenu>
          </MainContainer>

          <RightContainer>
            {!loginData ? (
              <NavLink
                style={{
                  textDecoration: 'none',
                  color: hovered === true ? 'black' : 'white',
                }}
                to="/login"
              >
                <Spans>LOGIN</Spans>
              </NavLink>
            ) : (
              <Spans
                style={{
                  color: hovered === true ? 'black' : 'white',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  signOutUser();
                  dispatch(clearBagData());
                }}
              >
                LOG OUT
              </Spans>
            )}
            <NavLink
              style={{
                textDecoration: 'none',
                color: hovered === true ? 'black' : 'white',
              }}
              to="/products"
            >
              <Spans>SHOP</Spans>
            </NavLink>
            <Spans
              onClick={() => dispatch(changeCardModalToTrue(true))}
              style={{
                textDecoration: 'none',
                color: hovered === true ? 'black' : 'white',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Bag ({`${itemsQuantity}`})
            </Spans>
          </RightContainer>
        </WrapperContainer>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
