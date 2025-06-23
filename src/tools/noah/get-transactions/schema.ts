import { z } from "zod";

export const getTransactionsSchema = z.object({
  TransactionID: z.string()
});

export type GetTransactionsSchema = z.infer<typeof getTransactionsSchema>;
