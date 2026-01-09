import type { ToolRegistration } from "@/types/tools";
import { type GetCustomersSchema, getCustomersSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Customers
 */
export const getCustomers = async (args: GetCustomersSchema): Promise<string> => {
  try {
    const response = await noahClient.get("/customers", args);

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
        summary: "Successfully retrieved customers",
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
