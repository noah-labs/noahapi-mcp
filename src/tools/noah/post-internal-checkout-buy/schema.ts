import { z } from "zod";

export const postInternalCheckoutBuySchema = z.object({
  PaymentMethod: z.object({
  Input: z.object({
  PaymentMethodType: z.enum(["BankAch", "BankFedwire", "BankLocal", "BankSepa", "BankSortCode", "BankSwift", "IdentifierMobileMoney", "IdentifierPix", "TokenizedCard"]),
  Details: z.unknown()
}).optional(),
  ID: z.string().optional()
})
});

export type PostInternalCheckoutBuySchema = z.infer<typeof postInternalCheckoutBuySchema>;
