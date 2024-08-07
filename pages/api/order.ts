// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Order, Product } from "@/models/models";
import connectMongoDB from "@/models/mongo";
import { createInvoice } from "@/lib/pay";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { products, user, shipping_address, email } = req.body;
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

    
    // Create the order with the fetched products
    // const order = new Order({ user, products: orderedProducts, shipping_address, total, email, status: "created" });
    // await order.save();

    // Create payment link
    const paymentLink = await createInvoice(total, { user, products: orderedProducts, shipping_address, email});

    res.status(200).json({"order": "success", "paymentLink": paymentLink});
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

