import { CryptoPay, Assets } from "@foile/crypto-pay-api";
import { createHash, createHmac } from "crypto";

const CRYPTO_PAY_API_KEY = process.env.CRYPTO_PAY_API_KEY;

export const checkSignature = (payload) => {
  const { body, headers } = payload;
  const secret = createHash("sha256").update(CRYPTO_PAY_API_KEY).digest();
  const checkString = JSON.stringify(body);
  const hmac = createHmac("sha256", secret).update(checkString).digest("hex");
  return hmac === headers["crypto-pay-api-signature"];
};
// console.log(checkSignature({ body: req.body, headers: req.headers }));

export const cryptoPay = new CryptoPay(CRYPTO_PAY_API_KEY);

export const createInvoice = async (amount, orderData) => {
  const invoice = await cryptoPay.createInvoice("USD", amount, {
    currency_type: "fiat",
    fiat: "USD",
    description: orderData.products.map((product) => product.name).join(", "),
    payload: orderData,
  });
  return invoice;
};

export async function getInvoice(invoice_id){
  return await cryptoPay.getInvoices({ invoice_ids: invoice_id });
}