import { z } from "zod";

export const postWorkflowsOnchainDepositToPaymentMethodSchema = z.object({
  Trigger: z.unknown(),
  CustomerID: z.string(),
  CryptoCurrency: z.string(),
  FiatAmount: z.string().describe("Amount sent to customer's payment method."),
  FormSessionID: z.string(),
  ExternalID: z.string().optional()
});

export type PostWorkflowsOnchainDepositToPaymentMethodSchema = z.infer<typeof postWorkflowsOnchainDepositToPaymentMethodSchema>;
