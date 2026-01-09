import { z } from "zod";

export const getTransactionsSchema = z.object({
  PageSize: z.number().optional(),
  PageToken: z.string().optional(),
  SortDirection: z.enum(["ASC", "DESC"]).optional(),
});

export type GetTransactionsSchema = z.infer<typeof getTransactionsSchema>;
