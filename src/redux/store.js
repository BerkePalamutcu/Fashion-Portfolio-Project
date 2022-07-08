import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import productReducer from './productDataSlice';
import modalWindowReducer from './modalSlice';
import bagDataReducer from './bagDataSlice';
const rootReducer = combineReducers({
  getDataReducer: dataReducer,
  getProductDataReducer: productReducer,
  changeModalViewReducer: modalWindowReducer,
  getBagDataReducer: bagDataReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
