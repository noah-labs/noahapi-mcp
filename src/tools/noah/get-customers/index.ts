import type { ToolRegistration } from "@/types/tools";
import { type GetCustomersSchema, getCustomersSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Customer by ID
 */
export const getCustomers = async (args: GetCustomersSchema): Promise<string> => {
  try {
    const { CustomerID } = args;
    const endpoint = noahClient.replacePath("/customers/{CustomerID}", { CustomerID });
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

    const data = response.data as any;
    return JSON.stringify(
      {
        success: true,
        data: response.data,
        summary: `Retrieved customer details for ${CustomerID}`,
        customerType: data?.Type || "Unknown",
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
