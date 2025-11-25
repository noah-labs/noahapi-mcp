import type { ToolRegistration } from "@/types/tools";
import { type PostWorkflowsOnchainDepositToPaymentMethodSchema, postWorkflowsOnchainDepositToPaymentMethodSchema } from "./schema";

/**
 * Onchain Deposit to Fiat Payout
 */
export const postWorkflowsOnchainDepositToPaymentMethod = async (args: PostWorkflowsOnchainDepositToPaymentMethodSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: POST
  // Path: /workflows/onchain-deposit-to-payment-method

  console.log('Noah API call:', { method: 'POST', path: '/workflows/onchain-deposit-to-payment-method', args });

  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "POST /workflows/onchain-deposit-to-payment-method",
    args
  });
};

export const postWorkflowsOnchainDepositToPaymentMethodTool: ToolRegistration<PostWorkflowsOnchainDepositToPaymentMethodSchema> = {
  name: "post_workflows_onchain_deposit_to_payment_method",
  description: "This endpoint establishes an automated workflow that converts incoming cryptocurrency deposits into fiat currency payouts. The solution requires configuration of source cryptocurrency, a FormSessionID for payout instructions, recipient payment method details, and conversion parameters, with deposited amounts traded for the specified fiat currency at current market prices after application of fees. The customer must already exist before using this endpoint. Notes:  On-chain operations are irreversible, and market prices may fluctuate significantly, impacting the final payout amount.  Although this workflow should continue working with the original FormSession, Noah cannot guarantee FormSession longevity. For this reason, generate a new FormSession each time you present the customer with the onchain deposit address.  If the customer reuses the onchain address after the FormSession becomes invalid, the transfer will fail but funds will not be lost.",
  inputSchema: postWorkflowsOnchainDepositToPaymentMethodSchema,
  handler: async (args: PostWorkflowsOnchainDepositToPaymentMethodSchema) => {
    try {
      const parsedArgs = postWorkflowsOnchainDepositToPaymentMethodSchema.parse(args);
      const result = await postWorkflowsOnchainDepositToPaymentMethod(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postWorkflowsOnchainDepositToPaymentMethodTool handler:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${(error as Error).message}`,
          },
        ],
        isError: true,
      };
    }
  },
};
