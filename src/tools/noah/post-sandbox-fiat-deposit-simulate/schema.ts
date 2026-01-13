import { z } from "zod";

export const postSandboxFiatDepositSimulateSchema = z.object({
  PaymentMethodID: z.string(),
  FiatAmount: z.string().describe("The amount of the deposit."),
  FiatCurrency: z.string(),
  Reference: z.string().optional().describe("Optional reference of the deposit for testing purposes.")
});

export type PostSandboxFiatDepositSimulateSchema = z.infer<typeof postSandboxFiatDepositSimulateSchema>;
