import { z } from "zod";

export const postInternalCustomersOnboardingSchema = z.object({
  Form: z.record(z.unknown())
});

export type PostInternalCustomersOnboardingSchema = z.infer<typeof postInternalCustomersOnboardingSchema>;
