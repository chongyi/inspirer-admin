import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSessionReducer from './application/userSessionSlice';
import contentListReducer from './content/contentListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userSession: userSessionReducer,
    contentList: contentListReducer,
  },
});
