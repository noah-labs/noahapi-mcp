import { z } from "zod";

export const putCustomersSchema = z.object({

  CustomerID: z.string()
,
.unknown(
});

export type PutCustomersSchema = z.infer<typeof putCustomersSchema>;
