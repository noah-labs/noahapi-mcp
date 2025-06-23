import { z } from "zod";

export const getInternalCheckoutSchema = z.object({});

export type GetInternalCheckoutSchema = z.infer<typeof getInternalCheckoutSchema>;
