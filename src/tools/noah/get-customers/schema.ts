import { z } from "zod";

export const getCustomersSchema = z.object({
  PageSize: z.number().optional(),
  PageToken: z.string().optional(),
  SortDirection: z.enum(["ASC", "DESC"]).optional(),
});

export type GetCustomersSchema = z.infer<typeof getCustomersSchema>;
