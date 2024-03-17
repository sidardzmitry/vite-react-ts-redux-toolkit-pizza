import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.scss";
import { Button } from "../../components/Button";
import avatarIcon from "../../assets/avatar.png";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, userActions } from "../../store/userSlice";
import { useEffect } from "react";
import { LogOut, Menu, ShoppingCart } from "lucide-react";
import { Switcher } from "../../components/Switcher";

export const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logOut = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };

  return (
    <div className={`${styles["layout"]}`}>
      <div className={`${styles["sidebar"]}`}>
        <div className={`${styles["user"]}`}>
          <img src={avatarIcon} alt="avatar" />
          <div className={`${styles["user__contact"]}`}>
            <span className={`${styles["user__name"]}`}>{profile?.name}</span>
            <span className={`${styles["user__mail"]}`}>{profile?.email}</span>
          </div>
        </div>
        <div className={`${styles["menu"]}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? styles["active"] : ""} ${styles["menu__link"]}`
            }
          >
            <Menu size={20} />
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${isActive ? styles["active"] : ""} ${styles["menu__link"]}`
            }
          >
            <ShoppingCart size={20} />
            Cart
            <span className={`${styles["count"]}`}>
              {items.reduce((acc, item) => {
                return (acc += item.count);
              }, 0)}
            </span>
          </NavLink>
        </div>
        <Button className={`${styles["exit"]}`} onClick={logOut} appearance="small">
          <LogOut size={20} />
          Exit
        </Button>
      </div>

      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
};
