import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '~/schema';
import type { RootState } from '~/state/store';
// This prevents a strange type error: https://github.com/reduxjs/redux-toolkit/issues/1806
import 'immer';

export interface CounterState {
  isLoading: boolean;
  items: Item[];
}

const initialState = {
  isLoading: false,
  items: [] as Item[],
};

const counterSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setIsLoading, setItems } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectItems = (state: RootState) => state.cart.items;

export const cartReducer = counterSlice.reducer;
