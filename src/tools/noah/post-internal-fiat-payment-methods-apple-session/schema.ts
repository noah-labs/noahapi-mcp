import { z } from "zod";

export const postInternalFiatPaymentMethodsAppleSessionSchema = z.object({
  ValidationURL: z.string()
});

export type PostInternalFiatPaymentMethodsAppleSessionSchema = z.infer<typeof postInternalFiatPaymentMethodsAppleSessionSchema>;
