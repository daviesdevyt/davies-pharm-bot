// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Order, Product } from "@/models/models";
import connectMongoDB from "@/models/mongo";
import { cryptoPay, checkSignature } from "@/lib/pay";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(req.body, req.headers);
    const verified = checkSignature({ body: req.body, headers: req.headers });
    console.log(verified);
    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
}
