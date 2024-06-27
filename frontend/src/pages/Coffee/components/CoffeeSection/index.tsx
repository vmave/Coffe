import { Footer, Hero } from "../../../../components";

interface CoffeeSectionProps {
  title: string;
  children: JSX.Element;
}

export const CoffeeSection: React.FC<CoffeeSectionProps> = ({
  title,
  children,
}) => {
  return (
    <main>
      <Hero />
      <section className="p-6 md:px-48">
        <h2 className="font-bebas text-3xl mb-2 mt-4 text-center">{title}</h2>
        {children}
      </section>
      <Footer />
    </main>
  );
};
