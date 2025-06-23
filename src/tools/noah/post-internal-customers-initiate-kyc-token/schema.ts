import { z } from "zod";

export const postInternalCustomersInitiateKycTokenSchema = z.object({
  Email: z.string().describe("Customer's email address.")
});

export type PostInternalCustomersInitiateKycTokenSchema = z.infer<typeof postInternalCustomersInitiateKycTokenSchema>;
