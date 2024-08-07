// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "@/models/models";
import connectMongoDB from "@/models/mongo";
import { checkSignature } from "@/lib/pay";
import { sendMessage } from "@/lib/bot";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const verified = checkSignature({ body: req.body, headers: req.headers });
    if (!verified) return res.status(403).json({ error: "Invalid signature" });

    if (req.body.update_type !== "invoice_paid") return res.status(400).json({ error: "Invalid signature" });;

    const { payload } = req.body;

    if (payload.status == "paid") {
      connectMongoDB();
      const order = await Order.findOneAndUpdate({ invoice_id: payload.invoice_id, status: "created" }, { status: payload.status }).exec();
      let text = `Payment received for your order\n`;
      for (const product of order.products) {
        text += `\n<b>${product.name}</b> x ${product.quantity}`;
      }
      text += `\nShipping address: <b>${order.shipping_address}</b>\nEmail: ${order.email}\n\nTotal: <b>$${order.total}</b>`;
      sendMessage(order.user, text, { parse_mode: "HTML" });
    }

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
}
