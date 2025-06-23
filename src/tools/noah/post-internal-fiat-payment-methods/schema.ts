import { z } from "zod";

export const postInternalFiatPaymentMethodsSchema = z.object({
  PaymentMethodType: z.enum(["BankAch", "BankFedwire", "BankLocal", "BankSepa", "BankSortCode", "BankSwift", "IdentifierMobileMoney", "IdentifierPix", "TokenizedCard"]),
  Details: z.unknown()
});

export type PostInternalFiatPaymentMethodsSchema = z.infer<typeof postInternalFiatPaymentMethodsSchema>;
