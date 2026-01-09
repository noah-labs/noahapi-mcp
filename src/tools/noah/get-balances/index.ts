import type { ToolRegistration } from "@/types/tools";
import { type GetBalancesSchema, getBalancesSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Balances
 */
export const getBalances = async (args: GetBalancesSchema): Promise<string> => {
  try {
    const params: Record<string, any> = {};
    if (args.PageSize !== undefined) params.PageSize = args.PageSize;
    if (args.PageToken) params.PageToken = args.PageToken;

    const response = await noahClient.get("/balances", params);

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
        summary: "Successfully retrieved balances",
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

export const getBalancesTool: ToolRegistration<GetBalancesSchema> = {
  name: "get_balances",
  description: "This endpoint retrieves a paginated list of balances for the Business User's account.",
  inputSchema: getBalancesSchema,
  handler: async (args: GetBalancesSchema) => {
    try {
      const parsedArgs = getBalancesSchema.parse(args);
      const result = await getBalances(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getBalancesTool handler:", error);
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
