import React, { useState } from "react";
import { useAppDispatch } from "../../../../hooks/useRedux";
import { addCoffeeAsync } from "../../../../features/coffeeThunks";
import { Coffee, CoffeeType } from "../../../../features/coffeeSlice";
import { Alert, Button, Input } from "../../../../components";

interface CreateCoffeeModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const CreateCoffeeModal: React.FC<CreateCoffeeModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Coffee>({
    title: "",
    price: "",
    type: "arabica",
    imageUrl: null,
    description: "",
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const submissionData = new FormData();
    if (!formData.imageUrl) {
      console.error("No image file selected or incorrect data.");
      return;
    }
    submissionData.append("title", formData.title);
    submissionData.append("price", formData.price);
    submissionData.append("type", formData.type);
    submissionData.append("description", formData.description);
    submissionData.append("image", formData.imageUrl);

    const dispatchResult = await dispatch(addCoffeeAsync(submissionData));

    if (dispatchResult.meta.requestStatus === "rejected") {
      setError(dispatchResult?.payload as never);
    } else {
      closeModal();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (files && files.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrl: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleTypeChange = (type: CoffeeType) => {
    setFormData({ ...formData, type });
  };

  const disabled =
    !formData.title ||
    !formData.price ||
    !formData.description ||
    !formData.imageUrl;

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Alert message={error} />
      <div className="bg-black text-white md:p-20 p-6 rounded-lg md:w-6/12 relative">
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 text-2xl text-white font-bold"
        >
          &times;
        </button>
        <h2 className="font-bebas text-5xl font-bold text-center mb-6 uppercase">
          Create new
        </h2>
        <section className="space-y-6">
          <Input
            name="title"
            type="text"
            label="Name"
            placeholder="Name your coffee here"
            value={formData.title}
            onChange={handleChange}
          />

          <Input
            name="price"
            type="text"
            label="Price"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
            symbol="€"
          />
          <div className="flex justify-between gap-3">
            <Button
              className={`${
                formData.type === "arabica"
                  ? "border-gray_white"
                  : "border-gray_800 text-gray_600"
              } w-full`}
              onClick={() => handleTypeChange("arabica")}
              variant="gray"
            >
              Arabica
            </Button>
            <Button
              className={`${
                formData.type === "robusta"
                  ? "border-gray_white"
                  : "border-gray_800 text-gray_600"
              } w-full`}
              onClick={() => handleTypeChange("robusta")}
              variant="gray"
            >
              Robusta
            </Button>
          </div>
          <Input
            type="file"
            name="imageUrl"
            label="Upload image"
            placeholder="Paste image URL here"
            onChange={handleChange}
          />
          <Input
            name="description"
            label="Description"
            placeholder="Add a description"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="flex md:flex-row md:justify-center flex-col gap-3">
            <Button onClick={closeModal} variant="orange-border">
              Discard
            </Button>
            <Button onClick={handleSubmit} disabled={disabled}>
              Confirm
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
};
