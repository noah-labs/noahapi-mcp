import { z } from "zod";

export const getPaymentMethodsSchema = z.object({
  CustomerID: z.string(),
  PageSize: z.number().optional(),
  PageToken: z.string().optional(),
  Capability: z.enum(["PayoutFrom", "PayinTo", "PayoutTo"]).optional().describe("Filter payment methods by capability")
});

export type GetPaymentMethodsSchema = z.infer<typeof getPaymentMethodsSchema>;
