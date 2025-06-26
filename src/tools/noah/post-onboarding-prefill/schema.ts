import { z } from "zod";

export const postOnboardingPrefillSchema = z.object({
  CustomerID: z.string(),

  SumSubToken: z.string().optional().describe("Sumsub token to share applicant."),
});

export type PostOnboardingPrefillSchema = z.infer<typeof postOnboardingPrefillSchema>;
