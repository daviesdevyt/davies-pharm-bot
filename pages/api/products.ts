// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Category, Product } from "@/models/models";
import connectMongoDB from "@/models/mongo";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoDB();
    const products = await Category.find({}).populate('products').exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
