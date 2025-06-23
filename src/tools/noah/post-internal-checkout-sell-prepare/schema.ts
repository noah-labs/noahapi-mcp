import { z } from "zod";

export const postInternalCheckoutSellPrepareSchema = z.object({
  ChannelID: z.string(),
  PaymentMethodID: z.string().optional(),
  CryptoCurrency: z.string().describe("Crypto currency to sell."),
  FiatAmount: z.string().describe("Amount sent to customer's payment method."),
  Form: z.record(z.unknown()).optional()
});

export type PostInternalCheckoutSellPrepareSchema = z.infer<typeof postInternalCheckoutSellPrepareSchema>;
