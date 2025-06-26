import type { ToolRegistration } from "@/types/tools";
import { type PostTransactionsSellPrepareSchema, postTransactionsSellPrepareSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Prepare Sell Transaction
 */
export const postTransactionsSellPrepare = async (args: PostTransactionsSellPrepareSchema): Promise<string> => {
  try {
    const response = await noahClient.post('/transactions/sell/prepare', args);
    
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
      summary: `Successfully prepared sell transaction`,
    }, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }, null, 2);
  }
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
