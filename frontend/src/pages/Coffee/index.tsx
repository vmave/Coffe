import { CoffeeSection } from "./components/CoffeeSection";
import { CoffeeDataProvider } from "./containers/CoffeeDataProvider";
import { CoffeeDataViewer } from "./containers/CoffeeDataViewer";

export const CoffeePage = () => {
  return (
    <CoffeeDataProvider>
      {(coffees) => (
        <CoffeeSection title="EXCLUSIVE Coffee">
          <CoffeeDataViewer {...coffees} />
        </CoffeeSection>
      )}
    </CoffeeDataProvider>
  );
};
