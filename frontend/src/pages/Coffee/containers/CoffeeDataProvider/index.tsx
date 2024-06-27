import {
  selectAllCoffees,
  selectCoffeeByType,
} from "../../../../features/coffeeSelectors";
import { Coffee, CoffeeStatuses } from "../../../../features/coffeeSlice";
import { useCoffee } from "../../../../hooks/useCoffee";
import { useAppSelector } from "../../../../hooks/useRedux";

interface CoffeeDataProviderProps<T> {
  children: (props: {
    status: CoffeeStatuses;
    allCoffees: T[];
    robustaCoffees: T[];
    arabicaCoffees: T[];
  }) => JSX.Element;
}

export const CoffeeDataProvider: React.FC<CoffeeDataProviderProps<Coffee>> = ({
  children,
}) => {
  const { status } = useCoffee();
  const allCoffees = useAppSelector(selectAllCoffees);
  const robustaCoffees = useAppSelector(selectCoffeeByType("robusta"));
  const arabicaCoffees = useAppSelector(selectCoffeeByType("arabica"));

  return children({ status, allCoffees, robustaCoffees, arabicaCoffees });
};

