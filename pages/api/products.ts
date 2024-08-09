// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Category, Product, SiteData } from "@/models/models";
import connectMongoDB from "@/models/mongo";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoDB();
    var categories = await Category.find({});
    var response: Array<any> = [];
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const products = await Product.find({ category: category._id.toString() })
      category.products = products;
      response.push(category);
    }
    const siteHeader = await SiteData.findOne({"_id": "header"}).exec();
    res.status(200).json({response, headerText: siteHeader?.value});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
