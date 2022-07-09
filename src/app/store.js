import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSessionReducer from './application/userSessionSlice';
import contentConfigSlice from './content/contentConfigSlice';
import contentListReducer from './content/contentListSlice';
import deletedContentListReducer from './content/deletedContentListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userSession: userSessionReducer,
    contentList: contentListReducer,
    deletedContentList: deletedContentListReducer,
    contentConfig: contentConfigSlice
  },
});
