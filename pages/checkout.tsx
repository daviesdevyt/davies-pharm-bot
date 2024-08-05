"use client";
import { format } from "@/constants/drugs";
import { useProductsStore } from "@/store/useProducts";
import Link from "next/link";
import { ReactHTMLElement, useEffect, useState } from "react";

const Checkout = () => {
  const { product, removeProduct } = useProductsStore();
  const [hydrated, setHydrated] = useState(false);

  const [edit, setEdit] = useState<boolean>(true);

  const [shippingDetails, setShippingDetails] = useState({
    country: "Nile",
    house:
      "Plot 681, Cadastral Zone C, OO, Research & Institution Area,Airport Road, Jabi",
    phone: "+2349073210998",
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // or a loading indicator
  }

  //   const getTotal = (products: {price: number}[]) => {
  //     products.reduce((accumulator, item) => (accumulator + item.price) )
  //   }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
                <img
                  src={items.image}
                  className=" h-[45px] w-[80px]"
                  alt="Image"
                />
                <div>
                  <h1 className="font-medium ">{items.name}</h1>
                  <h2 className="text-[15px] font-bold text-[#F6D211]">
                    ${format(items.price)}
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
                <img src="/assets/images/wallet.svg" alt="Image" />
              </div>
              <h1 className="text-[17px]">Wallet</h1>
            </div>
          </section>
          <section className="space-y-2">
            <header className="flex items-center justify-between">
              <h1 className="text-[18px] font-bold">Shipping Address</h1>
              <p
                className="text-[#F6D211] cursor-pointer"
                onClick={() => setEdit(!edit)}
              >
                {!edit ? "save" : "change"}
              </p>
            </header>
            <div className="flex flex-col space-y-2 rounded-[20px] bg-black p-[10px]">
              <input
                name="country"
                value={shippingDetails.country}
                className="border-b text-[12.09px] outline-none bg-transparent"
                readOnly={edit}
                onChange={handleChange}
              />
              <input
                className="border-b text-[10.57px] outline-none bg-transparent"
                name="house"
                value={shippingDetails.house}
                readOnly={edit}
                onChange={handleChange}
              />
              <input
                name="phone"
                className="text-[10.57px] outline-none bg-transparent"
                value={shippingDetails.phone}
                readOnly={edit}
                onChange={handleChange}
              />
            </div>
          </section>
          <section className="space-y-2">
            <h1>Email</h1>
            <input
              className="w-full rounded-lg bg-black p-3 outline-none placeholder:text-white"
              type="text"
              placeholder="Enter your contact email"
            />
          </section>
          <section className="flex justify-between">
            <p className="text-[17px]">Total</p>
            <h1 className="font-medium">
              $
              {product.reduce(
                (accumulator, item) => accumulator + item.price,
                0
              )}
            </h1>
          </section>
          <button className="w-full rounded-[30px] bg-[#F6D211] px-[70px] py-[19px] text-[17px] text-black">
            Proceed to payment
          </button>{" "}
        </>
      )}
    </main>
  );
};

export default Checkout;
``;
