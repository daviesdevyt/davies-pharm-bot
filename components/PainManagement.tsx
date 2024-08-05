import React, { useEffect } from "react";
import Card from "./Card";
import { pain } from "@/constants/drugs";
import { useProducts } from "@/hooks/useProducts";

const PainManagement = () => {
  const { data } = useProducts();
  return (
    <div className="text-white">
      <div className="grid grid-cols-2 gap-4">
        {data?.response?.map((item: any, i: number) => {
          return item.name === "Cat 1"
            ? item.products.map((product: any, j: number) => (
                <Card
                  id={product._id}
                  key={i}
                  drug={item.name}
                  image={product.image} // Optional chaining to avoid errors if image is not available
                  currentPrice={product.price} // Optional chaining for price
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

export default PainManagement;
