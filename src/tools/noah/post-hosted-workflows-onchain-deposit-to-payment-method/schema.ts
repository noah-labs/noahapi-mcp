import { z } from "zod";

export const postHostedWorkflowsOnchainDepositToPaymentMethodSchema = z.object({
  CustomerID: z.string(),
  ReturnURL: z.string(),
  ChannelID: z.string(),
  FiatAmount: z.string().optional().describe("Amount sent to customer's payment method."),
  Network: z.string(),
  CryptoCurrency: z.string(),
  ExternalID: z.string().optional(),
  Metadata: z.record(z.string(), z.unknown()).optional().describe("Custom user defined key value pairs used for storing additional information.")
});

export type PostHostedWorkflowsOnchainDepositToPaymentMethodSchema = z.infer<typeof postHostedWorkflowsOnchainDepositToPaymentMethodSchema>;
