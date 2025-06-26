import { z } from "zod";

export const postCheckoutManageSchema = z.object({
  CustomerID: z.string(),
  Customer: z.record(z.unknown()).optional(),
});

export type PostCheckoutManageSchema = z.infer<typeof postCheckoutManageSchema>;
