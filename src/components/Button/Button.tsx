import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  appearance?: "small" | "big";
}

export const Button = ({
  children,
  className,
  appearance = "big",
  ...props
}: ButtonProps) => {
  return (
    <>
      <button
        className={`${className} ${styles["button"]} ${styles["accent"]} ${
          appearance === "small" ? styles["small"] : styles["big"]
        }`}
        {...props}
      >
        {children}
      </button>
    </>
  );
};
