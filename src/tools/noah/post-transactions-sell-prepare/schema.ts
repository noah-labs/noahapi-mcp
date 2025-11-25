import { z } from "zod";

export const postTransactionsSellPrepareSchema = z.object({
  ChannelID: z.string(),
  PaymentMethodID: z.string().optional(),
  CryptoCurrency: z.string().describe("Cryptocurrency to sell."),
  CustomerID: z.string().optional(),
  FiatAmount: z.string().describe("Amount sent to customer's payment method."),
  Form: z.record(z.unknown()).optional(),
  DelayedSell: z
    .boolean()
    .optional()
    .describe(
      "When enabled, balance checks are deferred until the final sell request, allowing the order to be prepared now and executed later.",
    ),
});

export type PostTransactionsSellPrepareSchema = z.infer<typeof postTransactionsSellPrepareSchema>;
