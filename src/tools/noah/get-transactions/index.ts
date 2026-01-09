import type { ToolRegistration } from "@/types/tools";
import { type GetTransactionsSchema, getTransactionsSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Transactions
 */
export const getTransactions = async (args: GetTransactionsSchema): Promise<string> => {
  try {
    const response = await noahClient.get("/transactions", args);

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
        summary: "Successfully retrieved transactions",
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
  description: "This endpoint retrieves a paginated list of transactions for the Business User's account.",
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
