import { z } from "zod";

export const getChannelsByIdSchema = z.object({
  ChannelID: z.string().describe("The ID of the channel to retrieve"),
  CryptoCurrency: z.string().describe("Cryptocurrency (prod/sandbox):\n * BTC/BTC_TEST\n * USDC/USDC_TEST\n"),
  FiatAmount: z.string().optional().describe("The fiat amount for which to calculate channel details and fees"),
  CustomerID: z.string().optional().describe("Customer ID for personalized channel information and payment methods")
});

export type GetChannelsByIdSchema = z.infer<typeof getChannelsByIdSchema>;
