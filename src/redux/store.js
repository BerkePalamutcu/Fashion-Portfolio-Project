import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import productReducer from './productDataSlice';
import modalWindowReducer from './modalSlice';
const rootReducer = combineReducers({
  getDataReducer: dataReducer,
  getProductDataReducer: productReducer,
  changeModalViewReducer: modalWindowReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
