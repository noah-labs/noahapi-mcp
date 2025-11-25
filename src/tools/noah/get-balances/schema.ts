import { z } from "zod";

export const getBalancesSchema = z.object({
  PageSize: z.number().optional(),
  PageToken: z.string().optional(),
});

export type GetBalancesSchema = z.infer<typeof getBalancesSchema>;
