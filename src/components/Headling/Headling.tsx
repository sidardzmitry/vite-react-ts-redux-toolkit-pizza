import { HTMLAttributes, ReactNode } from "react";
import styles from "./Headling.module.scss";

interface HeadlingProps extends HTMLAttributes<HTMLHeadElement> {
  children: ReactNode;
}

export const Headling = ({ children, className, ...props }: HeadlingProps) => {
  return (
    <h1 className={`${styles["headling"]} ${className}`} {...props}>
      {children}
    </h1>
  );
};
