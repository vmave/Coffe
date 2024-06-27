import { useState } from "react";
import Header from "../Header";
import { CreateCoffeeModal } from "../../pages/Coffee/components/CreateCoffeeModal";
import { Button } from "../Button";

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-cover bg-no-repeat bg-rigth md:bg-top md:bg-coffee-lg bg-coffee-sm z-10">
      <section className="absolute inset-0 bg-fixed bg-black bg-opacity-65 p-6 md:px-48">
        <Header title="Coffee" />
        <section className="flex h-full items-center md:justify-start justify-center">
          <div className="text-white text-center md:text-left">
            <h2 className="font-bebas mb-4 text-7xl md:text-9xl font-semibold uppercase">
              roasted coffee
            </h2>
            <h4 className="font-poppins mb-6 text-xl text-gray_100">
              Choose a coffee from below or create your own.
            </h4>
            <div className="flex h-full items-center md:justify-start justify-center">
              <Button onClick={toggleModal}>Create your own coffee</Button>
            </div>
          </div>
        </section>
      </section>
      <CreateCoffeeModal closeModal={toggleModal} isOpen={isModalOpen} />
    </div>
  );
};
