import React from "react";

interface InputProps {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  value?: string | number;
  placeholder: string;
  symbol?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  symbol,
  onChange,
  accept,
  className = "",
}) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-gray_600 mb-1">{label}</label>}
      <div className="relative">
        <input
          required
          className={`w-full bg-gray_700 rounded-lg p-2 border-solid border-2 border-gray_800 ${className}`}
          type={type}
          name={name}
          value={type === "file" ? undefined : value}
          placeholder={placeholder}
          onChange={onChange}
          accept={accept}
        />
        {type !== "file" && symbol && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {symbol}
          </span>
        )}
      </div>
    </div>
  );
};
