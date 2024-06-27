import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCoffeeAsync, fetchCoffee } from "./coffeeThunks";

export type CoffeeType = "arabica" | "robusta";

export interface Coffee {
  id?: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string | File | null;
  type: CoffeeType;
}

export enum CoffeeStatuses {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}

export interface CoffeeState {
  items: Coffee[];
  status: CoffeeStatuses;
}

const initialState: CoffeeState = {
  items: [],
  status: CoffeeStatuses.IDLE,
};

export const coffeeSlice = createSlice({
  name: "coffee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchCoffee async thunk
      .addCase(fetchCoffee.pending, (state) => {
        state.status = CoffeeStatuses.LOADING;
      })
      .addCase(
        fetchCoffee.fulfilled,
        (state, action: PayloadAction<Coffee[]>) => {
          state.status = CoffeeStatuses.SUCCEEDED;
          state.items = action.payload;
        }
      )
      .addCase(fetchCoffee.rejected, (state) => {
        state.status = CoffeeStatuses.FAILED;
      })

      // Handling addCoffeeAsync async thunk
      .addCase(
        addCoffeeAsync.fulfilled,
        (state, action: PayloadAction<Coffee>) => {
          state.status = CoffeeStatuses.SUCCEEDED;
          state.items.push(action.payload);
        }
      );
  },
});
