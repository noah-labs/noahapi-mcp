import { z } from "zod";

export const deleteInternalFiatPaymentMethodsSchema = z.object({
  ID: z.string()
});

export type DeleteInternalFiatPaymentMethodsSchema = z.infer<typeof deleteInternalFiatPaymentMethodsSchema>;
