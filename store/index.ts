import { configureStore } from '@reduxjs/toolkit';
import contentSlice from './slices/contentSlice';
import filterSlice from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    content: contentSlice,
    filter: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
