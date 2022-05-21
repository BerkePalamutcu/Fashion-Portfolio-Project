import { SearchRounded } from '@mui/icons-material';
import styled from 'styled-components';

const Notifications = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 38px;
  background-color: #b78c71;
`;
const NotificationsList = styled.ul`
  list-style-type: none;
  color: white;
  font-size: 12px;
  font-family: 'Domine', serif;
`;
const NavbarContainer = styled.div`
  height: 115px;
  font-family: 'Domine', serif;
  align-content: center;
  align-items: center:
  position: relative;
`;
const WrapperContainer = styled.div`
  padding: 50px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  color: #fffff;
`;
const LogoContainer = styled.div`
  flex: 1;
  text-align: center;
  font-family: 'My Soul', cursive;
  font-weight: 400;
  font-size: 38px;
`;
const MainContainer = styled.div`
  flex: 1.5;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;
const RightContainer = styled.div`
  flex: 1;
  text-align: center;
  align-items: center;
  align-content: center;
  font-size: 14px;
  display: flex;
  margin-left: 50px;
`;

const MainList = styled.ul``;
const MainListItems = styled.li`
  list-style-type: none;
`;

const Spans = styled.span`
  margin: 0 15px;
  cursor: pointer;
`;

const Languages = styled.span`
  margin-right: 24px;
`;

const SearchIcon = styled(SearchRounded)`
  border: 1px solid;
  border-radius: 50%;
  padding: 3px;
`;

const Navbar = () => {
  return (
    <div>
      <Notifications>
        <NotificationsList>
          <li>Free Shipping to All Europe</li>
        </NotificationsList>
      </Notifications>
      <NavbarContainer>
        <WrapperContainer>
          <LogoContainer>
            <Spans>B e r k e & Z e z</Spans>
          </LogoContainer>
          <MainContainer>
            <MainList>
              <MainListItems>
                <Spans>SHOP</Spans>
                <Spans>ABOUT</Spans>
                <Spans>CONTACT</Spans>
                <Spans>LOOKBOOK</Spans>
                <Spans style={{ color: 'red' }}>SALE</Spans>
              </MainListItems>
            </MainList>
          </MainContainer>
          <RightContainer>
            <Spans>
              <Languages>En</Languages>
            </Spans>
            <Spans>Account</Spans>
            <Spans>Bag (0)</Spans>
            <Spans>
              <SearchIcon />
            </Spans>
          </RightContainer>
        </WrapperContainer>
      </NavbarContainer>
    </div>
  );
};

export default Navbar;
