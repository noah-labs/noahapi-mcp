import { z } from "zod";

export const getChannelsFormSchema = z.object({
  ChannelID: z.string(),
  CustomerID: z.string().optional(),
  PaymentMethodID: z.string().optional(),
});

export type GetChannelsFormSchema = z.infer<typeof getChannelsFormSchema>;
