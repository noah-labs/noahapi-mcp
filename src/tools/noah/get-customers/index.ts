import type { ToolRegistration } from "@/types/tools";
import { type GetCustomersSchema, getCustomersSchema } from "./schema";
import { getNoahApiClient } from "@/utils/noah-api-client";

/**
 * Customer by ID
 */
export const getCustomers = async (args: GetCustomersSchema): Promise<string> => {
  const { CustomerID } = args;
  const client = getNoahApiClient();
  
  const result = await client.get(`/customers/${CustomerID}`);
  return JSON.stringify(result, null, 2);
};

export const getCustomersTool: ToolRegistration<GetCustomersSchema> = {
  name: "get_customers",
  description: "Retrieve details of a specific customer by their CustomerID.",
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
