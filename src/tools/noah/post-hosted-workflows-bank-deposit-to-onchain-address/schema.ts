import { z } from "zod";

export const postHostedWorkflowsBankDepositToOnchainAddressSchema = z.object({
  CustomerID: z.string(),
  ReturnURL: z.string(),
  CryptoCurrency: z.string(),
  Network: z.string(),
  DestinationAddress: z.object({
  Address: z.string()
}),
  FiatOptions: z.array(z.object({
  FiatCurrencyCode: z.string()
})).describe("List of fiat options to be supported by the customer."),
  Metadata: z.record(z.unknown()).optional().describe("Custom user defined key value pairs used for storing additional information.")
});

export type PostHostedWorkflowsBankDepositToOnchainAddressSchema = z.infer<typeof postHostedWorkflowsBankDepositToOnchainAddressSchema>;
