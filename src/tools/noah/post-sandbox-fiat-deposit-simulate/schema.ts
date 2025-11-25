import { z } from "zod";

export const postSandboxFiatDepositSimulateSchema = z.object({
  PaymentMethodID: z.string(),
  FiatAmount: z.string().describe("The amount of the deposit."),
  FiatCurrency: z.string(),
});

export type PostSandboxFiatDepositSimulateSchema = z.infer<typeof postSandboxFiatDepositSimulateSchema>;
