import { Spinner } from "../../../../components";
import { Coffee, CoffeeStatuses } from "../../../../features/coffeeSlice";
import { CoffeeTabs } from "../../components/CoffeeTabs";

interface CoffeeDataViewerProps<T> {
  status: CoffeeStatuses;
  allCoffees: T[];
  robustaCoffees: T[];
  arabicaCoffees: T[];
}

export const CoffeeDataViewer: React.FC<CoffeeDataViewerProps<Coffee>> = ({
  status,
  ...coffees
}) => {
  switch (status) {
    case CoffeeStatuses.LOADING:
      return (
        <section className="flex justify-center items-center">
          <Spinner />
        </section>
      );
    case CoffeeStatuses.FAILED:
      return (
        <section className="text-center text-red-500">
          Failed to load coffees.
        </section>
      );
    case CoffeeStatuses.SUCCEEDED:
      return <CoffeeTabs {...coffees} />;
    default:
      return (
        coffees.allCoffees.length === 0 && (
          <section className="text-center text-white">
            Add your coffee by clicking Create button.
          </section>
        )
      );
  }
};
