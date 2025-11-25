import type { ToolRegistration } from "@/types/tools";
import { type PostTransactionsSellSchema, postTransactionsSellSchema } from "./schema";

/**
 * Create Sell Transaction
 */
export const postTransactionsSell = async (args: PostTransactionsSellSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: POST
  // Path: /transactions/sell

  console.log('Noah API call:', { method: 'POST', path: '/transactions/sell', args });

  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "POST /transactions/sell",
    args
  });
};

export const postTransactionsSellTool: ToolRegistration<PostTransactionsSellSchema> = {
  name: "post_transactions_sell",
  description: "This endpoint initiates an immediate transaction to sell specified cryptocurrency and send the resulting fiat currency to a designated payout method. Use this endpoint to convert a crypto balance into fiat and send it to a beneficiary (e.g., bank transfer, card payout, wallet) with real-time execution, dynamic payout-form submission for payment methods, immediate balance updates, and end-to-end transaction tracking. Note: This endpoint is only available to customers created under the Reliance Model. Before you get started with this endpoint, Noah must have authorized your usage of the Reliance Model. For more details on this process, see the [Compliance Overview](../getting-started/kyc). When using the Standard Model, use the [Onchain Deposit to Fiat Payout](onchain-deposit-to-fiat-payout) endpoint. Follow the step-by-step guides:  [Direct Payout to US Business](../recipes/payout/global-payouts-business)  [Direct Payout to Individual Customer](../recipes/payout/global-payouts-individual)",
  inputSchema: postTransactionsSellSchema,
  handler: async (args: PostTransactionsSellSchema) => {
    try {
      const parsedArgs = postTransactionsSellSchema.parse(args);
      const result = await postTransactionsSell(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postTransactionsSellTool handler:", error);
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
