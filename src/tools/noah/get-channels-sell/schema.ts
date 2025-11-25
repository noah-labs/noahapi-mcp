import { z } from "zod";

export const getChannelsSellSchema = z.object({
  Country: z.string().optional(),
  CryptoCurrency: z.string().describe("Cryptocurrency (prod/sandbox):\n * BTC/BTC_TEST\n * USDC/USDC_TEST\n"),
  FiatCurrency: z.string().optional().describe("Supported fiat ISO_4217 3 letter currency codes."),
  FiatAmount: z.string().optional(),
  CustomerID: z.string().optional(),
  PaymentMethodID: z.string().optional(),
  PageSize: z.number().optional(),
  PageToken: z.string().optional()
});

export type GetChannelsSellSchema = z.infer<typeof getChannelsSellSchema>;
