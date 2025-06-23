import type { ToolRegistration } from "@/types/tools";
import { type GetBalancesSchema, getBalancesSchema } from "./schema";

/**
 * Balances
 */
export const getBalances = async (args: GetBalancesSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: GET
  // Path: /balances
  
  console.log('Noah API call:', { method: 'GET', path: '/balances', args });
  
  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "GET /balances",
    args
  });
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
