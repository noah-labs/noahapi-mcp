import { z } from "zod";

export const postHelpByIdSchema = z.object({

  CustomerID: z.string()
,

  ReturnURL: z.string()

});

export type PostHelpByIdSchema = z.infer<typeof postHelpByIdSchema>;
