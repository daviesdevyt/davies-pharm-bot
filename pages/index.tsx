import CoughAndCold from "@/components/CoughAndCold";
import PainManagement from "@/components/PainManagement";
import Vitamins from "@/components/Vitamins";
import { useProductsStore } from "@/store/useProducts";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState<string>("Pain management");
  const { product } = useProductsStore();

  return (
    <main className="min-h-screen p-5 relative flex flex-col">
      <div className="max-w-8xl">
        <h3 className="text-center text-[17px] font-bold text-white py-4">
          PLUGXI
        </h3>
      </div>
      <div className="overflow-scroll">
        <ul className="mb-5 flex space-x-10">
          {lists.map((list, i) => (
            <li
              key={i}
              className={`${
                active === list ? "text-[#F6D211]" : "text-[#9A9A9D]"
              } cursor-pointer whitespace-nowrap`}
              onClick={() => setActive(list)}
            >
              {list}
            </li>
          ))}
        </ul>
      </div>
      {active === lists[0] && <PainManagement />}
      {active === lists[1] && <CoughAndCold />}
      {active === lists[2] && <Vitamins />}
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

const lists = ["Pain management", "Cough & Cold", "Vitamins"];
