import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { fetchCoffee } from "../features/coffeeThunks";

export const useCoffee = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.coffee);

  useEffect(() => {
    dispatch(fetchCoffee());
  }, [dispatch]);

  return {
    items,
    status,
  };
};
