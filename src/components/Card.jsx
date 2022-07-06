import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCardModalToFalse } from '../redux/modalSlice';
import styled from 'styled-components';

//STYLING
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
`;
const ModalWindow = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 70%;
  width: 60%;
  background-color: white;
  z-index: 101;
  overflow-y: auto;
`;

//COMPONENT
const Card = () => {
  const dispatch = useDispatch();
  const ModalWindowData = useSelector(
    (state) => state.changeModalViewReducer.cardModal
  );
  const handleModalWindowClosing = (event) => {
    if (event.target.className.split(' ').includes('backdrop')) {
      dispatch(changeCardModalToFalse(false));
    }
  };
  return (
    <>
      {ModalWindowData && (
        <ModalBackdrop
          className="backdrop"
          onClick={(event) => handleModalWindowClosing(event)}
        >
          {ModalWindowData && (
            <ModalWindow>
              <h1>Card component</h1>
            </ModalWindow>
          )}
        </ModalBackdrop>
      )}
    </>
  );
};

export default Card;
