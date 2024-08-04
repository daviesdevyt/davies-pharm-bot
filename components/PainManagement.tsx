import React from "react";
import Card from "./Card";
import { pain } from "@/constants/drugs";
import { useProducts } from "@/hooks/useProducts";

const PainManagement = () => {
  const { data } = useProducts();
  return (
    <div className="text-white">
      <div className="grid grid-cols-2 gap-4">
        {data?.map((item: any, i: number) => (
          <Card
            id={item._id}
            key={i}
            drug={item.name}
            image={"/assets/images/germoloids.svg"}
            currentPrice={2000}
            discount={30}
            formerPrice={1000}
          />
        ))}
      </div>
    </div>
  );
};

export default PainManagement;
