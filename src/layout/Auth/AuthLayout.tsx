import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.scss";
import logoAuth from "../../assets/logo.svg";

export const AuthLayout = () => {
  return (
    <div className={`${styles["auth"]}`}>
      <div className={`${styles["auth__logo"]}`}>
        <img src={logoAuth} alt="logoAuth" />
      </div>
      <div className={`${styles["auth__content"]}`}>
        <Outlet />
      </div>
    </div>
  );
};
