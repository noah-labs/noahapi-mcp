import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostTransactionsSellSchema, postTransactionsSellSchema } from "./schema";

/**
 * Create Sell Transaction
 */
export const postTransactionsSell = async (args: PostTransactionsSellSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/transactions/sell', args);
  
  return JSON.stringify(result, null, 2);
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
