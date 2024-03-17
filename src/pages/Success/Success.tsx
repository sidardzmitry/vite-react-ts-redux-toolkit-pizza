import { useNavigate } from "react-router-dom";
import successImg from "../../assets/pizza.png";
import { Button } from "../../components/Button";
import styles from "./Success.module.scss";

export const Success = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles["success"]}`}>
      <img
        src={successImg}
        className={`${styles["success__img"]}`}
        alt="success"
      />
      <h2 className={`${styles["success__title"]}`}>
        Your order has been successfully completed!
      </h2>
      <Button
        appearance="big"
        className={`${styles["success__btn"]}`}
        onClick={() => {
          navigate("/");
        }}
      >
        Make a new order
      </Button>
    </div>
  );
};
