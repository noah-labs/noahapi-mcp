import { z } from "zod";

export const postTransactionsSellSchema = z.object({
  CryptoCurrency: z.string().describe("Cryptocurrency to sell."),
  FiatAmount: z.string().describe("Amount sent to customer's payment method."),
  CryptoAuthorizedAmount: z.string().describe("Maximum amount that can be charged for this transaction."),
  FormSessionID: z.string(),
  Nonce: z.string(),
  ExternalID: z.string().optional()
});

export type PostTransactionsSellSchema = z.infer<typeof postTransactionsSellSchema>;
