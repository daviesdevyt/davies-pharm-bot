// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Order, Product } from "@/models/models";
import connectMongoDB from "@/models/mongo";
import { createInvoice } from "@/lib/pay";
import { sendMessage } from "@/lib/bot";
import { Voucher } from "@/models/models";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { products, user, shipping_address, email, voucher } = req.body;
    await connectMongoDB();

    const productIds = products.map((product: any) => product._id);
    const fetchedProducts = await Product.find({ _id: { $in: productIds } });

    let orderedProducts: { name: string; price: any; quantity: number }[] = [];
    let total = 0;
    fetchedProducts.forEach((product: any) => {
      const p = products.find((p: any) => p._id === product._id.toString());
      const productQuantity = p.quantity;
      orderedProducts.push({ name: product.name, price: product.price, quantity: productQuantity });
      total += product.price * productQuantity;
    });

    // Create payment link
    if (voucher) {
      var v = await Voucher.findOne({ code: voucher }).exec();
    }
    const voucherValue = v?.value || 0;

    const invoice = await createInvoice(total - voucherValue, { user, products: orderedProducts, shipping_address, email, voucher });

    // Create the order with the fetched products
    const order = new Order({
      user,
      products: orderedProducts,
      shipping_address,
      total,
      email,
      status: "created",
      invoice_id: invoice.invoice_id,
      voucher,
    });
    await order.save();

    const inlineKeyboard = {
      inline_keyboard: [
        [
          {
            text: "Pay",
            url: invoice.pay_url,
          },
        ],
      ],
    };
    sendMessage(user, `Click to <a href="${invoice.pay_url}">Here</a> to pay`, { parse_mode: "HTML", reply_markup: inlineKeyboard });
    res.status(200).json({ order: "success" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
