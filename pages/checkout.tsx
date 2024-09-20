"use client";
import { format } from "@/constants/drugs";
import { usePayment } from "@/hooks/usePayment";
import { useProductsStore } from "@/store/useProducts";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

const Checkout = () => {
  const { product, removeProduct, increment, decrement } = useProductsStore();
  const { mutate } = usePayment();
  const [shipping_address, setShippingAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [voucher, setVoucher] = useState<string>("");
  const [isLoadingVoucher, setLoadingVoucher] = useState<boolean>(false);
  const [checkoutDisabled, setCheckoutDisabled] = useState<boolean>(false);
  const voucherText = useRef<HTMLParagraphElement>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [hydrated, setHydrated] = useState(false);

  // const [edit, setEdit] = useState<boolean>(true);

  // const [shippingDetails, setShippingDetails] = useState({
  //   country: "Nile",
  //   house:
  //     "Plot 681, Cadastral Zone C, OO, Research & Institution Area,Airport Road, Jabi",
  //   phone: "+2349073210998",
  // });

  useEffect(() => {
    setHydrated(true);
  }, []);

  function setVoucherInput(e: any) {
    setVoucher(e.target.value)
    axios.get(`/api/voucher?code=${e.target.value}`)
      .then(({ data }) => {
        if (voucherText.current) {
          if (data.value) {
            voucherText.current.innerHTML = `<p class="text-sm text-green-500">$${data.value} Discount code applied</p>`;
            setDiscount(data.value);
          }
          else {
            voucherText.current.innerHTML = `<p class="text-sm text-red-500">Discount code not found</p>`;
            setDiscount(0);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching voucher:", error);
      }).finally(() => {
        setLoadingVoucher(false);
      });
  }

  if (!hydrated) {
    return null; // or a loading indicator
  }
  //   const getTotal = (products: {price: number}[]) => {
  //     products.reduce((accumulator, item) => (accumulator + item.price) )
  //   }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setShippingDetails((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

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
              className="flex items-start justify-between rounded-[20px] bg-[#0e1621ff] p-[10px]"
              key={i}
            >
              <div className="flex space-x-3 w-full">
                <img
                  src={items.image}
                  className=" h-[45px] w-[80px] object-contain"
                  alt="Image"
                />
                <div className="w-full space-y-2">
                  <div className="flex justify-between">
                    <h1 className="font-medium ">{items.name}</h1>
                    <img
                      className="cursor-pointer"
                      src="/assets/images/close.svg"
                      alt="remove item"
                      onClick={() => {
                        removeProduct(items.id);
                        toast.success("Item removed");
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <h2 className="text-[15px] font-bold text-white">
                      ${format(items.price)}
                    </h2>
                    <div className="space-x-4 flex items-center">
                      <span
                        className="cursor-pointer text-3xl"
                        onClick={() => decrement(items.id)}
                      >
                        -
                      </span>
                      <p>{items.quantity}</p>
                      <span
                        className="cursor-pointer text-3xl"
                        onClick={() => increment(items.id)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
            <div className="flex items-center space-x-3 rounded-[20px] bg-[#0e1621ff] p-[10px]">
              <div className="h-fit cursor-pointer rounded-full border border-white p-1">
                <div className="size-2 rounded-full bg-white" />
              </div>
              <div className="flex items-center justify-center rounded-lg bg-white p-4">
                <img src="/assets/images/wallet.svg" alt="Image" />
              </div>
              <h1 className="text-[17px]">Crypto</h1>
            </div>
          </section>
          <section className="space-y-2">
            <header className="flex items-center justify-between">
              <h1 className="text-[18px] font-bold">Shipping Address</h1>
              {/* <p
                className="text-white cursor-pointer"
                onClick={() => setEdit(!edit)}
              >
                {!edit ? "save" : "change"}
              </p> */}
            </header>
            <div className="flex flex-col space-y-2 rounded-[20px] bg-[#0e1621ff] p-[15px]">
              <textarea
                className="bg-transparent outline-none resize-none text-sm placeholder:text-white"
                name=""
                id=""
                placeholder="Enter your address"
                value={shipping_address}
                onChange={(e) => setShippingAddress(e.target.value)}
              // cols="30"
              // rows="10"
              ></textarea>
              {/* <input
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
              /> */}
            </div>
          </section>
          <section className="space-y-2">
            <h1>Email</h1>
            <input
              className="w-full rounded-lg bg-[#0e1621ff] p-3 text-sm outline-none placeholder:text-white"
              type="email"
              placeholder="Enter your contact email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </section>
          <section className="space-y-2">
            <h1>Discount Voucher</h1>
            <input
              className="w-full rounded-lg bg-[#0e1621ff] p-3 text-sm outline-none placeholder:text-white"
              type="text"
              placeholder="e.g 10OFF1234 (optional)"
              onChange={setVoucherInput}
            />
            <div ref={voucherText}>
            </div>
          </section>
          <section className="flex justify-between">
            <p className="text-[17px]">Total</p>
            <h1 className="font-medium">
              $
              {product.reduce(
                (accumulator, item) => accumulator + item.price * item.quantity,
                0
              ) - discount}
            </h1>
            {window?.Telegram?.WebApp?.initDataUnsafe?.user?.id}
          </section>
          <button
            disabled={checkoutDisabled}
            className="w-full rounded-[30px] bg-white px-[70px] py-[19px] text-[17px] text-black"
            onClick={() => {
              if (shipping_address !== "" && email !== "" && !isLoadingVoucher) {
                mutate(
                  {
                    user: window?.Telegram?.WebApp?.initDataUnsafe?.user?.id.toString(),
                    products: product.map((item) => ({
                      _id: item.id,
                      quantity: item.quantity,
                    })),
                    shipping_address,
                    email, voucher
                  },
                  {
                    onSuccess: (response) => {
                      toast.success("Invoice sent to your chat");
                      setCheckoutDisabled(true);
                      window.Telegram.WebApp.close()
                    },
                    onError: (error) => {
                      toast.error(
                        "Invoice generation failed. Please try again."
                      );
                    },
                  }
                );
              } else {
                toast.error("Please enter an address and email");
              }
            }}
          >
            Proceed to payment
          </button>{" "}
        </>
      )}
    </main>
  );
};

export default Checkout;
