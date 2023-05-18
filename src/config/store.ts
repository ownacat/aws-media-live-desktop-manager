import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { enableMapSet } from 'immer';
import filesReducer from '../store/files';
import authReducer from '../store/auth';

enableMapSet();

const store = configureStore({
  reducer: {
    auth: authReducer,
    files: filesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
