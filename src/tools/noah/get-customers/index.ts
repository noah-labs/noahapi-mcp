import type { ToolRegistration } from "@/types/tools";
import { type GetCustomersSchema, getCustomersSchema } from "./schema";

/**
 * Customers
 */
export const getCustomers = async (args: GetCustomersSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: GET
  // Path: /customers

  console.log("Noah API call:", { method: "GET", path: "/customers", args });

  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "GET /customers",
    args,
  });
};

export const getCustomersTool: ToolRegistration<GetCustomersSchema> = {
  name: "get_customers",
  description: "This endpoint retrieves a paginated list of customers for the Business User's account.",
  inputSchema: getCustomersSchema,
  handler: async (args: GetCustomersSchema) => {
    try {
      const parsedArgs = getCustomersSchema.parse(args);
      const result = await getCustomers(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getCustomersTool handler:", error);
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
