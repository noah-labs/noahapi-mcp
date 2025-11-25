import { z } from "zod";

export const postWorkflowsBankDepositToOnchainAddressSchema = z.object({
  CustomerID: z.string(),
  FiatCurrency: z.string(),
  CryptoCurrency: z.string(),
  Network: z.string(),
  DestinationAddress: z
    .object({
      Address: z.string(),
    })
    .describe("The final destination address to which the crypto currency should be transferred."),
});

export type PostWorkflowsBankDepositToOnchainAddressSchema = z.infer<
  typeof postWorkflowsBankDepositToOnchainAddressSchema
>;
