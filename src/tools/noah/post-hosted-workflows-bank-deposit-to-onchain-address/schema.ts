import { z } from "zod";

export const postHostedWorkflowsBankDepositToOnchainAddressSchema = z.object({
  CustomerID: z.string(),
  ReturnURL: z.string(),
  CryptoCurrency: z.string().optional(),
  Network: z.string().optional(),
  DestinationAddress: z.object({
  Address: z.string()
}),
  FiatOptions: z.array(z.object({
  FiatCurrencyCode: z.string()
})).describe("List of fiat options to be supported by the customer."),
  CryptoOptions: z.array(z.object({
  CryptoCurrency: z.string(),
  Network: z.string()
})).optional().describe("List of cryptocurrency-network pair options for the customer to choose from. The system will try each option in order until one succeeds. If not provided, CryptoCurrency and Network must be specified."),
  Metadata: z.record(z.string(), z.unknown()).optional().describe("Custom user defined key value pairs used for storing additional information.")
});

export type PostHostedWorkflowsBankDepositToOnchainAddressSchema = z.infer<typeof postHostedWorkflowsBankDepositToOnchainAddressSchema>;
