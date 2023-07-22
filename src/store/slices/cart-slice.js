import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    flightAdded: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { flightAdded } = cartSlice.actions;
export default cartSlice.reducer;
