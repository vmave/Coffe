import React from "react";
import classNames from "classnames";

interface ButtonProps {
  onClick?: (event: React.FormEvent<Element>) => void;
  children: React.ReactNode;
  className?: string;
  variant?: "orange" | "gray" | "orange-border";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  variant = "orange",
  disabled = false,
}) => {
  const baseClasses =
    "flex justify-center items-center h-11 rounded-full px-10 py-3.5";

  const variantClasses = classNames({
    "bg-orange_100 hover:bg-orange_200": variant === "orange",
    "bg-black border-solid border-2 rounded-lg": variant === "gray",
    "border-2 border-orange_100 bg-black text-white":
      variant === "orange-border",
    "bg-orange_200 cursor-not-allowed": disabled,
  });

  const combinedClasses = classNames(baseClasses, variantClasses, className);

  return (
    <button onClick={onClick} className={combinedClasses} disabled={disabled}>
      {children}
    </button>
  );
};
