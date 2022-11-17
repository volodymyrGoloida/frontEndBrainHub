import React from "react";
import scss from "./CustomInput.module.scss";

interface CustomInputProps {
  error?: string;
  onChange: (name: string, value: string) => void;
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  error,
  onChange,
  name,
  type,
  placeholder = "",
  value,
}) => (
  <div className={scss.root}>
    <input
      onChange={(e) => onChange(e.target.name, e.target.value)}
      autoComplete="off"
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
    />
    {error && <p className={scss.inputError}>{error}</p>}
  </div>
);
export default CustomInput;
