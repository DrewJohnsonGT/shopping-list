import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '~/schema';
// This prevents a strange type error: https://github.com/reduxjs/redux-toolkit/issues/1806
import 'immer';

export interface CartState {
  items: Item[];
  itemModalItem: Item | null;
  isItemModalOpen: boolean;
  deleteItemModalItem: Item | null;
}

const initialState: CartState = {
  deleteItemModalItem: null,
  isItemModalOpen: false,
  itemModalItem: null as Item | null,
  items: [] as Item[],
};

const counterSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    setDeleteItemModalItem: (state, action: PayloadAction<Item | null>) => {
      state.deleteItemModalItem = action.payload;
    },
    setItemModal: (
      state,
      action: PayloadAction<{ isOpen: boolean; item?: Item | null }>,
    ) => {
      state.isItemModalOpen = action.payload.isOpen;
      state.itemModalItem = action.payload.item ?? null;
    },
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setDeleteItemModalItem, setItemModal, setItems } =
  counterSlice.actions;

export const cartReducer = counterSlice.reducer;
