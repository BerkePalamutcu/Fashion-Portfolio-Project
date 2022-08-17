import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
//STYLING
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
`;
export const ModalWindow = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 70%;
  width: 50%;
  background-color: white;
  z-index: 101;
  overflow-y: auto;
`;
export const CardContainer = styled.div`
  margin: 50px;
`;
export const CardWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
`;
export const CardHeader = styled.h1`
  font-family: 'Baskervville', serif;
`;
export const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`;

export const CardImage = styled.img.attrs((props) => ({
  props: props.src,
  alt: props.alt,
}))`
  width: 150px;
  height: 200px;
  object-fit: contain;
`;

export const CardItemsContainer = styled.div`
  margin-top: 50px;
  overflow-y: auto;

  padding-bottom: 20px;
`;

export const CardItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 30px 0;
`;
export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  gap: 10px;
`;
export const ItemName = styled.h2``;
export const ItemPrice = styled.p``;
export const ItemSize = styled.p``;

export const QuantityContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
`;
export const QuantityWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  gap: 30px;
`;
export const QuantityCounter = styled.p``;
export const MinusSymbol = styled.p`
  cursor: pointer;
  user-select: none;
`;
export const PlusSymbol = styled.p`
  cursor: pointer;
  user-select: none;
`;
export const RemoveItemButton = styled.button`
  background: transparent;
  font-family: 'Baskervville', serif;
  width: 100px;
  font-size: 20px;
  text-align: center;
  color: red;
  border: 1px solid red;
  padding: 5px;
  cursor: pointer;
`;
export const TotalPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 8px;
`;
export const TotalPriceHeader = styled.h1`
  font-family: 'Baskervville', serif;
`;
export const TotalPriceNumber = styled.h1`
  font-family: 'Domine', serif;
`;
export const EmptyBagNotification = styled.h2`
  font-family: 'Baskervville', serif;
  font-size: 30px;
  display: flex;
  margin: 210px 0;
  justify-content: center;
`;
export const CheckoutButton = styled.button`
  height: 50px;
  width: 200px;
  font-size: 17px;
  font-weight: bold;
  background-color: black;
  cursor: pointer;
  border: none;
  color: white;
  margin-top: 20px;
`;
