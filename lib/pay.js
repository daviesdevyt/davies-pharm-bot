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

export const cryptoPay = new CryptoPay(CRYPTO_PAY_API_KEY, {
  hostname: 'testnet-pay.crypt.bot',
  protocol: 'https'
});

export const createInvoice = async (amount, orderData) => {
  const invoice = await cryptoPay.createInvoice(Assets.BTC, amount, {
    description: orderData.products.map((product) => product.name).join(", "),
    payload: orderData,
  });
  return invoice.pay_url;
};
