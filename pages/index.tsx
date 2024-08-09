"use client";
import { useProductsStore } from "@/store/useProducts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import Category from "@/components/Category";

export default function Home() {
  const { product } = useProductsStore();
  const { data } = useProducts();
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (data) setActive(data?.response[0].name);
  }, [data]);

  return (
    <main className="min-h-screen p-5 relative flex flex-col">
      <div className="max-w-8xl">
        <h3 className="text-center text-[17px] font-bold text-white py-4">
          {data?.headerText}
        </h3>
      </div>
      <div className="overflow-scroll">
        <ul className="mb-5 flex space-x-10">

          {data?.response.map((category: any, i: any) => (
            <li
              key={i}
              className={`${active === category.name ? "text-[#F6D211]" : "text-[#9A9A9D]"
                } cursor-pointer whitespace-nowrap`}
              onClick={() => setActive(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      {data?.response.map((category: any, i: any) => (
        active === category.name && <Category key={i} products={category.products} />
      ))}
      <Link
        href={"/checkout"}
        className="bg-[#F6D211] p-4 rounded-full sticky mt-2 bottom-2 w-fit self-end"
      >
        <div className="relative">
          <img src="/assets/images/cart.svg" alt="" />
          <div className="absolute bg-white rounded-full w-4 h-4 flex items-center justify-center -top-4 -right-4">
            <p className=" text-black text-[10px] text-center ">
              {product.length}
            </p>
          </div>
        </div>
      </Link>
    </main>
  );
}

// const lists = ["Pain management", "Cough & Cold", "Vitamins"];
