import { z } from "zod";

export const getPaymentMethodsSchema = z.object({
  CustomerID: z.string(),
  PageSize: z.number().optional(),
  PageToken: z.string().optional()
});

export type GetPaymentMethodsSchema = z.infer<typeof getPaymentMethodsSchema>;
