import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { RussianRuble, ShoppingCart } from "lucide-react";
import styles from "./ProductCard.module.scss";
import starIcon from "../../assets/star-icon.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cartSlice";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

export const ProductCard = ({
  id,
  title,
  description,
  image,
  price,
  rating,
}: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const add = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(cartActions.add(id));
  };
  
  return (
    <Link to={`/product/${id}`} className={`${styles["card"]}`} key={id}>
      <div
        className={`${styles["card__head"]}`}
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className={`${styles["card__head-price"]}`}>
          {price}
          <RussianRuble
            size={16}
            strokeWidth={2}
            className={`${styles["card__head-currency"]}`}
          />
        </div>
        <button className={`${styles["card__head-btn"]}`} onClick={add}>
          <ShoppingCart size={16} strokeWidth={2} color="white" />
        </button>
        <div className={`${styles["card__rating"]}`}>
          {rating}
          <img src={starIcon} alt="starIcon" />
        </div>
      </div>
      <div className={`${styles["card__footer"]}`}>
        <h2 className={`${styles["card__footer-title"]}`}>{title}</h2>
        <p className={`${styles["card__footer-description"]}`}>{description}</p>
      </div>
    </Link>
  );
};
