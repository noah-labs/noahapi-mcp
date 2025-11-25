import { z } from "zod";

export const postWorkflowsOnchainDepositToPaymentMethodSchema = z.object({
  Trigger: z.union([
    z.object({
      Type: z.enum(["SingleOnchainDepositSourceTriggerInput"]),
      Conditions: z
        .array(
          z.object({
            AmountConditions: z
              .array(
                z.object({
                  ComparisonOperator: z.enum(["EQ", "LTEQ", "GTEQ"]),
                  Value: z.string(),
                }),
              )
              .describe("Amount conditions for the rule."),
            Network: z
              .string()
              .describe(
                "Account-based network (prod/sandbox):\n * Celo/CeloTestSepolia\n * Ethereum/EthereumTestSepolia\n * FlowEvm/FlowEvmTest\n * Gnosis/GnosisTestChiado\n * PolygonPos/PolygonTestAmoy\n * Solana/SolanaDevnet",
              ),
          }),
        )
        .describe("Conditions that trigger the rule."),
      SourceAddress: z.string().describe("Address in depositor's custody from which the deposit was made."),
      Expiry: z.string(),
      Nonce: z.string(),
    }),
  ]),
  CustomerID: z.string(),
  CryptoCurrency: z.string(),
  FiatAmount: z.string().describe("Amount sent to customer's payment method."),
  FormSessionID: z.string(),
  ExternalID: z.string().optional(),
});

export type PostWorkflowsOnchainDepositToPaymentMethodSchema = z.infer<
  typeof postWorkflowsOnchainDepositToPaymentMethodSchema
>;
