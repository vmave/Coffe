import React from "react";
import { Coffee } from "../../../../features/coffeeSlice";
import { CoffeeCard } from "../CoffeeCard";

export const CoffeeList: React.FC<{ coffees: Coffee[] }> = ({ coffees }) => {
  return (
    <section className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-5 mt-8 md:mt-12">
      {coffees.map((coffee) => (
        <CoffeeCard key={coffee.id} {...coffee} />
      ))}
    </section>
  );
};
