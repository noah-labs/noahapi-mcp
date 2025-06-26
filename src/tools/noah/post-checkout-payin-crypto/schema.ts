import { z } from "zod";

export const postCheckoutPayinCryptoSchema = z.object({
  CryptoCurrency: z.string(),
  CryptoAmount: z.string(),
  ReturnURL: z.string(),
  ExternalID: z.string().optional(),
  CustomerID: z.string().describe("Identifies the customer in user's system"),
  Customer: z.record(z.unknown()).optional(),
  LineItems: z
    .array(
      z.object({
        Description: z.string().describe("Description of the line item."),
        Quantity: z.string().describe("Quantity of the line item. Must be greater than zero."),
        UnitAmount: z
          .string()
          .describe("Amount of a single unit of the line item. Must be in the same currency as the transaction."),
        TotalAmount: z
          .string()
          .describe(
            "Total amount of the line item (UnitAmount * Quantity). Must be in the same currency as the transaction.",
          ),
      }),
    )
    .describe(
      "List of line items that your customer is purchasing using this Hosted Checkout Session. This is used for display purposes for the customer during Checkout as well as remediation of disputed payments. We do not make any calculations using this data.",
    ),
  Nonce: z.string(),
});

export type PostCheckoutPayinCryptoSchema = z.infer<typeof postCheckoutPayinCryptoSchema>;
