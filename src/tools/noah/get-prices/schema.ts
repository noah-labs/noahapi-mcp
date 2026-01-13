import { z } from "zod";

export const getPricesSchema = z.object({
  SourceCurrency: z.string().describe("The source currency to convert from."),
  DestinationCurrency: z.string().describe("The destination currency to convert to. (prod/sandbox):\n * BTC/BTC_TEST\n * USDC/USDC_TEST\n"),
  SourceAmount: z.string().optional().describe("Only one of \`SourceAmount\` or \`DestinationAmount\` can be defined. When this amount is specified, the response \`DestinationAmount\` field indicates how much you will get for this, after the deduction of any fees."),
  DestinationAmount: z.string().optional().describe("Only one of \`SourceAmount\` or \`DestinationAmount\` can be defined. When this amount is specified, the response \`SourceAmount\` field indicates how much you will need to sell to get this and cover any fees."),
  PaymentMethodCategory: z.string().optional(),
  Country: z.string().optional()
});

export type GetPricesSchema = z.infer<typeof getPricesSchema>;
