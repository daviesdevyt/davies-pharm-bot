import { useProductsStore } from "@/store/useProducts";

interface CardProps {
  drug: string;
  image: string;
  currentPrice: number;
  formerPrice?: number;
  discount?: number;
  id: number;
}

const Card: React.FC<CardProps> = ({
  drug,
  image,
  currentPrice,
  formerPrice,
  discount,
  id,
}) => {
  const { addProduct } = useProductsStore();
  const handleClick = () => {
    addProduct({ image, price: currentPrice, id, name: drug });
    console.log(
      `Added ${drug} of price ${currentPrice} and of image ${image} also of id ${id} into the store`
    );
  };
  return (
    <div className="-center relative flex flex-col rounded-2xl border border-[#2D2D2D] bg-black px-4 py-2">
      <img src={image} className="my-4 h-[91px]" alt="" />
      <div className="w-full space-y-1">
        <h1 className="text-[15.2px] font-semibold ">{drug}</h1>
        <h2 className="text-[16px] font-bold text-[#F6D211]">
          ${(currentPrice)}
        </h2>
        {formerPrice && (
          <div className="flex items-center space-x-1">
            <h3 className="text-[12px] text-[#E1E2E47A] line-through">
              ${(formerPrice)}
            </h3>
            <p className="text-[8px] text-[#F6D211]">{discount}% Off</p>
          </div>
        )}
      </div>
      <div
        className="absolute bottom-2 right-2 flex size-[36px] cursor-pointer items-center justify-center rounded-full bg-[#F6D211]"
        onClick={handleClick}
      >
        <img src="/assets/images/plus.svg" alt="Add to cart" />
      </div>
    </div>
  );
};

export default Card;

function format(number: number) {
  // Convert number to string
  const numStr = number.toString();

  // Split the number into integer and decimal parts
  const [integerPart, decimalPart] = numStr.split(".");

  // Add commas to the integer part
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Reassemble the number with decimal part if exists
  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
}
