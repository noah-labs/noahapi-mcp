import { z } from "zod";

export const postBeta1RuleSchema = z.object({
  Trigger: z.unknown(),
  Actions: z.array(z.unknown()),
  Expiry: z.string().optional(),
  Permanent: z.boolean().optional().describe("If True, a rule can be executed repeatedly. Default is False."),
  Nonce: z.string(),
});

export type PostBeta1RuleSchema = z.infer<typeof postBeta1RuleSchema>;
