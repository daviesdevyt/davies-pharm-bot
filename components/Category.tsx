import Card from "./Card";

const Category = ({ products }: { products: any[] }) => {
  function calculateDiscount(price: number, discount_price: number) {
    if (!discount_price) return undefined;
    return Math.floor(((price - discount_price) / price) * 100);
  }
  return (
    <div className="text-white">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product: any, j: number) => (
          <Card
            id={product._id}
            key={j}
            drug={product.name}
            image={product.image_url}
            currentPrice={product.price}
            discount={calculateDiscount(product.price, product.discount_price)}
            formerPrice={product.discount_price}
          />
        ))
        }
      </div>
    </div>
  );
};

export default Category;
