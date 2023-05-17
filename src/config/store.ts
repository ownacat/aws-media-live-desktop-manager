import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import auth from '../store/auth';

const store = configureStore({
  reducer: {
    auth: auth.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
