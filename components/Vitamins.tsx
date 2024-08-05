import { useProducts } from "@/hooks/useProducts";
import Card from "./Card";
import { vitamins } from "@/constants/drugs";

const Vitamins = () => {
  const { data } = useProducts();

  return (
    <div className="text-white">
      <div className="grid grid-cols-2 gap-4">
        {data?.response?.map((item: any, i: number) => {
          return item.name === "Cat 3"
            ? item.products.map((product: any, j: number) => (
                <Card
                  id={product._id}
                  key={j}
                  drug={item.name}
                  image={product.image}
                  currentPrice={product.price}
                  discount={30}
                  formerPrice={1000}
                />
              ))
            : null; // Return null if the condition is not met
        })}
      </div>
    </div>
  );
};

export default Vitamins;
