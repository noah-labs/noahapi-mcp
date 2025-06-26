import type { ToolRegistration } from "@/types/tools";
import { type PostTransactionsSellSchema, postTransactionsSellSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Create Sell Transaction
 */
export const postTransactionsSell = async (args: PostTransactionsSellSchema): Promise<string> => {
  try {
    const response = await noahClient.post('/transactions/sell', args);
    
    if (response.error) {
      return JSON.stringify({
        error: true,
        message: response.error.message,
        details: response.error.details,
      }, null, 2);
    }

    return JSON.stringify({
      success: true,
      data: response.data,
      summary: `Successfully created sell transaction for ${args.CryptoCurrency}`,
    }, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }, null, 2);
  }
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
