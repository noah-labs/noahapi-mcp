import type { ToolRegistration } from "@/types/tools";
import { type GetTransactionsSchema, getTransactionsSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Transaction by ID
 */
export const getTransactions = async (args: GetTransactionsSchema): Promise<string> => {
  try {
    const { TransactionID } = args;
    const endpoint = noahClient.replacePath("/transactions/{TransactionID}", { TransactionID });
    const response = await noahClient.get(endpoint);

    if (response.error) {
      return JSON.stringify(
        {
          error: true,
          message: response.error.message,
          details: response.error.details,
        },
        null,
        2,
      );
    }

    return JSON.stringify(
      {
        success: true,
        data: response.data,
        summary: `Successfully retrieved transaction ${TransactionID}`,
      },
      null,
      2,
    );
  } catch (error) {
    return JSON.stringify(
      {
        error: true,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      null,
      2,
    );
  }
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
