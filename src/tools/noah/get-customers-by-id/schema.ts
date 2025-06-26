import { z } from "zod";

export const getCustomersByIdSchema = z.object({
  CustomerID: z.string()
});

export type GetCustomersByIdSchema = z.infer<typeof getCustomersByIdSchema>;