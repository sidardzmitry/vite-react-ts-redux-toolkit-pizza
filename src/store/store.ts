import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_STATE } from "./userSlice";
import { saveState } from "./storage";
import cartSlice, { CART_STATE } from "./cartSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

store.subscribe(() => {
  saveState({jwt: store.getState().user.jwt}, JWT_STATE);
  saveState(store.getState().cart, CART_STATE);
});
