// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Voucher } from "@/models/models";
import connectMongoDB from "@/models/mongo";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { code } = req.query;
    if (!code) return res.status(200).json({});

    await connectMongoDB();
    const voucher = await Voucher.findOne({ code: code.toString() }).exec();

    res.status(200).json({ value: voucher?.value });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
