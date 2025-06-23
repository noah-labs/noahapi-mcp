import { z } from "zod";

export const getInternalCustomersOnboardingSchema = z.object({});

export type GetInternalCustomersOnboardingSchema = z.infer<typeof getInternalCustomersOnboardingSchema>;
