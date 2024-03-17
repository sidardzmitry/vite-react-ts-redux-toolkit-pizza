import { Minus, Plus, RussianRuble, X } from "lucide-react";
import styles from "./CartItem.module.scss";
import { cartActions } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

interface CartItemProps {
  id: number;
  name: string;
  image: string;
  price: number;
  count: number;
}

export const CartItem = ({ id, name, image, price, count }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.add(id));
  };
  const decrease = () => {
    dispatch(cartActions.remove(id));
  };
  const removeItem = () => {
    dispatch(cartActions.delete(id));
  };

  return (
    <div className={`${styles["item"]}`}>
      <div
        className={`${styles["item__img"]}`}
        style={{ backgroundImage: `url('${image}')` }}
      ></div>

      <div className={`${styles["item__desc"]}`}>
        <h2 className={`${styles["item__title"]}`}>{name}</h2>
        <div className={`${styles["item__price"]}`}>
          {price}
          <RussianRuble
            size={16}
            strokeWidth={2}
            className={`${styles["item__currency"]}`}
          />
        </div>
      </div>

      <div className={`${styles["item__actions"]}`}>
        <div className={`${styles["item__btns"]}`}>
          <button className={`${styles["item__btn"]}`} onClick={decrease}>
            <Minus size={16} strokeWidth={2} color="#8e00ff" />
          </button>
          <div className={`${styles["item__count"]}`}>{count}</div>
          <button
            className={`${styles["item__btn"]} ${styles["plus"]}`}
            onClick={increase}
          >
            <Plus size={16} strokeWidth={2} color="#ffffff" />
          </button>
        </div>
        <button className={`${styles["item__remove"]}`} onClick={removeItem}>
          <X size={16} strokeWidth={2} color="#8e00ff" />
        </button>
      </div>
    </div>
  );
};
