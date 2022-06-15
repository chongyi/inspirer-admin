import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSessionReducer from './application/userSessionSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userSession: userSessionReducer,
  },
});
