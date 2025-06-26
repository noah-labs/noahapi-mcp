import { z } from "zod";

export const putCustomersSchema = z.object({
  CustomerID: z.string(),
  body: z.record(z.unknown()),
});

export type PutCustomersSchema = z.infer<typeof putCustomersSchema>;
