import { z } from "zod";

export const postInternalCheckoutSellSchema = z.object({
  FormSessionID: z.string()
});

export type PostInternalCheckoutSellSchema = z.infer<typeof postInternalCheckoutSellSchema>;
