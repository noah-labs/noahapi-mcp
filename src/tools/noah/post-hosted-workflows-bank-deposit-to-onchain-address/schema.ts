import { z } from "zod";

export const postHostedWorkflowsBankDepositToOnchainAddressSchema = z.object({
  CustomerID: z.string(),
  ReturnURL: z.string(),
  CryptoCurrency: z.string().optional().describe("Deprecated: Use UI.CryptoOptions instead. Will be removed in a future version."),
  Network: z.string().optional().describe("Deprecated: Use UI.CryptoOptions instead. Will be removed in a future version."),
  DestinationAddress: z.object({
  Address: z.string()
}),
  FiatOptions: z.array(z.object({
  FiatCurrencyCode: z.string()
})).describe("List of fiat options to be supported by the customer."),
  UI: z.object({
  CryptoOptions: z.array(z.object({
  CryptoCurrency: z.string(),
  Network: z.string()
})).describe("List of cryptocurrency-network pair options for the customer to choose from. The system will try each option in order until one succeeds."),
  CryptoOptionsConfig: z.object({
  AutoSelect: z.enum(["Order"]).optional()
}).optional()
}).optional(),
  Metadata: z.record(z.string(), z.unknown()).optional().describe("Custom user defined key value pairs used for storing additional information.")
});

export type PostHostedWorkflowsBankDepositToOnchainAddressSchema = z.infer<typeof postHostedWorkflowsBankDepositToOnchainAddressSchema>;
