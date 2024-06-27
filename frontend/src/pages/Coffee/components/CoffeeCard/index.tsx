import { Tag } from "../../../../components";
import { Coffee } from "../../../../features/coffeeSlice";

export const CoffeeCard: React.FC<Coffee> = ({
  title,
  description,
  price,
  imageUrl,
  type,
}) => {
  return (
    <section className="p-8 rounded-md bg-gray_400 relative">
      <Tag type={type} />
      <img
        className="max-w-[220px] object-contain h-48"
        src={imageUrl as string}
        alt={title}
      />
      <div className="flex flex-col items-center justify-center">
        <div className="font-poppins text-orange_300 font-bold text-2xl mb-1 mt-8 line-clamp-1">
          {title}
        </div>
        <p className="mb-1 text-base font-medium text-gray_300 line-clamp-2">
          {description}
        </p>
        <span className="font-poppins font-bold text-xl font-bold">
          {price} €
        </span>
      </div>
    </section>
  );
};
