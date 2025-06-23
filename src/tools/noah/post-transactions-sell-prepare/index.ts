import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostTransactionsSellPrepareSchema, postTransactionsSellPrepareSchema } from "./schema";

/**
 * Prepare Sell Transaction
 */
export const postTransactionsSellPrepare = async (args: PostTransactionsSellPrepareSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/transactions/sell/prepare', args);
  
  return JSON.stringify(result, null, 2);
};

export const postTransactionsSellPrepareTool: ToolRegistration<PostTransactionsSellPrepareSchema> = {
  name: "post_transactions_sell_prepare",
  description: "Calculates the inputs required for the Sell endpoint, intended to be used as a preliminary step for validating transaction details before execution. This allows the business to review estimated fees and limits prior to initiating the actual sell transaction.",
  inputSchema: postTransactionsSellPrepareSchema,
  handler: async (args: PostTransactionsSellPrepareSchema) => {
    try {
      const parsedArgs = postTransactionsSellPrepareSchema.parse(args);
      const result = await postTransactionsSellPrepare(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postTransactionsSellPrepareTool handler:", error);
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
