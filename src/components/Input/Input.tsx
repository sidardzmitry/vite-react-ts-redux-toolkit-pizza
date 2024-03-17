import { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
}

export const Input = ({ className, isValid = true, ...props }: InputProps) => {
  return (
    <input
      autoComplete="off"
      className={`${styles["input"]} ${isValid ? styles["invalid"] : ""}`}
      {...props}
    />
  );
};
