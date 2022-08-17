import styled from 'styled-components';

//STTYLES
export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
export const CardsWrapper = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
  margin-left: 10px;
  transform: translateY(-250px);
  transition: ease 1s;
`;
export const ItemCard = styled.div`
  display: flex;
  font-family: 'Quintessential', cursive;
  font-weight: 500;
  font-size: 20px;
`;
export const CardImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  width: 450px;
  object-fit: cover;
  cursor: pointer;
`;
export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 30px 50px 30px;
`;
export const FilterWrapper = styled.div`
  display: flex;
  gap: 35px;
  align-items: center;
  justify-content: center;
`;
export const FilterTag = styled.span`
  font-family: 'Quintessential', cursive;
  font-size: 22px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  &:hover {
    border-bottom: 1px solid black;
  }
`;

export const Header = styled.h1`
  font-family: 'Quintessential', cursive;
  font-size: 55px;
  font-weight: 500;
`;

export const FiltersMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  // transform: translateX(-1150px);
  transition: ease 1s;
  opacity: 0;
`;
export const FiltersMenuWrapper = styled.div`
  display: flex;
  margin: 20px 30px 20px 30px;
`;
export const FiltersMenuHeaders = styled.span`
  display: flex;
  font-size: 22px;
  font-weight: 600;
`;
export const FiltersMenuItems = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-left: 50px;
  font-size: 18px;
  font-family: 'Baskervville', serif;
  font-weight: 400;
`;
export const FilterMenuItem = styled.span`
  display: flex;
  cursor: pointer;
  font-style: italic;
  user-select: none;
  &:hover {
    border-bottom: 1px solid black;
  }
`;

export const SortItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 40px 30px 50px 30px;
  // transform: translateX(-900px);
  transition: ease 1s;
  opacity: 0;
`;
export const SortItemsWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
export const SortItem = styled.span`
  font-family: 'Baskervville', serif;
  user-select: none;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid black;
  }
`;
export const DecorationSpan = styled.span`
  font-family: 'Quintessential', cursive;
  font-size: 22px;
  margin-right: 20px;
  font-style: italic;
  font-weight: 500;
`;
export const SearchInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid black;
  display: flex;
  font-size: 20px;
  transition: all 2s ease;
  opacity: 0;
  outline: none;
  padding: 5px 5px;
  width: 0;
  &::placeholder {
    text-align: center;
    font-family: 'Baskervville', serif;
  }
  ${({ clickAnimation }) =>
    clickAnimation &&
    'background: #f6f4f2; outline:none; transition: all 2s ease; opacity:1; width: 300px; padding: 5px 5px;'}
  &:focus {
    background: #f6f4f2;
    outline: none;
    transition: all 2s ease;
    opacity: 1;
    padding: 5px 5px;
  }
`;
