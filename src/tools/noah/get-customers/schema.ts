import { z } from "zod";

export const getCustomersSchema = z.object({
  CustomerID: z.string(),
});

export type GetCustomersSchema = z.infer<typeof getCustomersSchema>;
