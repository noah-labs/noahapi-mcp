import { z } from "zod";

export const getTransactionsByIdSchema = z.object({
  TransactionID: z.string(),
});

export type GetTransactionsByIdSchema = z.infer<typeof getTransactionsByIdSchema>;
