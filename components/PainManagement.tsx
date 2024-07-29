import React from "react";
import Card from "./Card";
import { pain } from "@/constants/drugs";

const PainManagement = () => {
  return (
    <div className="text-white">
      <div className="grid grid-cols-2 gap-4">
        {pain.map((item, i) => (
          <Card
            id={item.id}
            key={i}
            drug={item.name}
            image={item.image}
            currentPrice={item.currentPrice}
            discount={item.discount}
            formerPrice={item.formerPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default PainManagement;
