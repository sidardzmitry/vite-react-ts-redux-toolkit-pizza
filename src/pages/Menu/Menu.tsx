import axios, { AxiosError } from "axios";
import styles from "./Menu.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { API_URL } from "../../helpers/config";

import { Headling } from "../../components/Headling";
import { SearchComponent } from "../../components/Search";
import { Product } from "../../interfaces/product";
import { ProductList } from "../../components/ProductList";

export const notImage = "https://placehold.co/323x165?text=Image+Not+Found";

export const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();

  const getData = async (name?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(`${API_URL}/products`, {
        params: {
          name,
        },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorState(e.message);
      }
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    getData(filter);
  }, [filter]);

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className={`${styles["head"]}`}>
        <Headling>Menu</Headling>
        <SearchComponent
          isValid
          placeholder="Enter dishes or ingredients"
          onChange={updateFilter}
          className={`${styles['head__search']}`}
        />
      </div>
      <div className={`${styles["card__list"]}`}>
        {errorState && <h3 className={`${styles["error"]}`}>{errorState}</h3>}
        {!isLoading && products.length > 0 && (
          <ProductList products={products} notImage={notImage} />
        )}
        {!isLoading && products.length === 0 && (
          <h3 className={`${styles["error"]}`}>
            No dishes found for your request
          </h3>
        )}
      </div>
    </>
  );
};

export default Menu;
