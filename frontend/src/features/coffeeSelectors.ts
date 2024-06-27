import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Coffee, CoffeeState, CoffeeType } from "./coffeeSlice";

const selectCoffeeState = (state: RootState): CoffeeState => state.coffee;

export const selectAllCoffees = createSelector(
  [selectCoffeeState],
  (coffeeState): Coffee[] => coffeeState.items
);

export const selectCoffeeByType = (type: CoffeeType) =>
  createSelector([selectAllCoffees], (allCoffees): Coffee[] =>
    allCoffees.filter((coffee) => coffee.type === type)
  );
