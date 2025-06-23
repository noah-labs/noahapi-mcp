import { z } from "zod";

export const getInternalPricesSchema = z.object({
  SourceCurrency: z.string(),
  DestinationCurrency: z.string(),
  SourceAmount: z.string().optional().describe("Only one of \`SourceAmount\` or \`DestinationAmount\` can be defined. When this amount is specified, the response \`DestinationAmount\` field indicates how much you will get for this, after the deduction of any fees."),
  DestinationAmount: z.string().optional().describe("Only one of \`SourceAmount\` or \`DestinationAmount\` can be defined. When this amount is specified, the response \`SourceAmount\` field indicates how much you will need to sell to get this and cover any fees."),
  PaymentMethodCategory: z.string().optional()
});

export type GetInternalPricesSchema = z.infer<typeof getInternalPricesSchema>;
