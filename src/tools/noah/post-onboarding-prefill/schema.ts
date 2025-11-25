import { z } from "zod";

export const postOnboardingPrefillSchema = z.object({

  CustomerID: z.string()
,
.unknown(
});

export type PostOnboardingPrefillSchema = z.infer<typeof postOnboardingPrefillSchema>;
