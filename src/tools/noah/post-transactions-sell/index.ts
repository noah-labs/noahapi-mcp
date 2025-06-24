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
  description: "Initiate a transaction to sell the specified cryptocurrency and send the requested fiat currency to the specified payout method. Allows for sending form data to submit a payment method.",
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
