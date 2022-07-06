import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModalBackdrop, ModalWindow } from './ItemDetails';
import { changeCardModalToFalse } from '../redux/modalSlice';
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
