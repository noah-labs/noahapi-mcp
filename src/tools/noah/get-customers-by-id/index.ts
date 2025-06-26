import type { ToolRegistration } from "@/types/tools";
import { type GetCustomersByIdSchema, getCustomersByIdSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Get Customer by ID
 */
export const getCustomersById = async (args: GetCustomersByIdSchema): Promise<string> => {
  try {
    const { CustomerID } = args;
    const endpoint = noahClient.replacePath('/customers/{CustomerID}', { CustomerID });
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
      summary: `Successfully retrieved customer ${CustomerID}`,
    }, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }, null, 2);
  }
};

export const getCustomersByIdTool: ToolRegistration<GetCustomersByIdSchema> = {
  name: "get_customers_by_id",
  description: "Retrieve details of a specific customer by their CustomerID.",
  inputSchema: getCustomersByIdSchema,
  handler: async (args: GetCustomersByIdSchema) => {
    try {
      const parsedArgs = getCustomersByIdSchema.parse(args);
      const result = await getCustomersById(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getCustomersByIdTool handler:", error);
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