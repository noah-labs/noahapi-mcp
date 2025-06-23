import { z } from "zod";

export const putInternalCustomersOnboardingSchema = z.object({
  Email: z.string().optional().describe("Customer's email address."),
  Consent: z.boolean().optional().describe("Whether the customer has agreed for the terms and conditions")
});

export type PutInternalCustomersOnboardingSchema = z.infer<typeof putInternalCustomersOnboardingSchema>;
