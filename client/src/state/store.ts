import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '~/state/slice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {}
export type AppDispatch = typeof store.dispatch;
