import Card from "./Card";

const Category = ({ products }: { products: any[] }) => {
  
  return (
    <div className="text-white">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product: any, j: number) => (          
          <Card
            id={product._id}
            key={j}
            drug={product.name}
            image={product.image}
            currentPrice={product.price}
            discount={30}
            formerPrice={1000}
          />
        ))
        }
      </div>
    </div>
  );
};

export default Category;
