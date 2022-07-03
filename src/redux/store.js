import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import productReducer from './productDataSlice';
const rootReducer = combineReducers({
  getDataReducer: dataReducer,
  getProductDataReducer: productReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
