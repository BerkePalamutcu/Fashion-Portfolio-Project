import { combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from './dataReducer';
const rootReducer = combineReducers({ getDataFromFirebase: dataReducer });

export default rootReducer;
