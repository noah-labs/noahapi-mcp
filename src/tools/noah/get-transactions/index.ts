import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type GetTransactionsSchema, getTransactionsSchema } from "./schema";

/**
 * Transaction by ID
 */
export const getTransactions = async (args: GetTransactionsSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.get('/transactions/{TransactionID}');
  
  return JSON.stringify(result, null, 2);
};

export const getTransactionsTool: ToolRegistration<GetTransactionsSchema> = {
  name: "get_transactions",
  description: "Retrieve the details of a single transaction by TransactionID.",
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
