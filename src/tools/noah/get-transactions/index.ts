import type { ToolRegistration } from "@/types/tools";
import { type GetTransactionsSchema, getTransactionsSchema } from "./schema";

/**
 * Transaction by ID
 */
export const getTransactions = async (args: GetTransactionsSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: GET
  // Path: /transactions/{TransactionID}

  console.log('Noah API call:', { method: 'GET', path: '/transactions/{TransactionID}', args });

  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "GET /transactions/{TransactionID}",
    args
  });
};

export const getTransactionsTool: ToolRegistration<GetTransactionsSchema> = {
  name: "get_transactions",
  description: "This endpoint retrieves the details of a single transaction by TransactionID.",
  inputSchema: getTransactionsSchema,
  handler: async (args: GetTransactionsSchema) => {
    try {
      const parsedArgs = getTransactionsSchema.parse(args);
      const result = await getTransactions(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getTransactionsTool handler:", error);
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
