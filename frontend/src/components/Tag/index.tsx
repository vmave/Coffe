import { CoffeeType } from "../../features/coffeeSlice";

interface TypeTagProps {
  type: CoffeeType;
}

const colorMap = {
  arabica: "bg-blue_100",
  robusta: "bg-gray_500",
};

export const Tag: React.FC<TypeTagProps> = ({ type }) => {
  const bgColor = colorMap[type] || "bg-gray-600";

  return (
    <span
      className={`${bgColor} absolute top-5 left-5 text-white px-3 py-1 rounded-full`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};
