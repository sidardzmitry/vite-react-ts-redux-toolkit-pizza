import { Product } from "../../interfaces/product";
import { ProductCard } from "../ProductCard/ProductCard";

interface ProductListProps {
  products: Product[];
  notImage: string;
}

export const ProductList = ({ products, notImage }: ProductListProps) => {
  return products.map(({ id, name, ingredients, rating, price }) => (
    <ProductCard
      key={id}
      id={id}
      image={notImage}
      title={name}
      description={ingredients.join(", ")}
      rating={rating}
      price={price}
    />
  ));
};
