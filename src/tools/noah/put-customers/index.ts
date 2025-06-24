import type { ToolRegistration } from "@/types/tools";
import { type PutCustomersSchema, putCustomersSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Put Customer
 */
export const putCustomers = async (args: PutCustomersSchema): Promise<string> => {
  try {
    const { CustomerID, body } = args;
    const endpoint = noahClient.replacePath('/customers/{CustomerID}', { CustomerID });
    const response = await noahClient.put(endpoint, body);
    
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
      summary: `Successfully ${response.data ? 'updated' : 'created'} customer ${CustomerID}`,
    }, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }, null, 2);
  }
};

export const putCustomersTool: ToolRegistration<PutCustomersSchema> = {
  name: "put_customers",
  description: "Creates or updates a customer record. A unique CustomerID must be provided, as the API does not generate this identifier. For consistency, it is recommended to use the customer ID from your internal system as the CustomerID. This customer record must exist before executing any operations that depend on the CustomerID.",
  inputSchema: putCustomersSchema,
  handler: async (args: PutCustomersSchema) => {
    try {
      const parsedArgs = putCustomersSchema.parse(args);
      const result = await putCustomers(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in putCustomersTool handler:", error);
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
