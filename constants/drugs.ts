const pain = [
    { image: "/assets/images/germoloids.svg", name: "Germoloids", currentPrice: 5500, formerPrice: 8000, discount: 22, id: 1 },
    { image: "/assets/images/tylenol.svg", name: "Tylenol", currentPrice: 17500, id: 2 },
    { image: "/assets/images/strepsils.svg", name: "Strepsils", currentPrice: 3500, id: 3 },
    { image: "/assets/images/deep-heat.svg", name: "Deep Heat Rub", currentPrice: 9300, formerPrice: 12000, discount: 12, id: 4 },
];
const cold = [
    { image: "/assets/images/deep-heat.svg", name: "Deep Heat Rub", currentPrice: 9300, formerPrice: 12000, discount: 12, id: 4 },
    // { image: "/assets/images/germoloids.svg", name: "Germoloids", currentPrice: 5500, formerPrice: 8000, discount: 22 },
    { image: "/assets/images/strepsils.svg", name: "Strepsils", currentPrice: 3500, id: 3 },
    // { image: "/assets/images/tylenol.svg", name: "Tylenol", currentPrice: 17500 },
];
const vitamins = [
    { image: "/assets/images/tylenol.svg", name: "Tylenol", currentPrice: 17500, id: 2 },
    // { image: "/assets/images/deep-heat.svg", name: "Deep Heat Rub", currentPrice: 9300, formerPrice: 12000, discount: 12 },
    { image: "/assets/images/germoloids.svg", name: "Germoloids", currentPrice: 5500, formerPrice: 8000, discount: 22, id: 1 },
    // { image: "/assets/images/strepsils.svg", name: "Strepsils", currentPrice: 3500 },
];

const format = (number: number) => {
    // Convert number to string
    const numStr = number.toString();

    // Split the number into integer and decimal parts
    const [integerPart, decimalPart] = numStr.split(".");

    // Add commas to the integer part
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Reassemble the number with decimal part if exists
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}

export { pain, cold, vitamins, format };
