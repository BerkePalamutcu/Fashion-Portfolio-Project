import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({ getDataReducer: dataReducer });
export const store = configureStore({
  reducer: rootReducer,
});
