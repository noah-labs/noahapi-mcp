import type { ToolRegistration } from "@/types/tools";
import { type GetBalancesSchema, getBalancesSchema } from "./schema";
import { getNoahApiClient } from "@/utils/noah-api-client";

/**
 * Balances
 */
export const getBalances = async (args: GetBalancesSchema): Promise<string> => {
  const { PageSize, PageToken } = args;
  const client = getNoahApiClient();
  
  const queryParams: Record<string, string | number> = {};
  if (PageSize !== undefined) queryParams.PageSize = PageSize;
  if (PageToken) queryParams.PageToken = PageToken;
  
  const result = await client.get('/balances', queryParams);
  return JSON.stringify(result, null, 2);
};

export const getBalancesTool: ToolRegistration<GetBalancesSchema> = {
  name: "get_balances",
  description: "Retrieve all balances for the Business User's account.",
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
