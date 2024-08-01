// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Order, Product } from "@/models/models";
import connectMongoDB from "@/models/mongo";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { products, user } = req.body;
    await connectMongoDB();

    const productIds = products.map((product: any) => product._id);
    const fetchedProducts = await Product.find({ _id: { $in: productIds } });

    let total = 0
    fetchedProducts.forEach((product: any) => {
      const productQuantity = products.find((p: any) => p._id === product._id).quantity;
      total += product.price * productQuantity;
    });
    
    // Create the order with the fetched products
    const order = new Order({ user, products: fetchedProducts, total });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
