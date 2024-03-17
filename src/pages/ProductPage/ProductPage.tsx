import { MouseEvent } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import { Product } from "../../interfaces/product";
import { ChevronLeft, RussianRuble, ShoppingCart } from "lucide-react";
import { Button } from "../../components/Button";
import starIcon from "../../assets/star-icon.svg";
import { Headling } from "../../components/Headling";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cartSlice";

interface ProductProps {
}

export const ProductPage = ({}: ProductProps) => {
  const { id, name, price, ingredients, image, rating } = useLoaderData() as Product;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const add = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(cartActions.add(id));
  };


  return (
    <div className={`${styles["product"]}`}>
      <div className={`${styles["product__top"]}`}>
        <button className={`${styles["product__back"]}`} onClick={() => navigate(-1)}>
          <ChevronLeft size={16} />
        </button>
        <Headling className={`${styles["product__title"]}`}>{name}</Headling>
        <Button appearance="small" className={`${styles['product__cart']}`} onClick={add}>
          <ShoppingCart size={16} />
          To cart
        </Button>
      </div>
      <div className={`${styles["product__bottom"]}`}>
        <div
          className={`${styles["product__img"]}`}
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
        <div className={`${styles["product__content"]}`}>

          <div className={`${styles["product__price"]}`}>
            <h5>Price</h5>
            <span>
              {price}
              <RussianRuble
                size={16}
                strokeWidth={2}
                className={`${styles["product__price-currency"]}`}
              />
            </span>
          </div>

          <div className={`${styles["product__rating"]}`}>
            <h5>Rating</h5>
            <span>
              {rating}
              <img src={starIcon} alt="starIcon" />
            </span>
          </div>

          <div className={`${styles['product__ingredients']}`}>
            <h5>Ingredients of the dish:</h5>
            <ul className={`${styles['ingredients-list']}`}>
              {ingredients.map((item, index) => (
                <li key={index} className={`${styles['ingredients-item']}`}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
