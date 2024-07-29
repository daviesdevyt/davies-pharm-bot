import { format } from "@/constants/drugs";
import { useProductsStore } from "@/store/useProducts";
import Link from "next/link";
import { useEffect, useState } from "react";

const checkout = () => {
  const { product, removeProduct } = useProductsStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // or a loading indicator
  }

//   const getTotal = (products: {price: number}[]) => {
//     products.reduce((accumulator, item) => (accumulator + item.price) )
//   }

  return (
    <main className="min-h-screen space-y-5 p-5 text-white">
      <header className="flex">
        <Link href={"/"}>
          <img src="/assets/images/arrow-left.svg" alt="Back Arrow" />
        </Link>
        <h1 className="flex-1 text-center">Checkout</h1>
      </header>
      <section className="space-y-2">
        <h1 className="text-[18px] font-bold">Your Order</h1>
        {product.length !== 0 ? (
          product.map((items, i) => (
            <div
              className="flex items-start justify-between rounded-[20px] bg-black p-[10px]"
              key={i}
            >
              <div className="flex space-x-3">
                <img src={items.image} className=" h-[45px] w-[80px]" alt="Drug Image" />
                <div>
                  <h1 className="font-medium ">{items.name}</h1>
                  <h2 className="text-[15px] font-bold text-[#F6D211]">
                    ₦{format(items.price)}
                  </h2>
                </div>
              </div>
              <img
                className="cursor-pointer"
                src="/assets/images/close.svg"
                alt="remove item"
                onClick={() => removeProduct(items.id)}
              />
            </div>
          ))
        ) : (
          <div>
            <p className="flex h-20 items-center justify-center text-[#9A9A9D]">
              You have not added any product yet!
            </p>
          </div>
        )}
      </section>
      {product.length !== 0 && (
        <>
          <section className="space-y-2">
            <h1 className="text-[18px] font-bold">Payment Method</h1>
            <div className="flex items-center space-x-3 rounded-[20px] bg-black p-[10px]">
              <div className="h-fit cursor-pointer rounded-full border border-[#F6D211] p-1">
                <div className="size-2 rounded-full bg-[#F6D211]" />
              </div>
              <div className="flex items-center justify-center rounded-lg bg-[#F6D211] p-4">
                <img src="/assets/images/wallet.svg" alt="Drug Image" />
              </div>
              <h1 className="text-[17px]">Wallet</h1>
            </div>
          </section>
          <section className="space-y-2">
            <header className="flex items-center justify-between">
              <h1 className="text-[18px] font-bold">Shipping Address</h1>
              <p className="text-[#F6D211]">change</p>
            </header>
            <div className="flex flex-col space-y-2 rounded-[20px] bg-black p-[10px]">
              <p className="border-b text-[12.09px]">Nile</p>
              <p className="border-b text-[10.57px]">
                Plot 681, Cadastral Zone C, OO, Research & Institution Area,
                Airport Road, Jabi
              </p>
              <p className="text-[10.57px]">+234 9077373738</p>
            </div>
          </section>
          <section className="space-y-2">
            <h1>Phone number</h1>
            <input
              className="w-full rounded-lg bg-black p-3 outline-none placeholder:text-white"
              type="text"
              placeholder="Enter Phone Number"
            />
          </section>
          <section className="flex justify-between">
            <p className="text-[17px]">Total</p>
            <h1 className="font-medium">₦{product.reduce((accumulator, item) => (accumulator + item.price), 0)}</h1>
          </section>
          <button className="w-full rounded-[30px] bg-[#F6D211] px-[70px] py-[19px] text-[17px] text-black">
            Proceed to payment
          </button>{" "}
        </>
      )}
    </main>
  );
};

export default checkout;
``;
