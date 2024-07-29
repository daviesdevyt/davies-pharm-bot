import Card from "./Card";
import { cold } from "@/constants/drugs";

const CoughAndCold = () => {
  return (
    <div className="text-white">
      <div className="grid grid-cols-2 gap-4">
        {cold.map((item, i) => (
          <Card
            key={i}
            id={item.id}
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

export default CoughAndCold;
