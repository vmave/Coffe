import React, { useState } from "react";
import { Button } from "../Button";
import { CreateCoffeeModal } from "../../pages/Coffee/components/CreateCoffeeModal";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="flex justify-between items-center text-white">
      <h1 className="font-bebas text-3xl">{title}</h1>
      <Button onClick={toggleModal}>Create</Button>
      <CreateCoffeeModal closeModal={toggleModal} isOpen={isModalOpen} />
    </header>
  );
};

export default Header;
