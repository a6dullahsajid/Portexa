import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from './userDataSlice.js';

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
  },
});
