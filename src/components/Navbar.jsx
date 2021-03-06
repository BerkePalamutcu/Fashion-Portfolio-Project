import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchRounded } from "@mui/icons-material";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signOutUser } from "../firebase/firebaseapp";
import { changeCardModalToTrue } from "../redux/modalSlice";
import styled from "styled-components";
export const Notifications = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 28px;
  background-color: #b78c71;
`;
export const NotificationsList = styled.ul`
  width: 100vw;
  list-style-type: none;
  color: white;
  font-size: 12px;
  font-family: "Domine", serif;
`;
export const NavbarContainer = styled.div`
  height: 115px;
  font-family: "Domine", serif;
  align-content: center;
  align-items: center;
  position: absolute;
  z-index: 4;
  width: 100vw;
  overflow: hidden;
  transition: ease-in-out 1s;
  &:hover {
    background-color: white;
    color: black !important;
  }
`;
export const WrapperContainer = styled.div`
  width: 100vw;
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
`;
export const LogoContainer = styled.div`
  flex: 0.8;
  text-align: center;
  font-family: "My Soul", cursive;
  font-weight: 400;
  font-size: 38px;
  transition: ease-in-out 2s;
`;
export const MainContainer = styled.div`
  flex: 2;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  transition: ease-in-out 1s;
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
`;

export const MainList = styled.ul``;

export const MainListItems = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: center;
  gap: 40px;
`;

export const Spans = styled.span``;

export const SearchIcon = styled(SearchRounded)`
  border: 1px solid;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;
`;

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
                textDecoration: "none",
                color: hovered === true ? "black" : "white",
                transition: "ease-in-out 2s",
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
                    textDecoration: "none",
                    color: hovered === true ? "black" : "white",
                  }}
                  to="/products"
                >
                  <Spans>SHOP</Spans>
                </NavLink>
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: hovered === true ? "black" : "white",
                  }}
                  to="/about"
                >
                  <Spans>ABOUT</Spans>
                </NavLink>
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: hovered === true ? "black" : "white",
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
                  textDecoration: "none",
                  color: hovered === true ? "black" : "white",
                }}
                to="/login"
              >
                <Spans>LOGIN</Spans>
              </NavLink>
            ) : (
              <Spans
                style={{
                  color: hovered === true ? "black" : "white",
                  cursor: "pointer",
                }}
                onClick={signOutUser}
              >
                LOG OUT
              </Spans>
            )}
            <Spans
              onClick={() => dispatch(changeCardModalToTrue(true))}
              style={{
                textDecoration: "none",
                color: hovered === true ? "black" : "white",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Bag ({`${itemsQuantity}`})
            </Spans>
            <Spans>
              <SearchIcon
                style={{
                  textDecoration: "none",
                  color: hovered === true ? "black" : "white",
                }}
              />
            </Spans>
          </RightContainer>
        </WrapperContainer>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
