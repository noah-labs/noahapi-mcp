import { z } from "zod";

export const getChannelsSellCountriesSchema = z.object({
  random_string: z.string().describe("Dummy parameter for no-parameter tools")
});

export type GetChannelsSellCountriesSchema = z.infer<typeof getChannelsSellCountriesSchema>;
