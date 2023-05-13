import { configureStore } from '@reduxjs/toolkit';
import auth from '../store/auth';

const store = configureStore({
  reducer: {
    auth: auth.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
