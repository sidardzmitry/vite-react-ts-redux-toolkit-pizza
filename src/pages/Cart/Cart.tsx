import { useDispatch, useSelector } from "react-redux";
import { Headling } from "../../components/Headling";
import styles from "./Cart.module.scss";
import { AppDispatch, RootState } from "../../store/store";
import { CartItem } from "../../components/CartItem";
import { Product } from "../../interfaces/product";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../helpers/config";
import { RussianRuble } from "lucide-react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cartSlice";

const DELIVERY_FEE = 165;

export const Cart = () => {
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${API_URL}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(res);
  };

  const checkout = async () => {
    await axios.post(
      `${API_URL}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(cartActions.clean());
    navigate("/success");
  };

  const total = items
    .map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);
      if (!product) {
        return 0;
      }
      return i.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);

  useEffect(() => {
    loadAllItems();
    if (items.length) {
      setButtonDisabled(false);
    }
  }, [items]);

  return (
    <>
      <div className={`${styles["cart"]}`}>
        <Headling className={`${styles["cart__head"]}`}>Cart</Headling>

        <div className={`${styles["cart__wrapper"]}`}>
          {items.length >= 1 ? (
            items.map((i) => {
              const product = cartProducts.find((p) => p.id === i.id);
              if (!product) {
                return;
              }
              return <CartItem key={product.id} count={i.count} {...product} />;
            })
          ) : (
            <h3 className={`${styles["cart__error"]}`}>Cart is empty</h3>
          )}
        </div>

        <div className={`${styles["order"]}`}>
          <div className={`${styles["order__item"]}`}>
            <h3>Price</h3>
            <div>
              {total}
              <RussianRuble
                size={16}
                strokeWidth={2}
                className={`${styles["item__currency"]}`}
              />
            </div>
          </div>
          <div className={`${styles["order__item"]}`}>
            <h3>Delivery</h3>
            <div>
              {DELIVERY_FEE}
              <RussianRuble
                size={16}
                strokeWidth={2}
                className={`${styles["item__currency"]}`}
              />
            </div>
          </div>
          <div className={`${styles["order__item"]}`}>
            <h3>
              Total <span>{items.length}</span>
            </h3>
            <div>
              {total ? total + DELIVERY_FEE : 0}
              <RussianRuble
                size={16}
                strokeWidth={2}
                className={`${styles["item__currency"]}`}
              />
            </div>
          </div>
        </div>

        <div className={`${styles["checkout"]}`}>
          <Button
            appearance="big"
            className={`${styles["checkout-btn"]}`}
            onClick={checkout}
            disabled={isButtonDisabled}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
