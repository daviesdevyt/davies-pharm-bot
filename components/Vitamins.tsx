import Card from "./Card";
import { vitamins } from "@/constants/drugs";

const Vitamins = () => {
  return (
    <div className="text-white">
      <div className="grid grid-cols-2 gap-4">
        {vitamins.map((item, i) => (
          <Card
            key={i}
            drug={item.name}
            image={item.image}
            currentPrice={item.currentPrice}
            discount={item.discount}
            formerPrice={item.formerPrice}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Vitamins;
