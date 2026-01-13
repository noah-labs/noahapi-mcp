import { z } from "zod";

export const getChannelsSellCountriesSchema = z.object({
  CustomerID: z.string().optional()
});

export type GetChannelsSellCountriesSchema = z.infer<typeof getChannelsSellCountriesSchema>;
