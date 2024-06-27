import { Tab, Tabs } from "../../../../components";
import { Coffee } from "../../../../features/coffeeSlice";
import { CoffeeList } from "../CoffeeList";

interface CoffeeTabsProps<T> {
  allCoffees: T[];
  robustaCoffees: T[];
  arabicaCoffees: T[];
}

export const CoffeeTabs: React.FC<CoffeeTabsProps<Coffee>> = ({
  allCoffees,
  robustaCoffees,
  arabicaCoffees,
}) => (
  <Tabs>
    <Tab active render={() => <CoffeeList coffees={allCoffees} />}>
      All
    </Tab>
    <Tab render={() => <CoffeeList coffees={robustaCoffees} />}>Robusta</Tab>
    <Tab render={() => <CoffeeList coffees={arabicaCoffees} />}>Arabica</Tab>
  </Tabs>
);
