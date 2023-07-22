import { configureStore } from "@reduxjs/toolkit";
import localeSlice from "./slices/locale-slice";
import cartSlice from "./slices/cart-slice";

export default configureStore({
  reducer: {
    locale: localeSlice,
    cart: cartSlice,
  },
});
