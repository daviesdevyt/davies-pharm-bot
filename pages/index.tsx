import CoughAndCold from "@/components/CoughAndCold";
import PainManagement from "@/components/PainManagement";
import Vitamins from "@/components/Vitamins";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState<string>("Pain management");

  return (
    <main className="min-h-screen p-5 relative">
      <div className="max-w-8xl m-auto">
        <h3 className="my-5 text-center text-[17px] font-bold text-white py-4">
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
        href="/checkout"
        className="bg-[#F6D211] w-fit p-4 rounded-full absolute bottom-2 right-2"
      >
        <img src="/assets/images/cart.svg" alt="" />
      </Link>
    </main>
  );
}

const lists = ["Pain management", "Cough & Cold", "Vitamins"];
