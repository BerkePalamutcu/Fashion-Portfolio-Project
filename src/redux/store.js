import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../redux/dataSlice';
export const store = configureStore({
  reducer: { getDataReducer: dataReducer },
});
