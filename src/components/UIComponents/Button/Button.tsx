import React from "react";
import scss from "./Button.module.scss";

interface ButtonProps {
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className={scss.buttonRoot}>{children}</button>;
};
export default Button;
