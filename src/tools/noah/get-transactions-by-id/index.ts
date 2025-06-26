import type { ToolRegistration } from "@/types/tools";
import { type GetTransactionsByIdSchema, getTransactionsByIdSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Get Transaction by ID
 */
export const getTransactionsById = async (args: GetTransactionsByIdSchema): Promise<string> => {
  try {
    const { TransactionID } = args;
    const endpoint = noahClient.replacePath('/transactions/{TransactionID}', { TransactionID });
    const response = await noahClient.get(endpoint);
    
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
      summary: `Successfully retrieved transaction ${TransactionID}`,
    }, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }, null, 2);
  }
};

export const getTransactionsByIdTool: ToolRegistration<GetTransactionsByIdSchema> = {
  name: "get_transactions_by_id",
  description: "Retrieve details of a specific transaction by its TransactionID.",
  inputSchema: getTransactionsByIdSchema,
  handler: async (args: GetTransactionsByIdSchema) => {
    try {
      const parsedArgs = getTransactionsByIdSchema.parse(args);
      const result = await getTransactionsById(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getTransactionsByIdTool handler:", error);
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