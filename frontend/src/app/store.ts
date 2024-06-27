import { configureStore } from "@reduxjs/toolkit";
import { coffeeSlice } from "../features/coffeeSlice";

export const store = configureStore({
  reducer: {
    coffee: coffeeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
