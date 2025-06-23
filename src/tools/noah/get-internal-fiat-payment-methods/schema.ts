import { z } from "zod";

export const getInternalFiatPaymentMethodsSchema = z.object({
  PageSize: z.number().optional(),
  PageToken: z.string().optional()
});

export type GetInternalFiatPaymentMethodsSchema = z.infer<typeof getInternalFiatPaymentMethodsSchema>;
